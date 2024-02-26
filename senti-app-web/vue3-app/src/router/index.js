import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView,
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
