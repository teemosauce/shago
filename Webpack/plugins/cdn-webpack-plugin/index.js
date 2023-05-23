// 一个webpack插件的小例子

const { Compilation, sources, container } = require("webpack")

// 根据传入的CDN资源自动注入到index.html页面中

const PLUGIN_ID = 'cdn-webpack-plugin'
class CDNWebpackPlugin {
    constructor(options = { scripts: [], styles: [] }) {
        let importStyles = options.styles.map(src => {
            return `<link rel="stylesheet" href="${src}">`
        })

        let importScripts = options.scripts.map(src => {
            return `<script type="text/javascript" src="${src}"></script>`
        })

        let cdnResources = importStyles.concat(importScripts)
        this.cdnResourcesTemplate = cdnResources.join('') //'\r\n'
    }

    apply(compiler) {
        console.log(`${PLUGIN_ID} apply`);
        compiler.hooks.thisCompilation.tap(PLUGIN_ID, (compilation) => {
            console.log(`${PLUGIN_ID} thisCompilation`);
            compilation.hooks.processAssets.tapAsync({
                name: PLUGIN_ID,
                stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
                additionalAssets: true
            }, (assets, callback) => {
                console.log(`${PLUGIN_ID} processAssets`);
                // 只过滤html文件资源
                
                for (let filename in assets) {
                    if (filename.endsWith('.html')) {
                        console.log(`***********${filename}***********`)
                        let asset = compilation.getAsset(filename)
                        let source = asset.source.source()
                        console.log(`***********${source}***********`)
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