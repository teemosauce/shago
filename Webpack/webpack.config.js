const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CDNWebpackPlugin = require('./plugins/cdn-webpack-plugin')
const HooksWebpackPlugin = require('./plugins/hooks-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


console.log(process.env.NODE_ENV)
const devMode = process.env.NODE_ENV !== "production"

function resolve(name) {
    return path.resolve(__dirname, name)
}

let plugins = [
    new CleanWebpackPlugin(), // 清空构建目录
    new HtmlWebpackPlugin({ // 自动将打包后的代码注入到html页面中
        template: path.join(__dirname, 'index.html')
    }),
    new CDNWebpackPlugin({ // 自定义测试插件 把下面的CDN内容添加到html页面中
        styles: [
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        scripts: [
            'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js',
            'https://unpkg.com/element-ui/lib/index.js'
        ]
    }),
    new HooksWebpackPlugin(), // 自定义测试插件 测试常见的hook
]

if (!devMode) {
    plugins.push(new MiniCssExtractPlugin())// 生产环境时，提取css到单独的文件
}


module.exports = {
    mode: devMode ? 'development' : 'production', // production development
    // target: 'async-node',
    // 入口文件配置
    devServer: {
        hot: true, // 开启热更新
        static: path.join(__dirname, 'dist'), // 将dist目录下的文件 作为额外可访问文件
        port: 8090, // 启动服务的端口
        compress: true, // 启动gzip压缩
        open: true, // 自动打开
    },
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'main.js',
        path: resolve('dist')
    },
    optimization: {
        usedExports: true  // Tree shaking 只打哪些使用的代码 减少代码打包的体积
    },
    externals: {
        vue: 'Vue'
    },
    resolveLoader: {
        alias: { // 给loader取一个别名
            'abc-loader': 'a-loader',
            'replace-loader': 'b-loader'
        },
        modules: ['node_modules', 'loaders'], // 可以从那个文件夹下面去查找loader
    },
    module: {
        // 对不同文件处理的loader 
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, // 匹配文件类型
                // 要使用的loader use数组中 loader执行的顺序是从后往前
                use: [{
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,  // 把CSS插入到DOM中
                    options: devMode ? {} : {
                        esModule: false,
                    },
                }, {
                    loader: 'css-loader', // 识别css模板
                    options: {
                        modules: false,
                        // url: true 
                    }
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
                test: /\.abc/,
                use: ['abc-loader', {
                    loader: 'replace-loader',
                    options: {
                        word: "%%%%%"
                    }
                }]
            }
        ]
    },
    plugins
}