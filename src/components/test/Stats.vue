<template>
  <div class="stats-container">
    <el-row :gutter="20">
      <!-- 饼图 -->
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <p class="card-title">饼图</p>
          <div id="pie-chart" class="chart"></div>
        </el-card>
      </el-col>

      <!-- 横向柱状图 -->
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card shadow="hover" class="chart-card">
              <p class="card-title">横向柱状图 (1)</p>
              <div id="bar-chart-1" class="chart"></div>
            </el-card>
          </el-col>

          <el-col :span="24" style="margin-top: 20px;">
            <el-card shadow="hover" class="chart-card">
              <p class="card-title">横向柱状图 (2)</p>
              <div id="bar-chart-2" class="chart"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
  // 生成随机数据
  const pieData = [
    {name: 'Category A', value: Math.floor(Math.random() * 100)},
    {name: 'Category B', value: Math.floor(Math.random() * 100)},
    {name: 'Category C', value: Math.floor(Math.random() * 100)},
    {name: 'Category D', value: Math.floor(Math.random() * 100)}
  ];

  const barData1 = {
    categories: ['X1', 'X2', 'X3', 'X4'],
    values: [50, 20, 30, 10]
  };

  const barData2 = {
    categories: ['Y1', 'Y2', 'Y3', 'Y4'],
    values: [10, 40, 20, 30]
  };

  // 初始化饼图
  const pieChart = echarts.init(document.getElementById('pie-chart'));
  pieChart.setOption({
    tooltip: {trigger: 'item'},
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: pieData,
        emphasis: {
          itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}
        }
      }
    ]
  });

  // 初始化横向柱状图1
  const barChart1 = echarts.init(document.getElementById('bar-chart-1'));
  barChart1.setOption({
    tooltip: {trigger: 'axis'},
    xAxis: {type: 'category', data: barData1.categories},
    yAxis: {type: 'value'},
    series: [{type: 'bar', data: barData1.values}]
  });

  // 初始化横向柱状图2
  const barChart2 = echarts.init(document.getElementById('bar-chart-2'));
  barChart2.setOption({
    tooltip: {trigger: 'axis'},
    xAxis: {type: 'category', data: barData2.categories},
    yAxis: {type: 'value'},
    series: [{type: 'bar', data: barData2.values}]
  });
});
</script>

<style scoped>
.stats-container {
  margin: 20px;
}

.chart-card {
  height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
