<script setup>
// 导入 TF 图片
import tfImage from '@/assets/img/analysis/TF.svg';

// 面包屑导航配置
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'TF Regulatory Network', path: '/search/tf' }
];
</script>

<template>
  <!-- 面包屑导航 -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>TF Regulatory Network</h1>
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

  <!-- 介绍部分 -->
  <div class="introduction-card">
    <div class="introduction">
      <!-- 图片部分 -->
      <div class="image-container">
        <img :src="tfImage" alt="TF Regulatory Network Image" class="species-image" />
      </div>
      <!-- 文本部分 -->
      <div class="info-container">
        <p>
          Transcription factors can bind to specific DNA sequences to regulate the transcriptional activity of 
          genes. Transcription factor regulatory networks are concerned with how transcription factors regulate 
          the transcription process of genes, thereby affecting the function and properties of cells. 
          Transcription factor regulatory network plays an equally important role in plant growth and development, 
          environmental adaptation and evolution, and its research is of great significance for improving crop 
          performance, coping with environmental changes, and promoting sustainable agricultural development.
        </p>
        <p>
          Weighted Gene Co-expression Network Analysis (WGCNA) is a systems biology method for identifying 
          co-expression relationships and modules between genes. It is commonly used to reveal underlying 
          structures in gene expression data and to identify gene modules associated with a particular phenotype. 
          Helps organize large-scale genetic data into actionable modules, further analysis and validation can 
          help researchers gain insight into the relationship between genes and phenotypes, researchers find 
          patterns in complex genomic data, understand biological mechanisms, and provide valuable clues for 
          subsequent experimental research.
        </p>
        <p>
          We performed WGCNA analysis on the obtained transcriptome data and identified the transcription 
          factors of six <i>Brassica</i> species. At the same time, we predicted the regulatory network of 
          each transcription factor, and combined the two networks to obtain the regulatory network of 
          transcription factor co-expression.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 面包屑导航样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.7rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  margin: 0 8px;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* 介绍卡片样式 */
.introduction-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

/* 介绍部分样式 */
.introduction {
  display: flex;
  align-items: center;
  gap: 20px;
}

.image-container {
  flex: 0 0 150px;
}

.species-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.info-container {
  flex: 1;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .introduction {
    flex-direction: column;
    text-align: center;
  }

  .image-container {
    width: 120px;
    margin-bottom: 15px;
  }

  .info-container {
    text-align: left;
  }
}
</style>
