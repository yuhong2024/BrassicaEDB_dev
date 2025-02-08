<template>
  <div class="container">
    <!-- Brassica Features Section -->
    <div class="feature-section">
      <h2>{{ featureSectionTitle }}</h2>
      <el-row :gutter="20">
        <el-col v-for="feature in features" :key="feature.name" :span="12">
          <el-card shadow="hover" class="feature-card">
            <el-row>
              <el-col :span="8">
                <!-- Display fixed image, reduced size -->
                <img :src="feature.images[0]" alt="Feature Image" class="feature-image" />
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
import image1 from '@/assets/img/home/genefeature/B1.svg';
import image2 from '@/assets/img/home/genefeature/B2.svg';
import image3 from '@/assets/img/home/genefeature/B3.svg';
import image4 from '@/assets/img/home/genefeature/B4.svg';
import image5 from '@/assets/img/home/genefeature/B5.svg';
import image6 from '@/assets/img/home/genefeature/B6.svg';

const featureSectionTitle = 'Brassica Species';

const features = [
  {
    name: 'Brassica carinata',
    path: '/browse/carinata',
    images: [image1],
    description: 'Brassica carinata, commonly known as Ethiopian mustard, is a leafy green vegetable widely grown in Ethiopia...'
  },
  {
    name: 'Brassica juncea',
    path: '/browse/juncea',
    images: [image2],
    description: 'Brassica juncea, also known as mustard greens, is a common leafy vegetable that belongs to the cruciferous family...'
  },
  {
    name: 'Brassica napus',
    path: '/browse/napus',
    images: [image3],
    description: 'Brassica napus, known as rapeseed or canola, is primarily grown for its seeds, which are used to produce edible oil...'
  },
  {
    name: 'Brassica nigra',
    path: '/browse/nigra',
    images: [image4],
    description: 'Brassica nigra, commonly known as black mustard, is a plant whose seeds are often used to make mustard condiments...'
  },
  {
    name: 'Brassica oleracea',
    path: '/browse/oleracea',
    images: [image5],
    description: 'Brassica oleracea includes a variety of leafy green vegetables, such as cabbage, broccoli, and kale...'
  },
  {
    name: 'Brassica rapa',
    path: '/browse/rapa',
    images: [image6],
    description: 'Brassica rapa, also known as turnip greens or Chinese cabbage, is especially popular in East Asia...'
  }
];
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 99%;
  margin: 0 auto;
  padding: 5px;
}

.feature-section {
  margin: 40px 0;
}

.feature-section h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
}

/* 卡片样式调整 */
.feature-card {
  display: flex;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f5fafd 0%, #e2f7df 100%);
  margin-bottom: 20px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* 图片大小和对齐 */
.feature-image {
  width: 100%;
  height: auto;
  max-width: 150px; /* 限制图片最大宽度 */
  border-radius: 8px;
  object-fit: contain;
}

.feature-content {
  padding-left: 20px;
}

.feature-link {
  font-size: 1.5rem;
  margin: 0 0 10px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s, font-size 0.3s, font-weight 0.3s;
}

.feature-link:hover {
  color: #2c9c69;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: underline;
}

.el-card p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
