<template>
  <div class="home">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Home</el-breadcrumb-item>
        <el-breadcrumb-item>BrassicaEDB</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 介绍部分 -->
    <IntroText />



    <!-- 搜索部分卡片式布局 -->
    <el-card shadow="hover" class="search-card">
      <SearchGene />
    </el-card>

    <!-- 轮播图 -->
    <div class="carousel-container">
      <Carousel />
    </div>


    <!-- 统计部分 -->
    <Statistics />

    <!-- 图表部分 -->
    <div class="charts-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <StatisticsChart :title="'Summary (Species)'" :chartOptions="barChartOptions" />
        </el-col>
        <el-col :span="12">
          <StatisticsChart :title="'Summary (Genome Distribution)'" :chartOptions="pieChartOptions" />
        </el-col>
      </el-row>
    </div>

    <!-- 新的 DisplayCard 组件 -->
    <DisplayCard />


    <!-- 返回顶部按钮 -->
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DisplayCard from '@/components/home/DisplayCard.vue';

import IntroText from '@/components/home/IntroText.vue';
import Carousel from '@/components/home/Carousel.vue';
import SearchGene from '@/components/SearchGene.vue';
import Statistics from '@/components/home/Statistics.vue';
import StatisticsChart from '@/components/home/StatisticsChart.vue';





const barChartOptions = ref({});
const pieChartOptions = ref({});
const fetchData = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/homeboard/');
    const data = response.data;

    // 更新柱状图配置
    barChartOptions.value = {

      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: Object.keys(data.biosample_bar),
        axisLabel: {
          interval: 0, // 保证显示所有标签
          rotate: 40,  // 旋转标签角度
          margin: 4  // 标签与轴线之间的距离
        }
      },
      yAxis: { type: 'value' },
      series: [{ data: Object.values(data.biosample_bar), type: 'bar' }]
    };

    // 更新饼图配置
    pieChartOptions.value = {

      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Genomes',
          type: 'pie',
          radius: '80%',
          data: Object.entries(data.genome_pie).map(([name, value]) => ({
            value,
            name
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);


</script>

<style scoped>
/* 面包屑导航 */
.breadcrumb-container {
  padding: 16px 0;
  border-bottom: 2px solid #42b983; /* 主题色作为底边 */
  background-color: #ffffff;
}

/* 轮播图容器 */
.carousel-container {
  margin:25px 0;
}

/* 搜索容器 */
.search-container {
  margin: 30px 0;
}

/* 搜索卡片 */
.search-card {
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 10px; /* 圆角处理 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  background: linear-gradient(135deg, #42b983, #8fd3f4); /* 使用渐变背景 */
}

/* 图表容器 */
.charts-container {
  margin: 2px 0;
}




</style>


