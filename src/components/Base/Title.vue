<template>
  <div class="container">
    <!-- 面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>{{ title }}</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li
                class="breadcrumb-item"
                v-for="(item, index) in breadcrumbs"
                :key="index"
            >
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- 模块介绍部分 -->
    <el-card class="introduction-card" shadow="hover">
      <div class="introduction">
        <!-- 图片部分 -->
        <div class="image-container">
          <img :src="imageSrc" alt="Module Image" class="species-image" />
        </div>
        <!-- 文本部分 -->
        <div class="info-container">
          <p v-for="(para, index) in description" :key="index">{{ para }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义组件的 props
defineProps({
  title: String,             // 面包屑标题
  breadcrumbs: Array,        // 面包屑导航栏数据
  imageSrc: String,          // 图片路径
  description: Array,        // 模块描述文本（数组，每段单独一行）
});
</script>

<style scoped>
/* 全局样式：消除默认 margin 和 padding */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

/* 主容器样式 */
.container {
  width: 100%;
  max-width: 100%; /* 占满页面宽度 */
  margin: 0 auto; /* 居中对齐 */
  padding: 0; /* 移除不必要的内边距 */
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-top: 10px;
  margin-bottom: 0px; /* 与下方卡片保持间距 */
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.breadcrumb {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
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

/* 卡片样式 */
.introduction-card {
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Introduction 部分 */
.introduction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.image-container {
  flex: 0 0 150px; /* 图片固定宽度 */
  margin-right: 20px;
}

.species-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.info-container {
  flex: 1; /* 占满剩余空间 */
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
}

/* 小屏幕自适应 */
@media (max-width: 768px) {
  .breadcrumb-container {
    padding: 10px;
  }

  .introduction {
    flex-direction: column;
    text-align: center;
  }

  .image-container {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
