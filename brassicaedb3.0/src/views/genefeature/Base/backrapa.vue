<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader
        title="Brassica rapa"
        :breadcrumbs="breadcrumbs"
    />

    <!-- 模块介绍卡片 -->
    <el-card class="module-card">
      <el-row>
        <el-col :span="4">
          <img :src="moduleLogo" alt="Logo" class="module-logo" />
        </el-col>
        <el-col :span="20">
          <h2>{{ moduleHeader }}</h2>
          <p>{{ moduleIntro }}</p>
        </el-col>
      </el-row>
    </el-card>

    <!-- 搜索框 -->
    <SearchBox />

    <!-- 统计信息和走马灯 -->
    <el-row>
      <el-col :span="12">
        <StatisticsPie />
      </el-col>
      <el-col :span="12">
        <ImageCarousel />
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <OmicsData />
    <GenomeData />
    <DownloadData />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';
import StatisticsPie from '@/components/genefeature/basepage/StatisticsPie.vue';
import ImageCarousel from '@/components/genefeature/basepage/ImageCarousel.vue';
import OmicsData from '@/components/genefeature/basepage/OmicsData.vue';
import GenomeData from '@/components/genefeature/basepage/GenomeData.vue';
import DownloadData from '@/components/genefeature/basepage/DownloadData.vue';
import SearchBox from '@/components/genefeature/basepage/SearchBox.vue';

const searchQuery = ref('');

const handleSearch = () => {
  console.log(`Searching for: ${searchQuery.value}`);
};

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/genefeature' },
  { name: 'Brassica rapa', path: '/genefeature/brassicarapa' }
];

const moduleHeader = 'Module Header';
const moduleIntro = 'This module provides an overview of the Brassica rapa.';
const moduleLogo = '@/assets/logo.jpg';
</script>

<style scoped>
.container {
  width: 90vw;
  max-width: 1200px; /* 控制最大宽度 */
  margin: 0 auto;    /* 居中显示 */
  padding: 0 40px;  /* 两侧间距 */
}

.module-card {
  margin-bottom: 20px;
  padding: 20px;
}

.module-logo {
  width: 100%;
  height: auto;
}

.text-center {
  text-align: center;
}

.py-8 {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
