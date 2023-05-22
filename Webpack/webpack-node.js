const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('构建出错', err, stats.hasErrors())
    }

    console.log("构建完成")
})
// console.log(webpack)