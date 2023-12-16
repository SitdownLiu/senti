import React from "react";
import ReactDOM from "react-dom"
import { createRoot } from 'react-dom/client'
import App from './App'

// window.onerror = function (e) {
//     console.log(['https://stackoverflow.com/search?q=[js]+' + e]) // 当报错的时候自动打印stakover-flow的搜索链接
// }
// if (root) {
//     createRoot(root).render(<App />)
// }


const root = document.getElementById('app');
// 渲染
window.mount = () => {
    createRoot(root).render(<App />)
}

// 卸载
window.unmount = () => {
    ReactDOM.unmountComponentAtNode(root)
}

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
    window.mount()
}