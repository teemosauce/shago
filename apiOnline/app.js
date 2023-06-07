const Koa = require("koa");
const router = require("./core/router");
const app = new Koa();


app.use(async (ctx, next) => {
  console.log("接口请求开始......");
  console.log(ctx.request.inspect());

  await next();

  console.log("===========响应结果===========");
  console.log(ctx.body);
  console.log("=============================");
});

// 把所有的路由信息都挂载到app上
router.mount(app)

app.use(async function (ctx, next) {
  ctx.response.status = 404;
  // ctx.body = `404`;
});

let PORT = 8999
app.listen(PORT, () => {
  console.log(`测试服务${PORT}启动成功！`);
});
