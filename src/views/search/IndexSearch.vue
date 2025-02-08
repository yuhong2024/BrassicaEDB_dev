<template>
  <!-- 页面整体容器 -->
  <div class="container">
    <!-- 标题 -->
    <h1 class="page-title">BEDB Search</h1>

    <!-- 搜索模块布局 -->
    <div class="search-section">
      <el-row :gutter="30" justify="center">
        <el-col v-for="searchItem in searchItems" :key="searchItem.name" :xs="24" :sm="24" :md="12" :lg="12">
          <el-card shadow="hover" class="search-card" @click="goToPage(searchItem.route)">
            <!-- 卡片内容 -->
            <div class="card-content">
              <img :src="searchItem.image" alt="Icon" class="search-image" />
              <div class="card-text">
                <h3 class="search-title">{{ searchItem.name }}</h3>
                <p>{{ searchItem.description }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 路由跳转
const router = useRouter();
const goToPage = (route) => router.push(route);

// 图片导入
import ExpressionImage from '@/assets/img/analysis/Transcript.svg';
import HomologousImage from '@/assets/img/home/search/Hom.svg';
import EfpImage from '@/assets/img/home/search/efp.svg';
import RegulationImage from '@/assets/img/analysis/TF.svg';
import SplicingImage from '@/assets/img/home/search/AS.svg';
import PantranmeImage from '@/assets/img/home/search/Pan.svg';

// 搜索模块数据
const searchItems = [
  {
    name: 'Gene Expression',
    image: ExpressionImage,
    description: 'Analyze gene expression patterns across different tissues, treatments, and developmental stages using comprehensive RNA-seq data.',
    route: '/search/expression'
  },
  {
    name: 'Gene Homologous',
    image: HomologousImage,
    description: 'Identify homologous genes across species, elucidate their functions, and accelerate Brassica genetic research and breeding.',
    route: '/search/homologous'
  },
  {
    name: 'Gene eFP',
    image: EfpImage,
    description: 'Visualize gene expression data in different tissues and conditions using electronic Fluorescent Pictograph browser.',
    route: '/search/efp'
  },
  {
    name: 'Gene Regulation Network',
    image: RegulationImage,
    description: 'Explore transcription factor-target relationships and regulatory interactions at the transcriptional level across multiple Brassica species.',
    route: '/search/tf'
  },
  {
    name: 'Gene Alternative Splicing',
    image: SplicingImage,
    description: 'Investigate splice variants and explore gene structure, expression, and function across multiple Brassica species.',
    route: '/search/splicing'
  },
  {
    name: 'Gene Pantranme',
    image: PantranmeImage,
    description: 'Analyze gene expression patterns and relationships across the Brassica pan-transcriptome to understand gene function and evolution.',
    route: '/search/pantranme'
  }
];
</script>

<style scoped>
/* 页面背景样式 */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  border-radius: 12px;
}

/* 页面标题样式 */
.page-title {
  text-align: center;
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 40px;
  font-weight: bold;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
}

/* 卡片外观 */
.search-card {
  height: 250px;
  margin-bottom: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 15px;
  cursor: pointer;
}

.card-content {
  display: flex;
  align-items: center;
  padding: 20px;
  height: 100%;
  gap: 25px;
}

.search-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  transition: transform 0.3s;
}

.card-text {
  flex: 1;
  text-align: left;
}

.search-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
}

.card-text p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

/* 悬停效果 */
.search-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.search-card:hover .search-image {
  transform: scale(1.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  
  .search-card {
    height: auto;
    min-height: 200px;
  }
  
  .card-content {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
  
  .search-image {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
  }
  
  .card-text {
    text-align: center;
  }
}
</style>
