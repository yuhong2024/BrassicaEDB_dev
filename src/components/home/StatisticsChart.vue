<template>
  <el-card class="box-card">
    <h3>{{ title }}</h3>
    <div ref="chart" class="chart-container"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  chartOptions: {
    type: Object,
    required: true
  }
});

const chart = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(props.chartOptions);
};

// 监听窗口变化，调整图表大小
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart); // 监听窗口大小变化
});

// 清理事件监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
});

watch(() => props.chartOptions, (newOptions) => {
  if (chartInstance) {
    chartInstance.setOption(newOptions);
  }
});
</script>

<style scoped>
.box-card {
  margin: 20px auto; /* 居中显示并添加间距 */
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

.chart-container {
  width: 100%;
  height: 450px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .box-card {
    padding: 15px;
  }
  .chart-container {
    height: 400px; /* 调整图表高度 */
  }
}

@media (max-width: 768px) {
  .box-card {
    padding: 10px;
  }
  .chart-container {
    height: 350px; /* 在小屏幕时进一步调整高度 */
  }
}

@media (max-width: 480px) {
  .box-card {
    margin: 10px;
    padding: 8px;
  }
  .chart-container {
    height: 300px; /* 最小屏幕调整 */
  }
}
</style>
