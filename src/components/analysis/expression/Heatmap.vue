<template>
  <el-card class="chart-card" shadow="hover">
    <h1>基因表达热图</h1>
    <el-button type="primary" @click="loadAndDrawHeatmap">绘制热图</el-button>

    <!-- 热图展示区 -->
    <div v-if="showHeatmap" class="chart-container">
      <v-chart :option="heatmapOptions" style="width: 100%; height: 500px;"></v-chart>
    </div>
  </el-card>
</template>

<script>
import * as XLSX from 'xlsx';
import { defineComponent } from 'vue';
import { use } from 'echarts/core';
import ECharts from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { HeatmapChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { ElButton, ElCard } from 'element-plus';

// 注册 ECharts 组件
use([CanvasRenderer, HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent]);

export default defineComponent({
  components: {
    'v-chart': ECharts,
    ElButton,
    ElCard,
  },
  data() {
    return {
      showHeatmap: false,  // 控制热图是否显示
      heatmapOptions: {},  // 热图配置
    };
  },
  methods: {
    async loadAndDrawHeatmap() {
      try {
        // 读取 Excel 文件
        const response = await fetch('/test1periodlogtpm.xls');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // 获取工作表数据
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 提取表头和数据
        const headers = jsonData[0];  // 第一行作为表头（样本名称）
        const data = jsonData.slice(1); // 其余行为基因数据

        // 生成热图数据
        this.heatmapOptions = this.generateHeatmapOptions(headers, data);
        this.showHeatmap = true;
      } catch (error) {
        console.error('文件加载失败', error);
      }
    },
    generateHeatmapOptions(headers, data) {
      const sampleNames = headers.slice(1); // 横轴：样本名称
      const geneNames = data.map(row => row[0]); // 纵轴：基因ID

      // 生成热图所需的坐标数据
      const heatmapData = [];
      data.forEach((row, rowIndex) => {
        row.slice(1).forEach((value, colIndex) => {
          heatmapData.push([colIndex, rowIndex, value || 0]); // [x坐标, y坐标, 值]
        });
      });

      return {
        tooltip: {
          position: 'top',
          trigger: 'item',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: sampleNames,
          axisLabel: {
            rotate: 45,
            margin: 8,
          },
        },
        yAxis: {
          type: 'category',
          data: geneNames,
        },
        visualMap: {
          min: 0,
          max: Math.max(...heatmapData.map(item => item[2])),
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
          },
        },
        series: [
          {
            name: '基因表达热图',
            type: 'heatmap',
            data: heatmapData,
            label: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    },
  },
});
</script>

<style scoped>
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
