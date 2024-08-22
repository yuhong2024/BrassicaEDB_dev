<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader
        title="Brassica carinata"
        :breadcrumbs="breadcrumbs"
    />

    <!-- Introduction 板块 -->
    <el-card class="introduction-card" shadow="hover">
      <div class="introduction">
        <div class="image-container">
          <img :src="speciesImage" alt="Brassica carinata Image" class="species-image" />
        </div>
        <div class="info-container">
          <h2>Brassica carinata</h2>
          <p>A leafy green vegetable commonly grown in Ethiopia. It belongs to the cruciferous family and is related to mustard.</p>
          <p>Ethiopian mustard leaves are usually dark green and slightly spicy, more intense than regular kale or spinach.</p>
          <p>High nutritional value, rich in vitamins and minerals.</p>
        </div>
      </div>
    </el-card>

    <!-- SearchGene 板块 -->
    <el-card shadow="hover" class="chart-card search-card">
      <SearchGene species="A" @search-complete="handleSearchComplete" />
    </el-card>

    <!-- 统计信息 -->
    <div v-if="showCharts" class="charts-container">
      <el-row :gutter="10">
        <!-- 左侧的饼状图 -->
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card pie-card">
            <StatisticsChart :title="'Summary (Pie Chart)'" :chartOptions="pieChartOptions" />
          </el-card>
        </el-col>

        <!-- 右侧的两个横向柱状图 -->
        <el-col :span="12">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-card shadow="hover" class="chart-card bar-card">
                <StatisticsChart :title="'Horizontal Bar Chart 1'" :chartOptions="horizontalBarChartOptions1" />
              </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 10px;">
              <el-card shadow="hover" class="chart-card bar-card">
                <StatisticsChart :title="'Horizontal Bar Chart 2'" :chartOptions="horizontalBarChartOptions2" />
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';
import SearchGene from '@/components/SearchGene.vue';
import StatisticsChart from "@/components/home/StatisticsChart.vue";

// 导入图片
import speciesImage from '@/assets/img/home/genefeature/B1.svg';

// 面包屑导航配置
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/genefeature' },
  { name: 'Brassica carinata', path: '/genefeature/brassicacarinata' }
];

// 图表显示控制
const showCharts = ref(true);

const handleSearchComplete = (hasResult) => {
  showCharts.value = !hasResult;
};

// 饼状图配置
const pieChartOptions = {
  title: { text: 'Pie Chart', left: 'center', top: '10%' },
  tooltip: { trigger: 'item' },
  legend: { bottom: '0%' },
  series: [
    {
      name: 'Categories',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 40, name: 'A' },
        { value: 30, name: 'B' },
        { value: 20, name: 'C' },
        { value: 10, name: 'D' }
      ],
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }
  ]
};

// 第一个横向柱形图配置
const horizontalBarChartOptions1 = {
  title: { text: 'Bar Chart 1', left: 'center', top: '5%' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'value', boundaryGap: [0, 0.01] },
  yAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
  series: [
    {
      name: 'Categories',
      type: 'bar',
      data: [40, 30, 20, 10],
      barWidth: '20%',
      barCategoryGap: '30%',
      itemStyle: { color: '#3398DB' }
    }
  ],
  grid: {
    left: '12%',
    right: '12%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  }
};

// 第二个横向柱形图配置
const horizontalBarChartOptions2 = {
  title: { text: 'Bar Chart 2', left: 'center', top: '10%' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'value', boundaryGap: [0, 0.01] },
  yAxis: { type: 'category', data: ['E', 'F', 'G', 'H'] },
  series: [
    {
      name: 'Categories',
      type: 'bar',
      data: [25, 35, 45, 55],
      barWidth: '20%',
      itemStyle: { color: '#67C23A' }
    }
  ],
  grid: {
    left: '10%',
    right: '10%',
    bottom: '10%',
    top: '10%',
    containLabel: true
  }
};
</script>

<style scoped>
.container {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 30px;
}

.introduction {
  display: flex;
  align-items: flex-start;
}

.image-container {
  flex: 0 0 30%;
  text-align: center;
}

.species-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.info-container {
  flex: 1;
  padding-left: 20px;
}

.introduction-card {
  margin-bottom: 20px;
  padding: 20px;
}

.charts-container {
  margin-top: 20px;
}

.search-card {
  margin-bottom: 20px;
  padding: 20px;
}

.pie-card {
  height: 605px;
}

.bar-card {
  height: 295px;
}
</style>
