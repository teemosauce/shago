// 一个webpack插件的小例子

const { Compilation, sources, container } = require("webpack")

// 根据传入的CDN资源自动注入到index.html页面中

const PLUGIN_ID = 'cdn-webpack-plugin'
class CDNWebpackPlugin {
    constructor(options = { cdns: { js: [], css: [] } }) {
        // 拼接css资源和js资源为字符串
        let importStyles = options.cdns.css.map(src => {
            return `<link rel="stylesheet" href="${src}">`
        })

        let importScripts = options.cdns.js.map(src => {
            return `<script type="text/javascript" src="${src}"></script>`
        })

        let cdnResources = importStyles.concat(importScripts)
        this.cdnResourcesTemplate = cdnResources.join('') //'\r\n'
    }

    apply(compiler) {
        console.log(`${PLUGIN_ID} apply`);
        // 编译器编译阶段的钩子
        compiler.hooks.thisCompilation.tap(PLUGIN_ID, (compilation) => {
            console.log(`${PLUGIN_ID} thisCompilation`);
            // 编译处理资源的钩子
            compilation.hooks.processAssets.tapAsync({
                name: PLUGIN_ID,
                stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
                additionalAssets: true
            }, (assets, callback) => {
                console.log(`${PLUGIN_ID} processAssets`);
                for (let filename in assets) {
                     // 只处理html文件资源
                    if (filename.endsWith('.html')) {
                        let asset = compilation.getAsset(filename)
                        // 获取html里面的内容
                        let source = asset.source.source()

                        // 把CDN 模块替换成真正的资源
                        let content = source.replace('<!-- CDN RESOURCES -->', this.cdnResourcesTemplate)
                        compilation.updateAsset(filename, new sources.RawSource(content))
                    }
                }
                callback()
            })

            compilation.hooks.failedModule.tap({
                name: PLUGIN_ID,
            }, (module, err) => {
                console.log(`${PLUGIN_ID} failed`, module, err);
            })
        })

        compiler.hooks.failed.tap(PLUGIN_ID, (err) => {
            console.log(`${PLUGIN_ID} failed`, err);
        })
    }
}

module.exports = CDNWebpackPlugin