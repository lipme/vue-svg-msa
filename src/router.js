import Vue from 'vue';
import Router from 'vue-router';
import MultipleAlignment from './views/MultipleAlignment.vue';
import TreeMultipleAlignment from './views/TreeMultipleAlignment.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: MultipleAlignment,
    },
    {
      path: '/treealignment',
      name: 'treealignment',
      component: TreeMultipleAlignment,
    },
    {
      path: '/multiplealignment',
      name: 'multiplealignment',
      component: MultipleAlignment,
    },
  ],
});
