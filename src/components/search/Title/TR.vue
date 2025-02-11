<script setup>
// Import species image
import speciesImage from '@/assets/img/home/search/EXP.svg';

// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Transcript Expression', path: '/search/expression' },
];
</script>

<template>
  <!-- 面包屑导航栏 -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Transcript Expression</h1>
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

  <!-- Introduction Section -->
  <div class="introduction-card">
    <div class="introduction">
      <!-- 图片部分 -->
      <div class="image-container">
        <img :src="speciesImage" alt="Transcript Expression Image" class="species-image" />
      </div>
      <!-- 文本部分 -->
      <div class="info-container">
        <p>
          RNA-seq (RNA sequencing) is a high-throughput sequencing technique for studying gene transcription
          expression, identifying changes in gene expression, and exploring the complexity of the transcriptome.
          RNA-seq provides comprehensive transcriptome data, including the expression of known genes and the
          discovery of new transcripts. It has been widely used in gene function research, disease mechanism
          exploration and drug research and development.
        </p>
        <p>
          With RNA-seq, you can obtain the amount of gene expression under different conditions and explain
          the relationship between the expressed gene and experimental conditions or biological phenomena,
          which is very important for understanding gene function and regulation.
        </p>
        <p>
          We use <i>Brassica carinata</i> (10167), <i>Brassica juncea</i> (Tumida_V2), <i>Brassica napus</i>
          (ZS11), <i>Brassica nigra</i> (NI100_V2), <i>Brassica oleracea</i> (JZS_V2), <i>Brassica rapa</i>
          (Chiifu_V4) as reference genomes. And then filtered the collected transcriptome samples using fastp,
          compared the filtered results with star, counted them using featurecounts, and converted the counts
          into TPM (number of transcripts per million).
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 面包屑导航栏 */
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

/* 卡片式布局 */
.introduction-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

/* Introduction 部分 */
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
  line-height: 1.3;
}

.info-container p {
  margin: 0;
  padding: 0;
}

.info-container p + p {
  margin-top: 4px;
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
