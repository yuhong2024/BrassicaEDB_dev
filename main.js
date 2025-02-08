// main.js
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import axios from 'axios';
import * as echarts from 'echarts';
import VueECharts from 'vue-echarts';
import Papa from 'papaparse';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import * as d3 from 'd3'; // 引入 D3.js



// 创建 Vue 应用程序实例
const app = createApp(App);

// 配置 Pinia 状态管理
app.use(createPinia());

// 全局注册 Element Plus 的图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 配置 Axios，并挂载到全局
axios.defaults.baseURL = 'http://your-django-api-url.com/api/';  // 替换为您的 Django API URL
axios.defaults.timeout = 10000;  // 请求超时设置为 10 秒
axios.defaults.headers.common['Authorization'] = 'Bearer token';  // 如果需要认证，可以设置 token
app.config.globalProperties.$axios = axios;

// 使用 Element Plus UI 库
app.use(ElementPlus);

// 全局注册 ECharts 组件
app.component('v-chart', VueECharts);

// 设置 ECharts 主题，并挂载到全局
echarts.registerTheme('customTheme', {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    backgroundColor: '#f0f2f5',
});
app.config.globalProperties.$echarts = echarts;

// 使用 D3.js 并挂载到全局
app.config.globalProperties.$d3 = d3;

// 全局注册 PapaParse，用于处理 CSV 文件的解析
app.config.globalProperties.$Papa = Papa;

// 使用路由
app.use(router);

// 挂载应用到 DOM
app.mount('#app');
