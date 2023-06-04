/**
 * Babel主要有两个功能
 * 1、编译ES6+最新语法，例如（let、class、() => {}等）
 * 2、实现旧版本浏览器不支持的ES6+的API，例如（Promise、Symbol、Array.prototype.includes等）
 */

module.exports = {
  /**
   * 理论上来说，要完成babel的两个功能，需要配置一个个插件去完成，比如（转换箭头函数的插件、转换let关键字的插件等）
   * 如果每一个都去配置，则会很麻烦，所以就出现了presets，presets可以理解为插件的集合，由具体的preset把相关的插件都给管理起来，
   * 这样只用配置presets就行了
   */
  presets: [
    [
      "@babel/preset-env",
      {
        /**
         * 功能：启用ES模块语法向另一种模块类型的转换
         * 默认值：auto
         * 可取的值："amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false
         */
        modules: "auto",
        targets: {
          // 这里的browsers等同于文件.browserslistrc
          // browsers: ["last 2 versions"], // last 2 chrome version
        },
        /***
         * 有两种
         * 当为entry时：需要在代码中手动import 'core-js/*' core-js有三个包 分别是稳定版stable（包含ES版，同时又多了一些方法）、独立的提案proposals、ES版,可以根据自己的需要引入相应的版本
         * 当为usage时：会根据目标浏览器自动垫平代码中所需要的api
         *
         * usage的缺点是，如果开始时，我们没有用到某个api，但是第三方库用到了这个api，因为我们的代码并不会垫平这个api，导致第三方库执行到的时候会有问题。
         * entry的缺点是：直接把所有的api都垫平，就导致没又用到的也会去垫平，这就导致包体积的增加。
         * */

        useBuiltIns: "entry", // entry | usage

        corejs: {
          // 使用corejs的版本 尽量写完整的版本号 否则写3会变成3.0.0, 版本不一样 垫平api的个数也不一样
          version: "3.30.2", //"3.30.2",
          // 是否编译提案阶段ES6+ API,当useBuiltIns为usage时，设置proposals才有用
          proposals: false,
        },
      },
    ],
  ],

  /**
   *
   *  */
  plugins: [
    // [
    //   "@babel/plugin-transform-runtime",
    //   {
    //     helpers: true,
    //     regenerator: true,
    //   },
    // ],
  ],
};
