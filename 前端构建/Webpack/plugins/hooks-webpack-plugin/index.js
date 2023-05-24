

let PLUGIN_ID = 'hooks-webpack-plugin'
class HooksWebpackPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {

        // 1. compiler本身有许多种不同的hooks 这里只列出了几种 所有的hooks请参考 Webpack\node_modules\webpack\lib\Compiler.js 代码在125行
        // 2. hook主要又分为同步和异步的hook 如果是异步的 则最后一个是callback 异步任务结束后必须手动调用callback
        // 3. 不同的hook回调函数里面的参数也是不一样的 参数类型跟构建的整个流程有关
        // 4. 根据webpack配置中插件的先后顺序 一次调用不同插件的相同的hook

        

       

       
        // 1. 初始化阶段的相关hook
        compiler.hooks.initialize.tap(PLUGIN_ID, () => {
            console.log(`${PLUGIN_ID} initialize`)
        })

        // 2 编译阶段的相关hook
        compiler.hooks.thisCompilation.tap(PLUGIN_ID, (compilation, params) => {
            console.log(`${PLUGIN_ID} thisCompilation`, compilation.assets)
        })



        // 3.输出阶段的相关hook
        compiler.hooks.shouldEmit.tap(PLUGIN_ID, (compilation) => {
            // 所有需要输出的文件已经生成好，询问插件哪些文件需要输出，哪些不需要。
            console.log(`${PLUGIN_ID} shouldEmit`)
        })

        compiler.hooks.emit.tapAsync(PLUGIN_ID, (compilation, callback) => {
            // 确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容。
            console.log(`${PLUGIN_ID} emit`)
            callback()
        })

        compiler.hooks.afterEmit.tapAsync(PLUGIN_ID, (compilation, callback) => {
            // 文件输出完毕。
            console.log(`${PLUGIN_ID} afterEmit`)
            callback()
        })

        compiler.hooks.done.tapAsync(PLUGIN_ID, (stats, callback) => {
            // 成功完成一次完成的编译和输出流程。
            console.log(`${PLUGIN_ID} done`)
            callback()
        })
        compiler.hooks.afterDone.tap(PLUGIN_ID, (stats) => {
            // 所有流程都已经完成
            console.log(`${PLUGIN_ID} afterDone`)
        })

        compiler.hooks.failed.tap(PLUGIN_ID, (error) => {
            // 如果在编译和输出流程中遇到异常导致 Webpack 退出时，就会直接跳转到本步骤，插件可以在本事件中获取到具体的错误原因。
            console.log(`${PLUGIN_ID} failed`, error)
        })

        

        console.log(`${PLUGIN_ID} apply`)
    }
}

module.exports = HooksWebpackPlugin