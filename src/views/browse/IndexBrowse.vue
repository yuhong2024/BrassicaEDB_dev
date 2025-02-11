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
                <h3>
                  <router-link :to="feature.path" class="feature-link">
                    <span class="species-name">{{ feature.name }}</span>
                  </router-link>
                </h3>
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
  padding: 20px; /* 增加内边距 */
  background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.3));
  border-radius: 15px; /* 添加圆角 */
}

.feature-section {
  margin: 20px 0;
}

.feature-section h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
  font-weight: 600;
}

/* 卡片样式调整 */
.feature-card {
  display: flex;
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(44, 156, 105, 0.1) !important; /* 保留淡化的边框 */
  border-radius: 10px;
  background: linear-gradient(135deg, #f5fafd 0%, #e2f7df 100%);
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05); /* 柔和的阴影 */
}

.feature-card:hover {
  transform: translateY(-5px);
  border: 1px solid rgba(44, 156, 105, 0.2) !important; /* hover时边框稍微明显 */
  box-shadow: 0 4px 20px 0 rgba(44, 156, 105, 0.1);
}

/* 图片大小和对齐 */
.feature-image {
  width: 100%;
  height: auto;
  max-width: 150px;
  border-radius: 8px;
  object-fit: contain;
}

.feature-content {
  padding-left: 20px;
}

.feature-link {
  font-size: 1.8rem; /* 增大标题字体 */
  color: #333;
  text-decoration: none !important;
}

.feature-link:hover {
  color: #2c9c69;
  font-size: 1.9rem;
  font-weight: bold;
  text-decoration: none !important;
}

.species-name {
  font-style: italic;
  font-size: 1.8rem; /* 增大物种名称字体 */
}

.feature-link:hover .species-name {
  font-size: 1.9rem;
}

/* 描述文字样式 */
.el-card p {
  font-size: 1.4rem; /* 增大描述文字 */
  color: #666;
  margin: 10px 0;
  line-height: 1.6;
}

/* 移除 el-card 默认边框和阴影 */
:deep(.el-card) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-card__body) {
  padding: 0;
  border: none;
}

/* 移除 el-row 和 el-col 的边框，但保留卡片边框 */
:deep(.el-row), :deep(.el-col) {
  border: none !important;
}

/* 添加响应式容器边距 */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .feature-card {
    margin-bottom: 15px;
  }
}
</style>
