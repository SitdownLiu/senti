import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/formDesigner',
    name: 'formDesigner',
    component: () => import('../views/FormDesigner/index.js'),
  },
];

export default routes;
