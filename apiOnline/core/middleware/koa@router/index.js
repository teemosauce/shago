const { pathToRegexp, match } = require("path-to-regexp");
/**
 * 简单实现一个路由中间件
 */

const METHODS = ["GET", "POST", "PUT", "DELETE"]; // 这里就简单定义一个get和post

const MATCH_FUNCTION_CACHE = Object.create(null);
class KoaRouter {
  routesHandler = new Map();

  /**
   *
   * @param {String} prefix 路由公共前缀
   */
  constructor(prefix) {
    this.prefix = prefix || ""; // 路由前缀
    // this.initPrototypeMethods();
  }

  /**
   * 实例化所有的方法(例如 GET/POST/....)
   *
   */
  initPrototypeMethods() {
    METHODS.forEach((method) => {
      this[method.toLowerCase()] = (url, callback) => {
        return this.request(method, url, callback);
      };
    });
  }

  /**
   * 把所以得路由信息缓存起来 等中间件真正执行的时候再处理
   * @param {String} method 请求方法
   * @param {String} url 请求地址
   * @param {Function} handler 请求处理的函数
   */
  request(method = "GET", url = "", handler) {
    // 把所有的注册先缓存起来
    let routeHandler = this.routesHandler.get(method);
    if (!routeHandler) {
      routeHandler = new Map(); // 定义不同方法类型的map
      this.routesHandler.set(method, routeHandler);
    }

    url = this.prefix + url;
    // const regexp = pathToRegexp(url); // 转换成正则表达式

    MATCH_FUNCTION_CACHE[url] =
      MATCH_FUNCTION_CACHE[url] ||
      match(url, {
        decode: decodeURIComponent,
      });
    routeHandler.set(url, handler); // 将请求路径和处理方法进行缓存
  }

  /**
   * 返回真实的路由中间件
   *
   * @returns
   */
  router() {
    // 返回真实的中间件
    return async (ctx, next) => {
      const { path, method } = ctx.request; // 获取传递过来的请求路径及方法

      if (!this.routesHandler.has(method)) {
        ctx.body = `没有实现${method}:${path}方法`;
        return await next();
      }

      const routeHandler = this.routesHandler.get(method); // 获取某方法类型下的所有路由

      // 这里简单的只是做了全路由的匹配，实际上是需要支持路由的形式 后续再支持/:k/user/:id的问题 /near/user/1

      for (let [regexp, handler] of routeHandler) {
        const matchFunction = MATCH_FUNCTION_CACHE[regexp];
        let matched = matchFunction(path);

        if (matched) {
          // 匹配到的话 取出参数放到ctx上面 并终止循环
          console.log("matched", matched);
          ctx.params = matched.params;
          try {
            return await handler(ctx);
          } catch (error) {
            ctx.status = 500;
            ctx.body = error;
          }
        }
      }

      ctx.body = `没有实现${method}:${path}方法`;
      return await next();
    };
  }
}
// 给原型上增加所有的方法(例如 GET/POST/....)
METHODS.forEach((method) => {
  KoaRouter.prototype[method.toLowerCase()] = function (url, callback) {
    if (typeof url == "function") {
      callback = url;
      url = "";
    }
    return this.request(method, url, callback);
  };
});

module.exports = KoaRouter;
