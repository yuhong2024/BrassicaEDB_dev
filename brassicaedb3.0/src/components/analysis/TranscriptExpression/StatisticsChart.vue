<template>
  <el-card class="statistics-card" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 左边条形图 -->
        <div class="bar-chart"></div>
      </el-col>
      <el-col :span="12">
        <!-- 右边横向柱状图 -->
        <div class="horizontal-bar-chart"></div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts';

onMounted(() => {
  const barChart = echarts.init(document.querySelector('.bar-chart'));
  const horizontalBarChart = echarts.init(document.querySelector('.horizontal-bar-chart'));

  // 示例图表选项
  const barOptions = { /* 配置项 */ };
  const horizontalBarOptions = { /* 配置项 */ };

  barChart.setOption(barOptions);
  horizontalBarChart.setOption(horizontalBarOptions);
});
</script>

<style scoped>
.statistics-card {
  margin-bottom: 20px;
  padding: 20px;
}

.bar-chart, .horizontal-bar-chart {
  width: 100%;
  height: 300px;
}
</style>
