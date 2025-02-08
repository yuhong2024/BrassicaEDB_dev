<template>
  <!-- 页面整体 -->
  <div class="development-page">
    <!-- 面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Under Development</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">Development</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="content-section">
      <!-- 标题 -->
      <h1 class="page-title">Under Development</h1>

      <!-- 图标与描述 -->
      <div class="icon-section">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <p class="description-text">This page is currently under development.</p>
      </div>

      <!-- 进度条 -->
      <el-progress :percentage="35" status="success" :stroke-width="18" />

      <!-- 进度描述 -->
      <p class="progress-text">Development is currently at <strong>35%</strong>. Stay tuned for updates!</p>

      <!-- 返回主页按钮 -->
      <div class="button-container">
        <el-button type="primary" size="large" @click="goHome">Back to Home</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

const goHome = () => {
  ElMessage.info('Redirecting to Home...');
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};
</script>

<style scoped>
/* 页面整体 */
.development-page {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #f0fdfa, #e6f5ff);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 面包屑导航 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  padding:  20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.7rem;
  color: #333;
  font-weight: bold;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  padding: 0 10px;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* 内容部分 */
.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.icon-section {
  margin-bottom: 20px;
}

.loading-icon {
  font-size: 4rem;
  color: #42b983;
  animation: spin 2s linear infinite;
}

.description-text {
  font-size: 1.2rem;
  color: #606266;
  margin-top: 10px;
}

.el-progress {
  width: 60%;
  max-width: 500px;
  margin: 20px 0;
}

.progress-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

/* 返回按钮 */
.button-container {
  margin-top: 10px;
}

.el-button {
  font-size: 1rem;
  padding: 10px 25px;
  border-radius: 8px;
}

/* 旋转动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .breadcrumb-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-title {
    font-size: 2rem;
  }

  .description-text,
  .progress-text {
    font-size: 1rem;
  }

  .el-progress {
    width: 90%;
  }
}
</style>
