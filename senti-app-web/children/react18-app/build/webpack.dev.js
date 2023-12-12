// 开发环境
const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map", // 在开发环境debugger的时候提高代码可读性
  devServer: {
    port: 8080, // 本地服务端口号
    compress: false, // gzip压缩，开发环境关闭
    hot: true, // 开启热更新
    open: true, // 编译完成自动打开浏览器
    historyApiFallback: true, // 兼容router history模式
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源文件夹，可以直接访问静态资源
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
});
