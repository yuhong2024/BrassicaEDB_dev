<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="footer-links-container">
      <FooterLinks />
    </footer>
    <footer class="footer-full-width">
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import Header from './components/Base/Header.vue';
import Footer from './components/Base/Footer.vue';
import FooterLinks from './components/Base/FooterLinks.vue';

import { RouterView } from 'vue-router';
import '@/assets/css/styles.css';  // 引入全局样式





</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F9ED; /* 修改背景颜色 */
}

.main-content {
  flex: 1;
  width: 82vw; /* 调整宽度为 82% 或根据需要使用 100% */
  max-width: 1600px; /* 根据屏幕调整最大宽度 */
  margin: 0 auto; /* 保持内容居中 */
  padding-top: 70px;
  padding-bottom: 60px;
  box-sizing: border-box;
  //background-color: #ffffff; /* 白色背景 */
  background-color: #F5F9ED; /* 白色背景 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

/* Footer部分保持一致的宽度 */
.footer-links-container {
  width: 95vw;
  max-width: 1600px; /* 与 main-content 保持一致 */
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}

/* Footer部分拉满左右 */
.footer-full-width {
  width: 100%; /* 占满页面宽度 */
  background-color: #ffffff;
  color: #292525;
  padding: 0 0;
  text-align: center;
  box-sizing: border-box;
}

.footer-full-width p {
  margin: 0;
}

</style>
