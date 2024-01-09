// 公共配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    // 出口
    filename: "static/js/[name].js",
    path: path.join(__dirname, "../dist"),
    clean: true,
    publicPath: "/app/react18/",
  },
  cache: {
    type: "filesystem",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 如果碰到@import就回退两步
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset", // webpack5 内置模块
        generator: {
          filename: "static/images/[name].[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[hash:6][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "../src")], // 只对src目录下生效
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 生成html文件的插件
      template: path.join(__dirname, "../public/index.html"), // 模板文件
      inject: true,
    }),
    new DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
  resolve: {
    extensions: [".js", ".tsx", ".ts"], // 在引入文件的时候，可以省略这些后缀名
    alias: {
      "@": path.join(__dirname, "../src"), // 可以用@代替根路径
    },
    modules: [path.resolve(__dirname, "../node_modules")],
  },
};
