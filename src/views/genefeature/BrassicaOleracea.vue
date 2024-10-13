<template>
  <div class="container">
    <!-- 直接写在当前页面的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Brassica oleracea</h1>
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
          <img :src="speciesImage" alt="Brassica oleracea Image" class="species-image" />
        </div>
        <div class="info-container">
          <p>
            A common leafy green vegetable, also known as cabbage or cabbage heart. The leaves of kale
            are round and usually form a tight spherical head.
          </p>
          <p>
            It can be green, purple or red, depending on the variety. The taste of kale is fresh and
            slightly sweet, and the texture is crisp and tender.
          </p>
          <p>
            Kale is a nutritious source of vitamin C, vitamin K, fiber, and many minerals. Kale is relatively
            simple to grow, adaptable, and usually grows well in cooler seasons.
          </p>
        </div>
      </div>
    </el-card>

    <!-- SearchGene 板块 -->
    <el-card shadow="hover" class="search-card">
      <SearchGene species="C" @search-complete="handleSearchComplete" />
    </el-card>

    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="bar-chart-card">
      <v-chart :option="horizontalBarChartOptions" style="width: 100%; height: 500px;" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchGene from '@/components/SearchGene.vue';
import * as echarts from 'echarts';

// 导入图片
import speciesImage from '@/assets/img/home/genefeature/B5.svg';

// 面包屑导航配置
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Gene feature', path: '/genefeature' },
  { name: 'Brassica oleracea', path: '/genefeature/brassicaoleracea' }
];

// 横向柱状图配置
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_oleracea.D134",
    "Brassica_oleracea.HDEM",
    "Brassica_oleracea.JZS_V2",
    "Brassica_oleracea.Korso",
    "Brassica_oleracea.OX_heart",
    "Brassica_oleracea.TO1000"
  ];

  const values = [43853, 61279, 59064, 60640, 62232, 59225];

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
          return value;
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
            const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'];
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

onMounted(drawBarChart);
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.image-container {
  flex: 0 0 150px;
  margin-right: 20px;
}

.species-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.info-container {
  flex: 1;
  padding-left: 10px;
  font-size: 1rem;
  color: #333;
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
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-chart {
  width: 100%;
  height: 500px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .breadcrumb-left h1 {
    font-size: 1.2rem;
  }

  .introduction {
    flex-direction: column;
    align-items: flex-start;
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
