<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader :title="pageTitle" :breadcrumbs="breadcrumbs" />

    <!-- 固定的顶部 -->
    <div class="header">
      <h1>{{ pageTitle }}</h1>
    </div>

    <!-- 物种介绍 -->
    <el-card class="species-card">
      <el-row>
        <el-col :span="8">
          <img :src="speciesImage" alt="Species Image" class="species-image" />
        </el-col>
        <el-col :span="16" class="species-info">
          <h2>{{ speciesName }}</h2>
          <p>{{ speciesDescription }}</p>
        </el-col>
      </el-row>
    </el-card>

    <!-- 搜索栏 -->
    <el-card class="search-card">
      <h2>Search Gene Information</h2>
      <el-input v-model="geneId" placeholder="Enter Gene ID" class="search-input" />
      <el-button @click="searchGene">Search</el-button>
      <el-table v-if="geneInfo" :data="geneInfo" class="gene-table">
        <el-table-column v-for="(value, key) in geneInfo[0]" :prop="key" :label="key" :key="key" />
      </el-table>
    </el-card>

    <!-- 统计数据展示 -->
    <el-card class="statistics-card">
      <h2>Statistics</h2>
      <el-row :gutter="20">
        <el-col :span="12">
          <StatisticsChart :title="'Bar Chart'" :chartOptions="barChartOptions" />
        </el-col>
        <el-col :span="12">
          <StatisticsChart :title="'Pie Chart'" :chartOptions="pieChartOptions" />
        </el-col>
      </el-row>
    </el-card>

    <!-- 走马灯 -->
    <el-card class="carousel-card">
      <h2>Image Carousel</h2>
      <el-carousel :interval="5000" height="300px" arrow="always">
        <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <img :src="image" alt="Carousel Image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <!-- 描述性卡片 -->
    <el-card class="description-card">
      <h2>{{ descriptionTitle }}</h2>
      <p>{{ descriptionText }}</p>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';
import StatisticsChart from '@/components/home/StatisticsChart.vue';
import axios from 'axios';

const pageTitle = 'Gene Feature Template';
const breadcrumbs = reactive([
  { name: 'Home', path: '/' },
  { name: 'Gene Feature', path: '/genefeature' },
  { name: 'Template', path: '/genefeature/template' }
]);

const speciesName = 'Species Name';
const speciesDescription = 'Species description goes here. This section provides information about the species.';
const speciesImage = require('@/assets/home/genefeature/species.png');

const geneId = ref('');
const geneInfo = ref(null);

const searchGene = async () => {
  try {
    const response = await axios.get(`/api/v1/homology/${geneId.value}`);
    geneInfo.value = [response.data];
  } catch (error) {
    console.error('Error fetching gene information:', error);
  }
};

const barChartOptions = ref({
  title: { text: 'Bar Chart', left: 'center' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: { type: 'value' },
  series: [{ data: [10, 20, 30, 40, 50], type: 'bar' }]
});

const pieChartOptions = ref({
  title: { text: 'Pie Chart', left: 'center' },
  tooltip: { trigger: 'item' },
  series: [
    {
      name: 'Categories',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 10, name: 'A' },
        { value: 20, name: 'B' },
        { value: 30, name: 'C' },
        { value: 40, name: 'D' },
        { value: 50, name: 'E' }
      ],
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }
  ]
});

const carouselImages = [
  require('../../assets/img/home/genefeature/B1.svg'),
  require('../../assets/img/home/genefeature/B2.svg'),
  require('../../assets/img/home/genefeature/B3.svg')
];

const descriptionTitle = 'Title';
const descriptionText = 'This is a description text.';
</script>

<style scoped>
.container {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.species-card, .search-card, .statistics-card, .carousel-card, .description-card {
  margin-bottom: 20px;
}

.species-image, .carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.species-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
}

.search-input {
  margin-right: 10px;
}

.gene-table {
  margin-top: 20px;
}
</style>
