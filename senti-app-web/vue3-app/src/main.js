import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import routes from './router';
import store from './store';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

// UI库
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 表单组件
// import VForm3 from 'vform3-builds';
// import 'vform3-builds/dist/designer.style.css';
import VForm3 from '@/assets/v-form3-pro/designer.umd';
import '@/assets/v-form3-pro/designer.style.css';
import formCreate from '@form-create/element-ui';
import FcDesigner from '@form-create/designer';

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
  app.use(ElementPlus);
  app.use(VForm3);
  app.use(formCreate);
  app.use(FcDesigner);
  app.mount('#app');
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
