import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import axios from 'axios';
import * as echarts from 'echarts';  // 引入 ECharts
import Papa from 'papaparse';
import VueECharts from 'vue-echarts';  // 引入 Vue-ECharts 组件
import 'echarts';  // 引入 ECharts 的所有模块


// 创建 Vue 应用程序实例
const app = createApp(App);

// 配置 Pinia 状态管理
const pinia = createPinia();
app.use(pinia);

// 全局配置 Axios
axios.defaults.baseURL = 'http://your-django-api-url.com/api/';  // 替换为您的 Django API URL
axios.defaults.timeout = 10000;  // 请求超时设置为 10 秒
axios.defaults.headers.common['Authorization'] = 'Bearer token';  // 如果需要认证，可以设置 token

// 将 Axios 挂载到 Vue 实例上
app.config.globalProperties.$axios = axios;

// 使用 Element Plus UI 库
app.use(ElementPlus);

// 将 ECharts 注册为全局组件
app.component('v-chart', VueECharts);  // 注册 v-chart 为全局组件

// 使用路由
app.use(router);

// 使用 PapaParse
app.use(Papa);

// 挂载应用到 DOM
app.mount('#app');
