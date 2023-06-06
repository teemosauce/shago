const Koa = require("koa");
const { save: createFile } = require('./libs/file')

const app = new Koa();

app.use(async (ctx, next) => {
  console.log("接口请求开始......");
  console.log(ctx.request.inspect());

  await next();

  console.log("===========响应结果===========");
  console.log(ctx.body);
  console.log("=============================");
});

// 简单实现一个路由中间件
class Router {
  methods = ["GET", "POST"]; // 这里就简单定义一个get和post
  routes = new Map();
  constructor(prefix) {
    this.prefix = prefix || ""; // 路由前缀

    this.initMethods();
  }

  /**
   * 实例化所有的方法
   */
  initMethods() {
    this.methods.forEach((method) => {
      this[method.toLowerCase()] = (url, callback) => {
        return this.request(method, url, callback);
      };
    });
  }

  request(method, url, callback) {
    // 把所有的注册先缓存起来
    let routes = this.routes.get(method);
    if (!routes) {
      routes = new Map(); // 定义不同方法类型的map
      this.routes.set(method, routes);
    }

    url = this.prefix + url;
    routes.set(url, callback); // 将请求路径和处理方法进行缓存
  }

  route() {
    // 返回真实的中间件
    return async (ctx, next) => {
      const { path, method } = ctx.request; // 获取传递过来的请求路径及方法

      if (!this.routes.has(method)) {
        ctx.body = `没有实现${method}:${path}方法`;
        return await next();
      }

      const routes = this.routes.get(method); // 获取某方法类型下的所有路由

      // 这里简单的只是做了全路由的匹配，实际上是需要支持路由的形式 后续再支持/:k/user/:id的问题 /near/user/1
      if (!routes.has(path)) {
        ctx.body = `没有实现${method}:${path}方法`;
        return await next();
      }

      let callback = routes.get(path); // 获取真正的处理方法

      try {
        await callback(ctx);
      } catch (error) {
        ctx.status = 500;
        ctx.body = error;
      }
    };
  }
}

const userRouter = new Router("/user");
userRouter.post("/add", (ctx) => {
  ctx.body = "添加用户成功";
});

userRouter.get("/get", (ctx) => {
  ctx.body = "获取用户成功";
});

userRouter.get("/add", (ctx) => {
  const { name } = ctx.request.query;
  if (!name) {
    ctx.body = {
      success: false,
      message: "用户名称不存在！",
    };
  } else {
    // 把用户临时存到本地文件中

    createFile(name)

    ctx.body = {
      success: true,
      data: null
    };
  }
});

console.log(userRouter.routes);

// router.get("/:id", (ctx) => {
//   ctx.body = "获取用户失败";
// });

app.use(userRouter.route());

app.use(async function (ctx, next) {
  ctx.response.status = 404;
  // ctx.body = `404`;
});

app.listen(8999, () => {
  console.log(`测试服务启动成功！`);
});
