<template>
  <div class="iframe-container">
    <h1 class="page-title">API Documentation</h1>
    <iframe
        src="https://brassica.wangyuhong.cn/api/swagger/"
        class="swagger-iframe"
        frameborder="0"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
// 这里不需要额外的逻辑，因为我们只需要展示 iframe 内容
</script>

<style scoped>
/* 外部容器样式 */
.iframe-container {
  width: 100%;
  max-width:100%;
  margin: 0 auto;
  padding: 20px;
  background: #f5fafc; /* 背景颜色 */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

/* 标题样式 */
.page-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

/* iframe 样式 */
.swagger-iframe {
  width: 100%; /* 全宽 */
  height: 90vh; /* 占据屏幕 90% 高度 */
  border: none; /* 移除边框 */
  border-radius: 8px; /* 添加圆角 */
  background: #ffffff; /* 背景白色 */
}
</style>
