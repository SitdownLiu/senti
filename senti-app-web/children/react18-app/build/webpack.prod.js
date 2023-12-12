// 生产环境
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        // 复制文件插件：将public目录下的文件赋值到dist目录下面
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), // 复制public下文件
                    to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
                    filter: source => {
                        return !source.includes('index.html') // 忽略index.html
                    }
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // 压缩css
            new TerserPlugin({
                parallel: true,
                terserOptions:{
                    compress:{
                        pure_funcs:['console.log']
                    }
                }
            })
        ],
    },
})
