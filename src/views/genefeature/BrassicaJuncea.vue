<template>
  <div class="container">
    <!-- 直接写在当前页面的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Brassica juncea</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Introduction Section -->
    <el-card class="introduction-card" shadow="hover">
      <div class="introduction">
        <div class="image-container">
          <img :src="speciesImage" alt="Brassica juncea Image" class="species-image" />
        </div>
        <div class="info-container">
          <p>A common leafy vegetable belonging to the cruciferous family. It is native to Asia, especially China and India.</p>
          <p>Rich in vitamins A, C, and K as well as minerals such as calcium and iron.</p>
          <p>High in dietary fiber, which helps with digestion and health.</p>
        </div>
      </div>
    </el-card>

    <!-- SearchGene 板块 -->
    <el-card shadow="hover" class="chart-card search-card">
      <SearchGene species="C" @search-complete="handleSearchComplete" />
    </el-card>

    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="chart-card bar-chart-card">
      <v-chart :option="horizontalBarChartOptions" style="width: 100%; height: 500px;" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchGene from '@/components/SearchGene.vue';
import * as echarts from 'echarts';

// Import species image
import speciesImage from '@/assets/img/home/genefeature/B2.svg';

// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/genefeature' },
  { name: 'Brassica juncea', path: '/genefeature/brassicajuncea' }
];

// Horizontal Bar Chart Configuration
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_juncea.AU213",
    "Brassica_juncea.Tumida_V2"
  ];

  const values = [99904, 100829];

  horizontalBarChartOptions.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'value',
      name: 'Genome Count',
      axisLabel: { formatter: '{value}' }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        interval: 0,
        fontSize: 12,
        formatter: function (value) {
          return value.length > 15 ? value.slice(0, 15) + '...' : value;  // Shorten long labels
        }
      }
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        data: values,
        barWidth: '60%',
        itemStyle: {
          color: function (params) {
            const colors = ['#5470C6', '#91CC75'];
            return colors[params.dataIndex % colors.length];
          }
        }
      }
    ],
    grid: {
      left: '15%',
      right: '10%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    }
  };
};

// Render the bar chart on mounted
onMounted(drawBarChart);
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px; /* 增加最大宽度，减少页面空白 */
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
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
  font-size: 1.5rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* Introduction 部分样式 */
.introduction {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.image-container {
  flex: 0 0 15%;
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
  font-family: 'Roboto', sans-serif;
}

/* 卡片式布局 */
.el-card {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 250px;
}

/* 搜索卡片样式 */
.search-card {
  padding: 20px;
  background: linear-gradient(135deg, #eef2f6, #f8fbff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.search-card:hover {
  transform: translateY(-5px);
}

.search-container h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 10px;
}

.search-container .el-row {
  margin-bottom: 15px;
}

.search-container .el-input {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-container .el-button {
  border-radius: 8px;
  background-color: #42b983;
  border: none;
}

.search-container .el-button:hover {
  background-color: #38a070;
}

/* 横向柱状图样式 */
.bar-chart-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.el-card {
  border-radius: 12px;
}

/* 响应式布局：在小屏幕上自动调整布局 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .breadcrumb-left h1 {
    font-size: 1.2rem;
  }

  .introduction {
    flex-direction: column;
  }

  .image-container {
    margin-bottom: 20px;
    flex: 0 0 auto;
  }

  .info-container {
    padding-left: 0;
  }
}
</style>
