<template>
  <div class="container">
    <!-- 图片展示 -->
    <el-row :gutter="20" class="image-grid">
      <el-col :span="12" v-for="(image, index) in images" :key="index">
        <el-image
            :src="image"
            :preview-src-list="images"
            :initial-index="index"
            fit="contain"
            class="image"
            @error="handleImageError(index)"
        >
          <!-- 图片加载失败时的占位内容 -->
          <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
/* 使用 import 引入图片 */
import B1 from "@/assets/img/summary/B1.png";
import B2 from "@/assets/img/summary/B2.png";
import B3 from "@/assets/img/summary/B3.png";
import B4 from "@/assets/img/summary/B4.png";
import B5 from "@/assets/img/summary/B5.png";
import B6 from "@/assets/img/summary/B6.png";

/* 定义图片数组 */
const images = [B1, B2, B3, B4, B5, B6];

/* 图片加载错误的处理逻辑 */
const handleImageError = (index) => {
  console.error(`图片加载失败: ${images[index]}`);
};
</script>

<style scoped>
/* 容器样式 */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background: #f9f9f9; /* 柔和灰色背景 */
  box-sizing: border-box;
}

/* 页面标题 */
.page-title {
  text-align: center;
  margin-bottom: 30px;
}

.page-title h1 {
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
}

/* 图片网格布局 */
.image-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* 图片组件样式 */
.el-image {
  width: 100%;
  height:600px; /* 图片高度 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 2px; /* 圆角效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.el-image:hover {
  transform: translateY(-5px); /* 悬停上移 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 悬停增强阴影 */
}

/* 图片加载失败的占位内容 */
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #bbb;
  background: #f5f5f5;
  font-size: 14px;
  border-radius: 8px;
}

.image-slot .el-icon {
  font-size: 30px;
  color: #ccc;
}
</style>
