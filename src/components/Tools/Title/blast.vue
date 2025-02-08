<script setup>
// 引入 BLAST 工具的图片
import blastImage from '@/assets/img/home/tools/blast.png';

// 面包屑导航配置
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'BLAST', path: '/tools/blast' }
];
</script>

<template>
  <!-- 面包屑导航 -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>BLAST</h1>
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
        <img :src="blastImage" alt="BLAST Image" class="species-image" />
      </div>
      <!-- 文本部分 -->
      <div class="info-container">
        <p>
          The <strong>BLAST</strong> (Basic Local Alignment Search Tool) is a powerful algorithm for comparing biological sequences. It allows researchers to find regions of similarity between nucleotide or protein sequences and database sequences, enabling functional annotation, evolutionary studies, and sequence-based discoveries.
          <br />
          With its various modes, such as <strong>blastn</strong> (nucleotide sequences) and <strong>blastp</strong> (protein sequences), BLAST is an essential tool in genomics and molecular biology research.
          <br />
          <a href="https://blast.ncbi.nlm.nih.gov/Blast.cgi" target="_blank">[NCBI BLAST]</a>
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
  padding: 10px 20px;
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

/* 卡片布局样式 */
.introduction-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

/* 介绍部分 */
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

.info-container a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.info-container a:hover {
  text-decoration: underline;
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
