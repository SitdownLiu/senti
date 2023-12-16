const isDEV = process.env.NODE_ENV === 'development'

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                // false 不填充
                // usage
                "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                "corejs": 3 // 配置使用core-js使用的版本
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        isDEV && require.resolve('react-refresh/babel'),
    ].filter(Boolean)
}
