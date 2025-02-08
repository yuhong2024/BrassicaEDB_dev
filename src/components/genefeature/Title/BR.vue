<script setup>
// Import species image
import speciesImage from '@/assets/img/home/genefeature/B6.svg';

// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/browse' },
  { name: 'Brassica rapa', path: '/browse/rapa' },
];
</script>

<template>
  <!-- 面包屑导航栏 -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Brassica rapa</h1>
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
        <img :src="speciesImage" alt="Brassica rapa" class="species-image" />
      </div>
      <!-- 文本部分 -->
      <div class="info-container">
        <p>
          <i>Brassica rapa</i> (AA, 2n=20) originated in northern China and was introduced to Japan and Europe in 
          the 19th century. This popular cruciferous vegetable features broad leaves ranging from light to 
          dark green, with distinct veins and soft texture. It develops thicker roots and typically forms 
          a rounded head in the soil. Rich in vitamins C and K, folate, and minerals such as calcium and 
          iron, this adaptable plant thrives in various climates and is cultivated worldwide.
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

/* 卡片式布局 */
.introduction-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px; /* 统一 padding */
  margin-bottom: 20px; /* 卡片之间的间距 */
}

/* Introduction 部分 */
.introduction {
  display: flex;
  align-items: center;
  gap: 20px;
}

.image-container {
  flex: 0 0 150px; /* 固定图片宽度 */
}

.species-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.info-container {
  flex: 1; /* 占据剩余空间 */
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6; /* 提高文本的行高 */
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
