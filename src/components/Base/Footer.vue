<template>
  <footer class="footer">
    <div class="container">
      <!-- 第一排: LOGO -->
      <div class="footer-logo">
        <img src="@/assets/img/logos/header/logo_left.svg" alt="Logo" class="logo" />
      </div>


      <!-- 第二排: 版权声明 -->
      <p class="footer-text"> © 2025 BEDB Powered by <a href="https://www.swu.edu.cn/" class="no-underline" target="_blank">Southwest University</a> Lu Kun’s Lab.</p>


      <!-- 第三排: 联系方式和备案信息 -->
      <p class="footer-contact">
        Contact us:
        <a href="mailto:echooler@gmail.com">
          <i class="fa fa-envelope"></i> echooler@gmail.com
        </a>
        |
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
          <i class="fa fa-cogs"></i> 陇ICP备2024015426号-1
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 无需其他逻辑，静态页脚
</script>

<style scoped>
.footer {
  background-color: #f8f9fa; /* 页脚背景色 */
  text-align: center;
  padding: 1rem 0;
  color: #333;
  font-family: 'Arial', sans-serif;
}

/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* LOGO 样式 */
.footer-logo {
  margin-bottom: 1rem; /* 增加下边距 */
}

.footer-logo .logo {
  height: 60px; /* 控制 LOGO 高度 */
  width: auto; /* 宽度自适应 */
  display: block;
  margin: 0 auto; /* LOGO 居中 */
}

/* 版权声明样式 */
.footer-text {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #555;
}

/* 联系方式样式 */
.footer-contact {
  font-size: 1.1rem;
  color: #666;
}

.footer-contact a {
  color: #42b983; /* 链接颜色 */
  text-decoration: none;
  margin: 0 5px;
  transition: color 0.3s ease;
}

.footer-contact a:hover {
  color: #2c8c6d; /* 悬停时的颜色 */
}

.fa {
  margin-right: 5px; /* 图标与文字间隔 */
}

/* 去除链接的下划线和默认颜色 */
a.no-underline {
  text-decoration: none;
  color: inherit; /* 继承父元素的颜色 */
}

</style>
