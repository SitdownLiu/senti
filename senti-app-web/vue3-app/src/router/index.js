import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView,
  },
  {
    path: '/test',
    name: '测试页',
    redirect: '/test/formDesigner',
    children: [
      {
        path: 'formDesigner',
        name: '表单设计',
        component: () => import('../views/TestPage/formdesigner.vue'),
      },
      {
        path: 'formrender',
        name: '表单渲染',
        component: () => import('../views/TestPage/formrender.vue'),
      },
    ],
  },
  {
    path: '/formDesigner',
    name: 'formDesigner',
    component: () => import('../views/FormDesigner'),
  },
  {
    path: '/formRender',
    name: 'formRender',
    component: () => import('../views/FormRender'),
  },
  {
    path: '/dmnDesigner',
    name: 'dmnDesigner',
    component: () => import('../views/DmnDesigner'),
  },
];

export default routes;
