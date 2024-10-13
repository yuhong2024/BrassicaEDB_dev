<template>
  <div class="container">
    <!-- 直接写在当前页面的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Brassica carinata</h1>
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
          <img :src="speciesImage" alt="Brassica carinata Image" class="species-image" />
        </div>
        <div class="info-container">
          <p>
            Brassica carinata, commonly known as Ethiopian mustard, is a leafy green vegetable primarily grown in Ethiopia.
            It belongs to the cruciferous family and is closely related to mustard. Its dark green leaves have a mild spice,
            making them more intense in flavor compared to kale or spinach. Known for its high nutritional value, it is rich in vitamins and minerals,
            and widely appreciated for its resilience in stress-prone environments.
          </p>
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
import speciesImage from '@/assets/img/home/genefeature/B1.svg';

// Breadcrumbs Configuration
const breadcrumbs = [
  {name: 'Home', path: '/'},
  {name: 'Gene feature', path: '/genefeature'},
  {name: 'Brassica carinata', path: '/genefeature/brassicacarinata'}
];

// Horizontal Bar Chart Configuration
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_carinata.10167_V1",
    "Brassica_carinata_Gomenzer",
    "Brassica_carinata.ZD_V1"
  ];

  const values = [102123, 133235, 97149];

  horizontalBarChartOptions.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'}
    },
    xAxis: {
      type: 'value',
      name: 'Genome Count',
      axisLabel: {formatter: '{value}'}
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        interval: 0,
        fontSize: 12,
        formatter: function (value) {
          return value;  // Ensure full labels are shown
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
            const colors = ['#5470C6', '#91CC75', '#FAC858'];
            return colors[params.dataIndex % colors.length];
          }
        }
      }
    ],
    grid: {
      left: '15%',  // Decrease the left margin to reduce whitespace
      right: '10%',
      bottom: '10%',
      top: '10%',
      containLabel: true  // Ensure labels fit inside the chart area
    }
  };
};

onMounted(drawBarChart);
</script>

<style scoped>
/* 设置全局样式，消除默认 margin 和 padding */
/* 设置全局样式，消除默认 margin 和 padding */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px; /* 增大最大宽度，减少页面空白 */
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
  margin-bottom: 20px; /* 与下方卡片保持间距 */
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

/* 卡片式布局 */
.el-card {
  margin-bottom: 30px; /* 卡片之间的间距 */
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 250px; /* 确保所有卡片最小高度一致 */
}

/* Introduction 部分样式 */
.introduction {
  display: flex;
  justify-content: space-between; /* 保持左右布局 */
  align-items: center;
  flex-wrap: wrap; /* 当屏幕变小时自动换行 */
  margin-bottom: 20px;
}

.image-container {
  flex: 0 0 150px; /* 固定图片宽度 */
  margin-right: 20px;
}

.species-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.info-container {
  flex: 1; /* 自适应填充剩余空间 */
  font-size: 1rem;
  color: #333;
  padding-left: 10px;
}

/* 搜索板块样式 */
.search-card {
  padding: 20px;
}

.search-card .el-input {
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-card .el-button {
  border-radius: 8px;
  background-color: #42b983;
  border: none;
  color: white;
}

.search-card .el-button:hover {
  background-color: #38a070;
}

/* 图表卡片样式 */
.bar-chart-card {
  padding: 20px;
}

/* 图表的样式 */
.v-chart {
  width: 100%;
  height: 500px;
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
    flex-direction: column; /* 小屏幕上将图片和文本垂直排列 */
    align-items: flex-start;
  }

  .image-container {
    margin-bottom: 20px;
    flex: 0 0 auto; /* 取消图片的固定宽度，让它根据内容大小调整 */
  }

  .info-container {
    padding-left: 0;
  }
}

</style>
