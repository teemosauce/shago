const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CDNWebpackPlugin = require('./plugins/cdn-webpack-plugin')

console.log(CDNWebpackPlugin)

function resolve(name) {
    return path.resolve(__dirname, name)
}

module.exports = {
    mode: 'development', // production development
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
                test: /\.css$/, // 匹配文件类型
                // 要使用的loader use数组中 loader执行的顺序是从后往前
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        // url: true 
                    }
                }, {
                    loader: 'postcss-loader',
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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CDNWebpackPlugin({
            styles: [
                'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
            ],
            scripts: [
                'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js',
                'https://unpkg.com/element-ui/lib/index.js'
            ]
        })
    ]
}