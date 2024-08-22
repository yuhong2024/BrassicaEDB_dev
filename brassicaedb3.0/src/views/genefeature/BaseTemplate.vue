<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader :title="title" :breadcrumbs="breadcrumbs" />

    <!-- 模块介绍卡片 -->
    <el-card class="module-card">
      <el-row>
        <el-col :span="4">
          <img :src="moduleLogo" alt="Logo" class="module-logo" />
        </el-col>
        <el-col :span="20">
          <h2>{{ title }}</h2>
          <p>{{ moduleIntro }}</p>
        </el-col>
      </el-row>
    </el-card>

    <!-- 搜索框 -->
    <el-row class="text-center py-8">
      <el-col>
        <el-card class="box-card" shadow="never">
          <el-input v-model="searchQuery" placeholder="Search..." />
          <el-button type="primary" @click="handleSearch">Search</el-button>
        </el-card>
      </el-col>
    </el-row>

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
import {defineProps, ref} from 'vue';
import { useRoute } from 'vue-router';
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';
import StatisticsPie from '@/components/genefeature/basepage/StatisticsPie.vue';
import ImageCarousel from '@/components/genefeature/basepage/ImageCarousel.vue';
import OmicsData from '@/components/genefeature/basepage/OmicsData.vue';
import GenomeData from '@/components/genefeature/basepage/GenomeData.vue';
import DownloadData from '@/components/genefeature/basepage/DownloadData.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    required: true
  }
});

const route = useRoute();

const searchQuery = ref('');

const handleSearch = () => {
  console.log(`Searching for: ${searchQuery.value}`);
};

const title = route.meta.title || 'Default Title';
// const breadcrumbs = route.meta.breadcrumbs || [];

const moduleIntro = 'The transcriptome level provides Brassica researchers with a comprehensive and user-friendly interactive tool for gene expression profiling data, the Brassica Expression Database (BrassicaEDB). Using this database, researchers can quickly retrieve target gene expression level data, elucidate gene function, and advance Brassica breeding at the transcriptome level.';
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

.box-card {
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}

.py-8 {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
