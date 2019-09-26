import Vue from 'vue';
import App from './App.vue';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'vditor/src/assets/scss/classic.scss';
import axios from 'axios';
import '@/utils/smc-directives';
// import vcolorpicker from 'vcolorpicker';
import router from './router/index.js';
/*
  ie不兼容URLSearchParams
*/
import 'url-search-params-polyfill';

/*
vue-cli部分浏览器不支持promise
*/
import babelPolyfill from 'babel-polyfill';
/*
图表插件
*/
import chartPlugin from '@/utils/chart-plugin';

// import { debug } from '@/services/constant';
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.use(iView);
// Vue.prototype.$video = Video;
// Vue.use(vcolorpicker);
// Vue.config.debug = debug;
Vue.use(chartPlugin);


//添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做某事
    return config;
}, function(error) {
    // 请求错误时做些事

});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做些事
    return response;
}, function (error) {
    // 请求错误时做些事
    if (error.response.status == '401') { // 未登录重定向值登录页面
        router.replace({path: '/srpLogin'});
    } else if (error.response.status == '403') {
        router.replace({path: '/srpLogin'});
    } 
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
});

router.onError((err) => {
    console.log(err);
    iView.Message.error('错误！您无权限访问该资源！');
    iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
