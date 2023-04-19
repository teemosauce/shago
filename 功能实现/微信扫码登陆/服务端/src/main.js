const Koa = require('koa')
const KoaRouter = require('koa-router')
const app = new Koa()


app.use(async (ctx, next) => {
    console.log(ctx)
    await next()
})


const router = new KoaRouter();

router.get('/qrcode/wechat', async (ctx) => {
    ctx.body = 'Hello World'
})

// app.use(async ctx => {
//     ctx.body = 'Hello World'
// })
const routes = router.routes()
app.use(routes)
app.use(router.allowedMethods({

}))
app.listen(3000, () => {
    console.log('服务启动成功')
})