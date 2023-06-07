const KoaRouter = require("../middleware/koa@router");
const router = new KoaRouter("/file");

router.get((ctx) => {
  ctx.body = "文件测试接口";
});

module.exports = router.router();
