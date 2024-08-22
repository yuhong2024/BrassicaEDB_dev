<template>
  <el-card class="box-card">
    <h3>{{ title }}</h3>
    <div ref="chart" :style="{ width: '100%', height: '400px' }"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';

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

onMounted(() => {
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(props.chartOptions);
});

watch(() => props.chartOptions, (newOptions) => {
  if (chartInstance) {
    chartInstance.setOption(newOptions);
  }
});
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
  padding: 20px;
}
</style>
