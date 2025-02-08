<script setup>
// 导入物种图片
import speciesImage from '@/assets/img/home/genefeature/B3.svg';

// 面包屑导航配置
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/browse' },
  { name: 'Brassica napus', path: '/browse/napus' },
];
</script>

<template>
  <!-- 面包屑导航栏 -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Brassica napus</h1>
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
        <img :src="speciesImage" alt="Brassica napus" class="species-image" />
      </div>
      <!-- 文本内容 -->
      <div class="info-container">
        <p>
          <i>Brassica napus</i> (AACC, 2n=38) is an important oil crop that originated from <i>Brassica rapa</i> and 
          <i>Brassica oleracea</i> about 7500 years ago. Growing 60-120 cm tall with broad leaves and yellow flowers, 
          it produces long pods containing small, hard seeds. The plant thrives in temperate climates and 
          prefers fertile, well-drained soil. Its oil is rich in unsaturated fatty acids, beneficial for 
          health and widely used in the food industry. Key management practices include proper timing of 
          sowing (spring or autumn), fertilization, and pest control.
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

/* 介绍卡片样式 */
.introduction-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

/* 介绍内容样式 */
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
