<template>
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
      <!-- 占位符组件 -->
      <el-empty description="Page is under development">
        <template #image>
          <el-icon><i class="el-icon-loading"></i></el-icon>
        </template>
      </el-empty>

      <!-- 进度条 -->
      <el-progress :percentage="65" status="active" />

      <!-- 开发进度描述 -->
      <p class="progress-text">Development is currently at 65%. Stay tuned for updates!</p>

      <!-- 返回主页按钮 -->
      <el-button type="primary" @click="goHome">Back to Home</el-button>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from 'element-plus';

const goHome = () => {
  ElMessage.info('Redirecting to Home');
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};
</script>

<style scoped>
.development-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
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
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.content-section {
  text-align: center;
  padding: 40px;
}

.progress-text {
  margin-top: 20px;
  font-size: 16px;
  color: #606266;
}

.el-progress {
  margin: 30px auto;
  width: 80%;
}

.el-button {
  margin-top: 20px;
}
</style>
