import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import routes from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createRouter, createWebHistory } from "vue-router";

let app = null;
let router = null;
let history = null;

// 渲染
window.mount = () => {
  history = createWebHistory(process.env.BASE_URL);
  router = createRouter({ history, routes });

  app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(Antd);
  app.mount("#app");
};

// 卸载
window.unmount = () => {
  app.unmount();
  history.destroy();
  app = null;
  router = null;
  history = null;
};

// 如果不在微前端环境，则直接执行渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount();
}
