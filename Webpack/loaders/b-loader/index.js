// 将整个字符串内容里面的的$替换成&

module.exports = function (source, map, meta) {
    console.log("custom-loader-b")
    let options = this.getOptions()
    source = JSON.stringify(source)
    source = source.replaceAll('$', options.word || '')
    return source
}