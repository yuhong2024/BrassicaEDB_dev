<template>
  <div id="app" class="container">
    <el-card class="chart-card" shadow="hover">
      <h1>基因表达趋势图</h1>
      <el-button type="primary" @click="loadAndDrawChart">绘制图表</el-button>

      <!-- 图表展示区 -->
      <div v-if="showChart" class="chart-container">
        <v-chart :option="chartOptions" style="width: 100%; height: 500px;"></v-chart>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { defineComponent } from 'vue';
import { use } from 'echarts/core';
import ECharts from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { ElButton, ElCard } from 'element-plus';

// 注册 ECharts 组件
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);

export default defineComponent({
  name: 'GeneExpressionChart',  // 组件名称
  components: {
    'v-chart': ECharts,
    ElButton,
    ElCard,
  },
  data() {
    return {
      showChart: false,  // 控制图表是否显示
      chartOptions: {},  // 图表配置
    };
  },
  methods: {
    async loadAndDrawChart() {
      try {
        // 读取 Excel 文件
        const response = await fetch('/test.period.tpm.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // 获取工作表数据
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 提取表头和数据
        const headers = jsonData[0];  // 第一行作为表头（样本名称）
        const data = jsonData.slice(1); // 其余行为基因数据

        // 设置图表数据
        this.chartOptions = this.generateChartOptions(headers, data);
        this.showChart = true;
      } catch (error) {
        console.error('文件加载失败', error);
      }
    },
    generateChartOptions(headers, data) {
      // 横坐标：样本名称，去除第一列的基因ID
      const sampleNames = headers.slice(1);

      // 生成 series 数据，包含每个基因的表达量（去除第一列的基因ID）
      const seriesData = data.map((row) => ({
        name: row[0], // 基因ID
        type: 'line', // 确保是标准的折线图而不是曲线图
        data: row.slice(1),  // 表达量
      }));

      return {
        title: {
          text: '基因表达趋势图',
          left: 'center',
          top: 10,
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: sampleNames,  // 样本名称作为X轴
          axisLabel: {
            rotate: 45,  // 旋转标签防止重叠
            margin: 10,
          },
        },
        yAxis: {
          type: 'value',
          name: '表达量 (TPM)',  // 纵轴名称
        },
        legend: {
          data: data.map(row => row[0]),  // 图例为基因ID
          bottom: 0,  // 将图例放置在图表底部
          left: 'center',
        },
        series: seriesData,
      };
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.chart-card {
  width: 90%;
  max-width: 1200px;
  padding: 20px;
  margin-top: 20px;
}

.chart-container {
  margin-top: 20px;
}
</style>
