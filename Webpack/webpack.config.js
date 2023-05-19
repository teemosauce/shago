const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(name) {
    return path.resolve(__dirname, name)
}

module.exports = {
    mode: 'development', // production development
    // target: 'async-node',
    // 入口文件配置
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'main.js',
        path: resolve('dist')
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
            },

            {
                test: /\.abc/,
                use: ['abc-loader', 'replace-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin()
    ]
}