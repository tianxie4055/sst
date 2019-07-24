// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/global.css';
import './assets/css/other.css';

// iconfont 
import './assets/fonts/iconfont/iconfont.css';

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import bubbleUtil from './assets/js/bubbleUtil.min.js';
Vue.prototype.$bubbleUtil = bubbleUtil;

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
import "swiper/dist/css/swiper.css";

import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

import API from './api/API';
const api = new API();
Vue.prototype.$api = api;

import common from './assets/js/common';
const commonVal = new common();
Vue.prototype.$common = commonVal;

import {post,fetch,patch,put} from './api/http';
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

require('./api/mock.js');

Vue.config.productionTip = false

import ElementVideoDialog from './components/element-video-dialog.vue';
Vue.component('element-video-dialog', ElementVideoDialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
