const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模版插件 用于将构建内容直接插入html中
// const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空构建目录
const CDNWebpackPlugin = require("./plugins/cdn-webpack-plugin"); // 自定义插件一 往html页面中插入一些资源，如css、js等 HtmlWebpackPlugin同样能完成该功能
const HooksWebpackPlugin = require("./plugins/hooks-webpack-plugin"); // 自定义插件二 查看各个hooks的触发时机
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 导出css插件 把css代码从js中分离出来
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 代码压缩插件
const { VueLoaderPlugin } = require("vue-loader"); // 识别.vue文件的loader
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 分析打包的结构，通过分析构建的结果，去优化webpack构建过程
const DefinePlugin = require("webpack/lib/DefinePlugin"); // 定义全局变量，可以在代码中直接使用
const BannerPlugin = require("webpack/lib/BannerPlugin"); // 添加类似版权信息的插件

const isDev = process.env.NODE_ENV !== "production";

function resolve(name) {
  return path.resolve(__dirname, name);
}

let cdns = {
  css: [],
  js: [],
};
let externals = {};

// 采用这种方式可以加载CDN资源
// if (!isDev) {
//     cdns = {
//         css: [
//             'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css' // 暂时还未找到css加速的办法 现在是如果js模块中也引用了该css 那么会造成引用两次的问题
//         ],
//         js: [
//             'https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.runtime.min.js',
//             'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.min.js'
//         ]
//     }
//     externals = {
//         // 这里的key对应的包名 例如package.json依赖中安装时的名字
//         // value指的是该依赖内容执行后挂载到window全局对象上的名字
//         vue: 'Vue',  //生产环境排除CDN资源
//         'element-ui': 'Element'  //
//     }
// }

let plugins = [
//   new CleanWebpackPlugin(), // 清空构建目录 v5版本不再需要此插件 直接在output中配置clean即可
  new HtmlWebpackPlugin({
    // 自动将打包后的代码注入到html页面中
    template: resolve("template/index.html"), // 使用index-cdn.html 原始模版
    title: "Webpack学习", // 传递给页面的title，可以在模版中引用
    filename: 'index.html', // 输出的html名称
    // 生产环境使用CDN资源 原理就是在html页面中拿到这些参数 使用模板渲染引擎去把这些资源渲染出来
    // cdnConfig: cdns  //这里的参数都可以传递到模版中，支持模版语法获取所有的参数并使用
  }),
  // 自己写CDN的插件
  new CDNWebpackPlugin({
    // 自定义测试插件 把下面的CDN内容添加到html页面中
    cdns,
  }),
  new HooksWebpackPlugin(), // 自定义测试插件 测试常见的hook
  new VueLoaderPlugin(), // 支持vue

  // new BundleAnalyzerPlugin(), // 打包分析插件

  // 定义常量 可以在编码时直接使用这里定义的常量 webpack编译时，会把代码中遇到的该常量直接替换成具体得值
  new DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: JSON.stringify(process.env.DEBUG)
    },
    PI: Math.PI,
  }),
  new BannerPlugin({
    banner: "版权所有，翻版必究 fullhash:[fullhash], chunkhash:[chunkhash], name:[name], base:[base], query:[query], file:[file]",
  }),
];

if (!isDev) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:8].css",
    })
  ); // 生产环境时，提取css到单独的文件

  // 生成gzip文件资源
  // plugins.push(new CompressionWebpackPlugin({
  //     test: /\.js(\?.*)?$/i,
  //     algorithm: 'gzip',
  //     compressionOptions: { level: 1 },
  //     threshold: 0,
  //     minRatio: 0.8,
  //     deleteOriginalAssets: false,
  // }))
}

module.exports = {
  mode: isDev ? "development" : "production", // production development
  // target: 'async-node',
  // 入口文件配置
  devServer: {
    hot: true, // 开启热更新
    static: resolve("dist"), // 将dist目录下的文件 作为额外可访问文件
    port: 8090, // 启动服务的端口
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
    extensions: ['.js', '.json', '.vue'] // 可以省略.vue后缀
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
  optimization: {
    nodeEnv: false,
    minimize: false,
    usedExports: true, // Tree shaking 只打哪些使用的代码 减少代码打包的体积
    splitChunks: {
      // 可选值有async、initial、all
      chunks: 'all',
      // minSize: 0,
      // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
      // automaticNameDelimiter: '~',
      // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
      // name: "aaaaa",
      cacheGroups: {
          // 把node_modules下的包单独打到vendors中
          vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: -10
          },
          // 比如把ELEMENT-UI单独打包
          // elementUI: {
          //   name: 'element-ui',//组件名称
          //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ ,//匹配路径
          //   priority: 20,//优先级
          //   // chunks: 'all',
          // }
      }
    },
  },

  externals,
  resolveLoader: {
    alias: {
      // 给loader取一个别名
      "abc-loader": "a-loader",
      "replace-loader": "b-loader",
    },
    modules: ["node_modules", "loaders"], // 配置loader的查找路径
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
            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 把CSS插入到DOM中
            options: isDev
              ? {}
              : {
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
            loader: "postcss-loader", // css兼容处理 参数在postcss.config.js中
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        // 自定义测试loader 处理以.abc结尾的文件
        test: /\.abc$/,
        use: [
          "abc-loader",
          {
            loader: "replace-loader",
            options: {
              word: "%%%%%",
            },
          },
        ],
      },
      {
        // 处理图片等资源文件 图片小于8k使用内联 大于8k使用路径方式加载
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 小于8kb转base64，减少请求但是体积变大
          }
        },
        generator: {
          // hash是生成的hash值，加个:是表示取几位，相当于根据内容计算，ext是后缀，query是后缀之后的内容一般不用
          filename: 'images/[hash:8][ext][query]' 
        }
      },
      // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      {
        // 字体和svg 字体以文件路径方式加载
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          // hash是生成的hash值，加个:是表示取几位，相当于根据内容计算，ext是后缀，query是后缀之后的内容一般不用
          filename: 'fonts/[hash:8][ext][query]'
        }
      },
    ],
  },
  plugins,
};
