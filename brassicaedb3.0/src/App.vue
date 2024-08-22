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
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5; /* 修改背景颜色为#f5f5f5 */
}

.main-content {
  flex: 1;
  width: 90vw; /* 调整整体宽度 */
  max-width: 1200px; /* 控制最大宽度 */
  margin: 0 auto; /* 居中显示 */
  padding-top: 70px; /* 根据header高度调整 */
  padding-bottom: 60px; /* 根据footer高度调整 */
  box-sizing: border-box;
  background-color: #ffffff; /* 保持主内容区为白色背景 */
  border-radius: 8px; /* 可选：让主内容区域更有层次感 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
}

/* FooterLinks部分保持与main-content一致的宽度和居中显示 */
.footer-links-container {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}

/* Footer部分拉满左右 */
.footer-full-width {
  width: 100%; /* 占满页面宽度 */
  background-color: #ffffff; /* 示例背景颜色，可以根据需要调整 */
  color: #292525; /* 示例文本颜色 */
  padding: 20px 0; /* 上下padding */
  text-align: center; /* 使内容居中 */
  box-sizing: border-box;
}

/* 可选: 添加一个默认Footer的文本样式 */
.footer-full-width p {
  margin: 0;
}
</style>
