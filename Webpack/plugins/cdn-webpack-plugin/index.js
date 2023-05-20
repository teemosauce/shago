// 一个webpack插件的小例子

// 根据传入的CDN资源自动注入到index.html页面中

const PLUGIN_ID = 'cdn-webpack-plugin'
class CDNWebpackPlugin {
    constructor(options = { scripts: [], styles: [] }) {
        console.log(`${PLUGIN_ID} constructor`, options);

        let importStyles = options.styles.map(src => {
            return `<link rel="stylesheet" href="${src}">`
        })

        let importScripts = options.scripts.map(src => {
            return `<script type="text/javascript" src="${src}"></script>`
        })

        let cdnResources = importStyles.concat(importScripts)
        this.cdnResourcesTemplate = cdnResources.join('\n')
        console.log(this.cdnResourcesTemplate)
    }

    apply(compiler) {
        console.log(`${PLUGIN_ID} apply`);
        compiler.hooks.emit.tapAsync('CDNWebpackPlugin', (compilation, callback) => {

            let assets = compilation.assets
            // 只过滤html文件资源
            let htmls = Object.keys(assets).filter(item => {
                return item.endsWith('.html')
            })


            setTimeout(() => {
                  // 遍历html文件
                htmls.forEach(html => {
                    let asset = assets[html]
                    let resource = asset.source()

                    let content = resource.replace('<!-- CDN RESOURCES -->', this.cdnResourcesTemplate)
                    console.log(html, content)


                    // 重新定义source和size返回 返回处理后的资源

                    assets[html] = {
                        source() {
                            return content
                        },
                        size() {
                            return content.length
                        }
                    }
                    // asset.source = () => {
                    //     return content
                    // }

                    // asset.size = () => {
                    //     return content.length
                    // }
                })

                callback()
            }, 3000)
          

        })
    }
}

module.exports = CDNWebpackPlugin