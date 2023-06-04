module.exports = {
  // 针对语法层面，需要转换代码的配置
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 chrome version"], //last 2 versions 
        },
      },
    ],
  ], 
  // 垫片 针对新增js中新增的方法、功能，需要补充代码的时候
  plugins: [],
};
