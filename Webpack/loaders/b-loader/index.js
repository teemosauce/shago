// 将整个字符串内容里面的的$替换成&

module.exports = function (source) {
    console.log("custom-loader-b")
    source = JSON.stringify(source)
    source = source.replaceAll('$', '&')
    return source
}