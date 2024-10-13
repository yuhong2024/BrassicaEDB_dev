<template>
  <div class="tool-section">
    <h2><router-link :to="titleLink" class="section-title">{{ title }}</router-link></h2>
    <el-row :gutter="20">
      <el-col v-for="tool in tools" :key="tool.title" :span="8">
        <el-card shadow="hover" class="tool-card">
          <el-row>
            <el-col :span="6" class="image-col">
              <img :src="tool.image" alt="Tool Image" class="tool-image" />
            </el-col>
            <el-col :span="18" class="tool-content">
              <h3><router-link :to="tool.path" class="tool-link">{{ tool.title }}</router-link></h3>
              <p>{{ tool.description }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  titleLink: {
    type: String,
    required: true
  },
  tools: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.tool-section {
  margin: 40px 0;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  text-decoration: none;
}

.tool-section h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: #333;
}

.tool-card {
  display: flex;
  padding: 15px; /* 缩小卡片内边距 */
  transition: transform 0.3s;
  height: 150px; /* 调整卡片高度 */
}

.tool-card:hover {
  transform: translateY(-5px);
}

.image-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-image {
  max-width: 80%; /* 限制图片最大宽度 */
  max-height: 80px; /* 限制图片最大高度 */
  object-fit: contain;
}

.tool-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.tool-link {
  font-size: 1.25rem; /* 增大字体 */
  margin: 0 0 10px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s, font-size 0.3s, font-weight 0.3s;
}

.tool-link:hover {
  color: #2c9c69;
  font-size: 1.35rem; /* 放大悬停时的字体 */
  font-weight: bold;
  text-decoration: underline;
}

.el-card p {
  font-size: 1rem; /* 调整字体大小 */
  color: #666;
  margin: 0;
}
</style>
