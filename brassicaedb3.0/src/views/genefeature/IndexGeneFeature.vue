<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader :title="pageTitle" :breadcrumbs="breadcrumbs" />

    <!-- Brassica Features 板块 -->
    <div class="feature-section">
      <h2>{{ featureSectionTitle }}</h2>
      <el-row :gutter="20">
        <el-col v-for="feature in features" :key="feature.name" :span="24">
          <el-card shadow="hover" class="feature-card">
            <el-row>
              <el-col :span="8">
                <el-carousel trigger="click" :interval="5000" arrow="always">
                  <el-carousel-item v-for="(img, index) in feature.images" :key="index">
                    <img :src="img" alt="Feature Image" class="feature-image" />
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col :span="16" class="feature-content">
                <h3><router-link :to="feature.path" class="feature-link">{{ feature.name }}</router-link></h3>
                <p>{{ feature.description }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';
import image1 from '@/assets/img/home/genefeature/B1.svg'; // 引入图片
import image2 from '@/assets/img/home/genefeature/B2.svg';
import image3 from '@/assets/img/home/genefeature/B3.svg';
import image4 from '@/assets/img/home/genefeature/B4.svg';
import image5 from '@/assets/img/home/genefeature/B5.svg';
import image6 from '@/assets/img/home/genefeature/B6.svg';

const pageTitle = 'Brassica Feature';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/genefeature' },
];

const featureSectionTitle = 'Brassica Species ';

const features = [
  {
    name: 'Brassica carinata',
    path: '/genefeature/brassicacarinata',
    images: [image1, image2, image3], // 使用多张图片
    description: 'A leafy green vegetable commonly grown in Ethiopia. It belongs to the cruciferous family and is related to mustard. Ethiopian mustard leaves are usually dark green and slightly spicy, more intense than regular kale or spinach. High nutritional value, rich in vitamins and minerals.'
  },
  {
    name: 'Brassica juncea',
    path: '/genefeature/juncea',
    images: [image2, image2, image3],
    description: 'A common leafy vegetable belonging to the cruciferous family. It is native to Asia, especially China and India, and has a long history of cultivation. Mustard is rich in vitamins A, C, and K as well as minerals such as calcium and iron. It\'s also high in dietary fiber, which helps with digestion and health. Mustard is fast growing, adaptable and can be grown in a variety of climates with low requirements for environmental conditions, but is best grown in a sunny area.'
  },
  {
    name: 'Brassica napus',
    path: '/genefeature/napus',
    images: [image3, image2, image3],
    description: 'Oil crops mainly used in the production of edible oil. The plant is 60-120 cm tall, with broad leaves and yellow flowers. The fruit is a long pod containing small, hard seeds. Suitable for temperate climates, preferring fertile, well-drained soil. Sowing, usually in spring or autumn, fertilization and pest control are important management measures. The fruit is harvested when ripe, and the treated seeds are used for oil extraction. The oil of brassica napola is rich in unsaturated fatty acids, which is good for health and is widely used in food industry.'
  },
  {
    name: 'Brassica nigra',
    path: '/genefeature/nigra',
    images: [image4, image2, image3],
    description: 'A plant belonging to the cruciferous family，also known as black mustard. Its seeds are often used to make mustard, a spicy condiment. The seeds are black or dark brown, usually small and pungent, and are often used as a flavoring or in traditional medicine. Black mustard is also used in a variety of dishes, especially in Asian and European cooking.'
  },
  {
    name: 'Brassica oleracea',
    path: '/genefeature/oleracea',
    images: [image5, image2, image3],
    description: 'A common leafy green vegetable, also known as cabbage or cabbage heart. The leaves of kale are round and usually form a tight spherical head. It can be green, purple or red, depending on the variety. The taste of kale is fresh and slightly sweet, and the texture is crisp and tender, which is suitable for raw or cooked food. Kale is a nutritious source of vitamin C, vitamin K, fiber, and many minerals. Kale is relatively simple to grow, adaptable, and usually grows well in cooler seasons.'
  },
  {
    name: 'Brassica rapa',
    path: '/genefeature/rapa',
    images: [image6, image2, image3],
    description: 'A common leafy vegetable belonging to the cruciferous family. It is especially popular in China and East Asia. Cabbage leaves are broad, ranging in color from light green to dark green, with distinct veins and soft texture. It has thicker roots and usually grows in the soil to form a rounded head. Cabbage is rich in vitamin C, vitamin K, folate and minerals such as calcium and iron. Adaptable, it can grow in different climates and is grown in many parts of the world.'
  }
];
</script>

<style scoped>
.container {
  width: 90vw;
  max-width: 1200px; /* 控制最大宽度 */
  margin: 0 auto;    /* 居中显示 */
}

.feature-section {
  margin: 40px 0;
}

.feature-section h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: #333;
}

.feature-card {
  display: flex;
  padding: 20px;
  transition: transform 0.3s;
  margin-bottom: 20px; /* 增加卡片间距 */
  height: auto;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.feature-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;


}

.feature-link {
  font-size: 1.5rem; /* 调整字体大小 */
  margin: 0 0 10px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s, font-size 0.3s, font-weight 0.3s;
  white-space: nowrap; /* 防止换行 */
}

.feature-link:hover {
  color: #2c9c69;
  font-size: 1.6rem; /* 调整悬停时字体大小 */
  font-weight: bold;
  text-decoration: underline;
}

.el-card p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
