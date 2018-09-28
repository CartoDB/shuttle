import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Colors from './views/Colors.vue';
import Layout from './views/Layout.vue';
import Data from './views/Data.vue';
import Tech from './views/Tech.vue';
import Export from './views/Export.vue';

Vue.use(Router);

const COLORS = 'colors';
const LAYOUT = 'layout';
const DATA = 'data';
const TECH = 'tech';

export const steps = [
  COLORS,
  LAYOUT,
  TECH,
  DATA
];

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bandera',
      name: 'export',
      component: Export
    },
    {
      path: '/colors',
      name: COLORS,
      component: Colors
    },
    {
      path: '/layout',
      name: LAYOUT,
      component: Layout
    },
    {
      path: '/data',
      name: DATA,
      component: Data
    },
    {
      path: '/tech',
      name: TECH,
      component: Tech
    }
  ]
})
