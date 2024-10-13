<template>
  <div>
    <!-- 图表容器 -->
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';  // 用于读取 Excel 文件

const chartContainer = ref(null);  // ECharts 容器

// 定义一个函数，用于读取 Excel 文件并解析数据
const readExcelData = async () => {
  const response = await fetch('/src/assets/datatest/expressiontest/test.period.tpm.xlsx');  // 替换为你的文件路径
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  // 解析第一个 sheet 页
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return jsonData;  // 返回解析后的 Excel 数据
};

// 绘制趋势图
const drawGeneTrend = async () => {
  const jsonData = await readExcelData();

  // 假设第一行是样本名，第一列是基因 ID，后面的数据是表达量
  const sampleNames = jsonData[0].slice(1);  // 第 1 行作为样本名
  const geneData = jsonData.slice(1);  // 从第 2 行开始是基因数据

  // 准备 ECharts 的 series 数据
  const series = geneData.map(row => ({
    name: row[0],  // 基因 ID
    type: 'line',
    data: row.slice(1),  // 表达量数据
    smooth: false,  // 使用折线图而不是平滑曲线
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { width: 2 }
  }));

  // ECharts 配置项
  const option = {
    title: { text: '基因表达趋势图' },
    tooltip: { trigger: 'axis' },
    legend: {
      data: geneData.map(row => row[0]),
      bottom: 0,  // 图例放置在图表的下方
      orient: 'horizontal',  // 水平排列图例
      type: 'scroll',  // 当图例项过多时，可以滚动
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '15%',  // 预留足够的空间放置图例
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: sampleNames,
      name: 'Sample Name',
      axisLabel: {
        rotate: 45,  // 样本名倾斜显示，避免重叠
        interval: 0  // 强制显示所有标签
      }
    },
    yAxis: {
      type: 'value',
      name: 'Expression Value (TPM)'
    },
    series: series
  };

  const chart = echarts.init(chartContainer.value);  // 初始化 ECharts 容器
  chart.setOption(option);  // 设置图表选项
};

onMounted(() => {
  drawGeneTrend();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
  margin-top: 20px;
}
</style>
