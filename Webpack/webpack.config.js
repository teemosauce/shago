const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CDNWebpackPlugin = require('./plugins/cdn-webpack-plugin')
const HooksWebpackPlugin = require('./plugins/hooks-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const DefinePlugin = require('webpack/lib/DefinePlugin')

const isDev = process.env.NODE_ENV !== "production"

function resolve(name) {
    return path.resolve(__dirname, name)
}

let cdns = {
    css: [],
    js: []
}
let externals = {
}
if (!isDev) {
    cdns = {
        css: [
            // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css' // 暂时还未找到css加速的办法 现在是如果js模块中也引用了该css 那么会造成引用两次的问题
        ],
        js: [
            'https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.runtime.min.js',
            'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.min.js'
        ]
    }
    externals = {
        // 这里的key对应的包名 例如package.json依赖中安装时的名字
        // value指的是该依赖内容执行后挂载到window全局对象上的名字
        vue: 'Vue',  //生产环境排除CDN资源
        'element-ui': 'Element'  //
    }
}


let plugins = [
    new CleanWebpackPlugin(), // 清空构建目录
    new HtmlWebpackPlugin({ // 自动将打包后的代码注入到html页面中
        template: resolve('index.html'),
        title: 'Webpack学习',
        // 生产环境使用CDN资源 原理就是在html页面中拿到这些参数 使用模板渲染引擎去把这些资源渲染出来
        cdnConfig: cdns
    }),
    // 自己写CDN的插件 
    // new CDNWebpackPlugin({ // 自定义测试插件 把下面的CDN内容添加到html页面中
    //     styles: [
    //         'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    //     ],
    //     scripts: [
    //         'https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.runtime.min.js',
    //         'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.min.js'
    //     ]
    // }),
    new HooksWebpackPlugin(), // 自定义测试插件 测试常见的hook
    new VueLoaderPlugin(), // 支持vue

    // new BundleAnalyzerPlugin(), // 打包分析插件

    // 
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') // 把打包的环境信息注入到代码内
        },
        'PI': {
            value: Math.PI
        }
    })
]

if (!isDev) {
    plugins.push(new MiniCssExtractPlugin({
        filename: '[name].[chunkhash:8].css'
    }))// 生产环境时，提取css到单独的文件

    // 生成gzip文件资源
    // plugins.push(new CompressionWebpackPlugin({
    //     test: /\.js(\?.*)?$/i,
    //     algorithm: 'gzip',
    //     compressionOptions: { level: 1 },
    //     threshold: 0,
    //     minRatio: 0.8,
    //     deleteOriginalAssets: false,
    // }))
}

module.exports = {
    mode: isDev ? 'development' : 'production', // production development
    // target: 'async-node',
    // 入口文件配置
    devServer: {
        hot: true, // 开启热更新
        static: resolve('dist'), // 将dist目录下的文件 作为额外可访问文件
        port: 8090, // 启动服务的端口
        compress: true, // 启动gzip压缩
        open: true, // 自动打开
    },
    context: resolve('src'),
    entry: {
        main: './main.js',
        // common: ['./utils/index.js']
    },
    resolve: {
        alias: {
            '@': resolve('src')
        },
    },
    entry: './main.js',
    // 85dc0fc38a6b9c0f99e8
    output: {
        // 40032daaeb439fb070bc-eaebe637f6cc33143579
        /**
         * hash、chunkhash、contenthash的区别, 不同的hash值可以利用缓存技术提升构建速度
         * 1. 通过配置多个entry入口可以知道 hash计算是跟整个项目的构建相关，同一次构建过程中生成的哈希都是一样的
         * 2. 由于采用chunkhash，所以项目主入口文件main.js及其对应的依赖文件common.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建的时候只要文件内容没有更改就不会重复构建
         * 3. contenthash这是相比第二点来说，main.js和common.css有不同的hash值，main.js有改动 但是common.css没改动 common.css就不会重新打包
         */

        filename: '[name].[chunkhash:8].js',
        path: resolve('dist')
    },
    optimization: {
        usedExports: true  // Tree shaking 只打哪些使用的代码 减少代码打包的体积
    },
    externals,
    resolveLoader: {
        alias: { // 给loader取一个别名
            'abc-loader': 'a-loader',
            'replace-loader': 'b-loader'
        },
        modules: ['node_modules', 'loaders'], // 配置loader的查找路径
    },
    module: {
        // 对不同文件处理的loader 
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }]
        }, {
            test: /\.(sa|sc|c)ss$/, // 匹配文件类型
            // 要使用的loader use数组中 loader执行的顺序是从后往前
            use: [{
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,  // 把CSS插入到DOM中
                options: isDev ? {} : {
                    esModule: false,
                },
            }, {
                loader: 'css-loader', // 识别css模板
                options: {
                    modules: false,
                    // url: true 
                }
            }, {
                loader: 'sass-loader',
            }, {
                loader: 'postcss-loader', // css兼容处理
                options: {
                    postcssOptions: {
                        plugins: [['postcss-preset-env', {

                        }]]
                    }
                }
            }]
        }, {
            test: /\.abc$/,
            use: ['abc-loader', {
                loader: 'replace-loader',
                options: {
                    word: "%%%%%"
                }
            }]
        }]
    },
    plugins
}