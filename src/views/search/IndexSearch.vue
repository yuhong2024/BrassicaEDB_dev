<template>
  <div class="container">
    <!-- 标题居中对齐 -->
    <h1 class="page-title">BEDB Search</h1>

    <!-- Search Sections -->
    <el-row :gutter="20">
      <el-col v-for="searchItem in searchItems" :key="searchItem.name" :span="12">
        <el-card shadow="hover" class="search-card" @click="goToPage(searchItem.route)">
          <el-row>
            <el-col :span="8">
              <img :src="searchItem.image" alt="Search Image" class="search-image" />
            </el-col>
            <el-col :span="16" class="search-content">
              <h3 class="search-title">{{ searchItem.name }}</h3>
              <p>{{ searchItem.description }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 卡片中的搜索模块数据
import CoImage from '@/assets/img/analysis/Co.svg';
import GeneImage from '@/assets/img/analysis/Gene.svg';
import HomImage from '@/assets/img/analysis/Hom.svg';
import TFImage from '@/assets/img/analysis/TF.svg';
import TranscriptImage from '@/assets/img/analysis/Transcript.svg';

const searchItems = [
  {
    name: 'Co-expression Network Module',
    image: CoImage,
    description: 'Weighted Gene Co-expression Network Analysis (WGCNA) is a systems biology method for identifying co-expression relationships and modules...',
    route: '/search/coexpression'
  },
  {
    name: 'TF Regulatory Network Module',
    image: TFImage,
    description: 'Transcription factors are proteins that can bind to specific sequences of DNA to regulate the transcriptional activity of genes...',
    route: '/search/tf'
  },
  {
    name: 'Alternative Splicing Module',
    image: GeneImage,
    description: 'Alternative Splicing is an important process in gene expression regulation, which allows the same gene to produce multiple different mRNA transcripts...',
    route: '/search/splicing'
  },
  {
    name: 'Homologous Genes Module',
    image: HomImage,
    description: 'Homologous genes are genes that have similar sequences and functions in different species...',
    route: '/search/homologous'
  },
  {
    name: 'Transcriptional Expression Module',
    image: TranscriptImage,
    description: 'RNA-seq (RNA sequencing) is a high-throughput sequencing technique for studying gene transcription expression...',
    route: '/search/expression'
  }
];

// 页面跳转函数
const goToPage = (route) => {
  router.push(route);
};
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 标题样式 */
.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
}

/* 卡片式布局 */
.search-card {
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  background-color: #fdfdfd;
  border-radius: 12px; /* 添加圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  cursor: pointer;
}

.search-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* 更强的悬浮效果 */
  background-color: #f5f5f5; /* 悬浮时变为浅灰色背景 */
}

.search-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px; /* 圆角图片 */
}

.search-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
}

.search-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #409EFF;
  transition: color 0.3s;
}

.search-title:hover {
  color: #66b1ff; /* 悬停时变亮 */
}

.search-content p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}
</style>
