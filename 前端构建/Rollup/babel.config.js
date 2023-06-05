module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false, // 设置为false, 否则babel会在rollup有机会执行其操作之前导致我们的模块转化为commonjs
        targets: {
          browsers: ["last 2 versions"], // last 2 chrome version
        },
        useBuiltIns: "entry", //  | usage 使用usage构建出来的包一直有个错误 暂时没找到问题所在
        corejs: {
          // 使用corejs的版本 尽量写完整的版本号 否则写3会变成3.0.0, 版本不一样 垫平api的个数也不一样
          version: "3.30.2", //"3",
          // 是否编译提案阶段ES6+ API,当useBuiltIns为usage时，设置proposals才有用
          proposals: true,
        },
      },
    ],
  ],

  /**
   *
   *  */
  plugins: [
    // ['@babel/plugin-syntax-dynamic-import'],
    // [
    //   "@babel/plugin-transform-runtime",
    //   {
    //     useESModules: true
    //   },
    // ],
  ],
};
