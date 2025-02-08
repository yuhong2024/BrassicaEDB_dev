<template>
  <div class="container">
    <!-- 页面标题 -->
    <h1 class="page-title">Brassica Data Visualization</h1>

    <!-- 数据展示 -->
    <div class="data-section">
      <!-- 图表展示 -->
      <div class="charts-container">
        <div id="as-genes-chart" class="chart"></div>
        <div id="wgna-hub-chart" class="chart"></div>
        <div id="genome-pie-chart" class="chart"></div>
      </div>

      <!-- 表格展示 -->
      <el-table :data="tableData" border class="data-table">
        <el-table-column prop="name" label="Category" width="200" />
        <el-table-column prop="value" label="Value" />
      </el-table>

    </div>

    <!-- 新增的图片展示区域 -->
    <div class="images-section">
      <div class="image-container" v-for="(img, index) in images" :key="index">
        <img :src="img" :alt="`Summary ${index + 1}`" class="summary-image" />
      </div>
    </div>

    <imgs />



  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import B1 from "@/assets/img/summary/B1.png";
import B2 from "@/assets/img/summary/B2.png";
import B3 from "@/assets/img/summary/B3.png";
import B4 from "@/assets/img/summary/B4.png";
import B5 from "@/assets/img/summary/B5.png";
import B6 from "@/assets/img/summary/B6.png";
import imgs from "@/components/summary/img.vue";


// 数据相关变量
const apiUrl = "https://brassica.wangyuhong.cn/api/homeboard/";
const tableData = ref([]);
const rawData = ref({});

// 获取API数据
const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl);
    rawData.value = response.data;

    // 更新表格数据
    updateTableData();

    // 绘制图表
    drawASGenesChart();
    drawWGCNAHubChart();
    drawGenomePieChart();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 更新表格数据
const updateTableData = () => {
  tableData.value = [
    { name: "BioProjects", value: rawData.value.data_summary.BioProject },
    { name: "BioSamples", value: rawData.value.data_summary.BioSample },
    { name: "Bases", value: rawData.value.data_summary.Bases },
    { name: "Bytes", value: rawData.value.data_summary.Bytes },
    { name: "Genomes", value: rawData.value.data_summary.Genome },
    { name: "Tissues", value: rawData.value.data_summary.Tissue },
  ];
};

// 绘制 AS Genes 图表
const drawASGenesChart = () => {
  const chartDom = document.getElementById('as-genes-chart');
  const myChart = echarts.init(chartDom);
  const option = {
    title: { text: 'AS Genes', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: Object.keys(rawData.value.AS_genes),
      axisLabel: { rotate: 38 }, // 旋转横轴以防止重叠
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: Object.values(rawData.value.AS_genes),
        type: 'bar',
        itemStyle: { color: '#5470c6' },
        animationDelay: (idx) => idx * 100, // 添加动画延迟
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 50,
  };
  myChart.setOption(option);
};

// 绘制 WGCNA Hub Genes 图表
const drawWGCNAHubChart = () => {
  const chartDom = document.getElementById('wgna-hub-chart');
  const myChart = echarts.init(chartDom);
  const option = {
    title: { text: 'WGCNA Hub Genes', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: Object.keys(rawData.value.WGCNA_hub_genes),
      axisLabel: { rotate: 38 },
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: Object.values(rawData.value.WGCNA_hub_genes),
        type: 'bar',
        itemStyle: { color: '#91cc75' },
        animationDelay: (idx) => idx * 100,
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 50,
  };
  myChart.setOption(option);
};

// 绘制 Genome Pie 图表
const drawGenomePieChart = () => {
  const chartDom = document.getElementById('genome-pie-chart');
  const myChart = echarts.init(chartDom);
  const option = {
    title: { text: 'Genome Pie', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Genomes',
        type: 'pie',
        radius: '70%',
        data: Object.entries(rawData.value.genome_pie).map(([name, value]) => ({
          name,
          value,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};

// 图片数组
const images = [B1, B2, B3, B4, B5, B6];

onMounted(fetchData);
</script>


<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
  font-weight: bold;
}

.data-section {
  margin-top: 20px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
}

.chart {
  width: 30%; /* 使用百分比分配空间 */
  min-width: 300px;
  height: 300px;
  margin: 0 auto;
}

.data-table {
  margin-top: 20px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

/* 图片展示区域样式 */
.images-section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
  padding: 2px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.summary-image {
  width: 90%;
  max-width: 1200px;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .image-container {
    padding: 2px;
  }

  .summary-image {
    width: 95%;
  }

  .images-section {
    gap: 20px;
  }
}

/* 优化背景配色 */
.container {
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
}

/* 优化输入框样式 */
:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-input__inner) {
  border-radius: 8px;
}
</style>
