const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const babel = require("@rollup/plugin-babel");
const html = require("@rollup/plugin-html");
const cdn = require("./plugins/plugin-cdn");
const clear = require("rollup-plugin-clear");
const serve = require("rollup-plugin-serve");
const scss = require("rollup-plugin-scss")

module.exports = function () {
  return {
    input: "src/main.js", // 必须，打包的入口文件，常见index.js

    // // 必须 (如果要输出多个，可以是一个数组)
    output: {
      name: "MyCustomLib", // 定义模块自执行函数返回的变量名，（需要入口模块有导出的东西）代表你的 iife/umd 包，其它在后续页面中可以通过该变量名访问。
      dir: "dist",
      entryFileNames: "[name]-[hash:8].js",
      //   file: "dist/bundle.iife.js", // 必须，生成的打包文件名&路径
      //   format: "iife", // 必须，打包构建的目标模块标准，有cjs、amd、umd、esm、iife等
      format: "esm",
      globals: {
        // jquery: "$", // 用了该包又不想该包打进bundle中，自己想手动额外引用 可配合external和cdn插件使用
      },
    //   sourcemap: true,
    },
    // external: ["jquery"], // 可以排除这些模块 不参与打包
    plugins: [
      //   serve({
      //     open: true,  // 运行时自动打开浏览器
      //     headers: {
      //     "Access-Control-Allow-Origin": "*",  // 本地服务允许跨域
      //     },
      //     contentBase: ['dist'],  // 本地服务的运行文件根目录
      //     port: 9033,  // 设置网络服务监听端口
      //   }),
      clear({
        targets: ["dist"],
      }),
      resolve(), // 将引用node_modules下的模块一起打包
      commonjs(), // 解决引用commonjs模块的问题
      babel({
        babelHelpers: "bundled",
      }),
      scss(),
    //   terser(), // 压缩插件
      html({
        title: "Rollup示例",
        attributes: {
          html: { lang: "zh" },
          script: {
            defer: "defer",
          },
        },
      }),
      //   cdn({
      //     js: ["https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js"],
      //   }),
    ],
  };
};
