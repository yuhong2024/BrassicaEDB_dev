<template>
  <div class="analysis-section">
    <h2><router-link :to="titleLink" class="section-title">{{ title }}</router-link></h2>
    <el-row :gutter="20">
      <el-col v-for="analysis in analysisItems" :key="analysis.name" :span="8">
        <el-card shadow="hover" class="analysis-card">
          <el-row>
            <el-col :span="8">
              <img :src="analysis.image" alt="Analysis Image" class="analysis-image" />
            </el-col>
            <el-col :span="16" class="analysis-content">
              <h3><router-link :to="analysis.path" class="analysis-link">{{ analysis.name }}</router-link></h3>
              <p>{{ analysis.description }}</p>
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
  analysisItems: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.analysis-section {
  margin: 40px 0;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  text-decoration: none;
}

.analysis-section h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: #333;
}

.analysis-card {
  display: flex;
  padding: 20px;
  transition: transform 0.3s;
  height: 200px; /* 固定高度 */
}

.analysis-card:hover {
  transform: translateY(-5px);
}

.analysis-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.analysis-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
}

.analysis-link {
  font-size: 1.25rem;
  margin: 0 0 10px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s, font-size 0.3s, font-weight 0.3s;
  white-space: nowrap; /* 防止换行 */
}

.analysis-link:hover {
  color: #2c9c69;
  font-size: 1.35rem;
  font-weight: bold;
  text-decoration: underline;
}

.el-card p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
