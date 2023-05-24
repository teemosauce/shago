// 加载一个文档 并能将文档内容导出成字符串格式

module.exports = function (source) {
    console.log("custom-loader-a")
    console.log(source)
    return `module.exports= ${source}`
}