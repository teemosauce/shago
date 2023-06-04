module.exports = {
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
  plugins: [],
};
