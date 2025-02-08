<script setup>
// Import species image
import speciesImage from '@/assets/img/home/genefeature/B2.png';

// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/browse' },
  { name: 'Brassica juncea', path: '/browse/brassicajuncea' },
];
</script>

<template>
  <!-- 面包屑导航栏 -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Brassica juncea</h1>
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
        <img :src="speciesImage" alt="Brassica juncea" class="species-image" />
      </div>
      <!-- 文本部分 -->
      <div class="info-container">
        <p>
          Brassica carinata, commonly known as Ethiopian mustard, is a leafy green vegetable primarily grown in Ethiopia. It belongs to the cruciferous family and is closely related to mustard. Its dark green leaves have a mild spice, making them more intense in flavor compared to kale or spinach. Known for its high nutritional value, it is rich in vitamins and minerals, and widely appreciated for its resilience in stress-prone environments.
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

/* 卡片式布局 - 覆盖 el-card */
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
