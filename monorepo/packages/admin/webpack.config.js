const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模版插件 用于将构建内容直接插入html中
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 导出css插件 把css代码从js中分离出来
const { VueLoaderPlugin } = require("vue-loader"); // 识别.vue文件的loader

const isDev = process.env.NODE_ENV !== "production";

function resolve(name) {
  return path.resolve(__dirname, name);
}

module.exports = {
  mode: isDev ? "development" : "production", // production development
  // target: 'async-node',
  // 入口文件配置
  devServer: {
    hot: true, // 开启热更新
    static: resolve("dist"), // 将dist目录下的文件 作为额外可访问文件
    port: 8091, // 启动服务的端口
    compress: true, // 启动gzip压缩
    open: true, // 自动打开
  },
  // devtool: 'source-map',
  context: resolve("src"),
  entry: {
    main: "./main.js",
    // common: ['./utils/index.js']
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    extensions: [".js", ".json", ".vue"], // 可以省略.vue后缀
  },
  // 85dc0fc38a6b9c0f99e8
  output: {
    // 40032daaeb439fb070bc-eaebe637f6cc33143579
    /**
     * hash、chunkhash、contenthash的区别, 不同的hash值可以利用缓存技术提升构建速度
     * 1. 通过配置多个entry入口可以知道 hash计算是跟整个项目的构建相关，同一次构建过程中生成的哈希都是一样的
     * 2. 由于采用chunkhash，所以项目主入口文件main.js及其对应的依赖文件common.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建的时候只要文件内容没有更改就不会重复构建
     * 3. contenthash这是相比第二点来说，main.js和common.css有不同的hash值，main.js有改动 但是common.css没改动 common.css就不会重新打包
     */
    clean: true, // 有了这个就不用再使用CleanWebpackPlugin
    filename: "[name].[chunkhash:8].js",
    path: resolve("dist"),
  },
  module: {
    // 对不同文件处理的loader
    rules: [
      {
        // 处理vue文件
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        // 处理css相关文件
        test: /\.(sa|sc|c)ss$/, // 匹配文件类型
        // 要使用的loader use数组中 loader执行的顺序是从后往前
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader", // 识别css模板
            options: {
              modules: false,
              // url: true
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // 处理图片等资源文件 图片小于8k使用内联 大于8k使用路径方式加载
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 小于8kb转base64，减少请求但是体积变大
          },
        },
        generator: {
          // hash是生成的hash值，加个:是表示取几位，相当于根据内容计算，ext是后缀，query是后缀之后的内容一般不用
          filename: "images/[hash:8][ext][query]",
        },
      },
      // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      {
        // 字体和svg 字体以文件路径方式加载
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/resource",
        generator: {
          // hash是生成的hash值，加个:是表示取几位，相当于根据内容计算，ext是后缀，query是后缀之后的内容一般不用
          filename: "fonts/[hash:8][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 自动将打包后的代码注入到html页面中
      template: resolve("index.html"), // 使用index-cdn.html 原始模版
      title: "Admin App", // 传递给页面的title，可以在模版中引用
      filename: "index.html", // 输出的html名称
      // 生产环境使用CDN资源 原理就是在html页面中拿到这些参数 使用模板渲染引擎去把这些资源渲染出来
    }),
    new VueLoaderPlugin(), // 支持vue
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:8].css",
    }),
  ],
};
