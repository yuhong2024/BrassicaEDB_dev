<template>
  <div class="analysis-page">
    <h2 class="page-title">Analysis</h2>
    <el-row :gutter="20">
      <el-col v-for="analysis in analyses" :key="analysis.title" :span="8">
        <el-card shadow="hover" class="analysis-card" @click="goToPage(analysis.path)">
          <el-row>
            <el-col :span="8">
              <img :src="analysis.image" alt="Analysis Image" class="analysis-image" />
            </el-col>
            <el-col :span="16" class="analysis-content">
              <h3 class="analysis-title">{{ analysis.title }}</h3>
              <p class="analysis-description">{{ analysis.description }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';  // 引入 useRouter 进行页面跳转
import imageGeneticDifferences from '@/assets/img/home/analysis/Genetic_differences_between_species.svg';
import imageNetworkPrediction from '@/assets/img/home/analysis/Regulatory_network_prediction.svg';
import imageCoExpression from '@/assets/img/home/analysis/Interspecies_co-expression.svg';

const router = useRouter();  // 使用 router 进行跳转

// 页面跳转函数
const goToPage = (path) => {
  router.push(path);
};

const analyses = [
  {
    title: 'Genetic Differences Between Species',
    description: 'Analyze and compare the genetic makeup between different species to identify key differences and evolutionary patterns.',
    image: imageGeneticDifferences,
    path: '/analysis/differ',
  },
  {
    title: 'Regulatory Network Prediction',
    description: 'Predict and visualize gene regulatory networks to understand the interactions between genes and their effects on biological processes.',
    image: imageNetworkPrediction,
    path: '/analysis/network',
  },
  {
    title: 'Interspecies Co-expression',
    description: 'Study the co-expression of genes across different species to identify common regulatory patterns and shared pathways.',
    image: imageCoExpression,
    path: '/analysis/coexpression',
  },
];
</script>

<style scoped>
.analysis-page {
  padding: 40px;
  background-color: #f8fafc;
}

.page-title {
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 40px;
  color: #2c3e50;
  letter-spacing: 1.5px;
}

.analysis-card {
  padding: 25px;
  transition: transform 0.3s;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* 增加鼠标悬停样式，提示可点击 */
}

.analysis-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.analysis-image {
  max-width: 60px; /* 调整图片大小 */
  height: auto;
  margin: 0 auto; /* 图片居中 */
  display: block;
}

.analysis-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
}

.analysis-title {
  font-size: 1.35rem;
  color: #2c9c69;
  font-weight: bold;
  margin-bottom: 5px;
}

.analysis-description {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .analysis-card {
    height: auto;
    padding: 20px;
  }

  .analysis-title {
    font-size: 1.15rem;
  }

  .analysis-description {
    font-size: 0.95rem;
  }
}
</style>
