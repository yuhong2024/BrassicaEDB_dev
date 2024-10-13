<template>
  <div class="facet-test-page">
    <!-- 绘制按钮 -->
    <el-button type="primary" @click="drawCharts" class="draw-btn">绘制分面图</el-button>

    <!-- 总体密集图表 -->
    <div v-if="chartsVisible" ref="facetPlotContainer" class="chart-container"></div>

    <!-- 为每个基因创建单独的图表容器 -->
    <el-card v-if="chartsVisible" v-for="(gene, index) in geneNames" :key="index" class="gene-card">
      <h3>{{ gene }} 分面柱状图</h3>
      <div :ref="el => chartRefs[index] = el" class="gene-chart"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

const chartRefs = ref([]);  // 每个基因图表的 refs
const facetPlotContainer = ref(null); // 总图表的 ref
const chartsVisible = ref(false);  // 控制图表显示
const geneNames = ref([]);  // 基因名称
const tissues = ref([]);  // 组织（横轴大分类）
const projects = ref([]);  // 项目名称（组织内部小分类）
const projectColors = ref({}); // 项目颜色

// 项目固定颜色，确保相同项目颜色一致
const predefinedColors = [
  '#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'
];

// 读取 Excel 数据
const readExcelData = async () => {
  const response = await fetch('/src/assets/datatest/expressiontest/test.treatment.tpm.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  return jsonData;
};

// 绘制图表函数
const drawCharts = async () => {
  const jsonData = await readExcelData();

  tissues.value = [...new Set(jsonData.slice(1).map(row => row[0]))]; // 获取组织名称
  geneNames.value = [...new Set(jsonData.slice(1).map(row => row[1]))]; // 获取基因 ID
  projects.value = [...new Set(jsonData.slice(1).map(row => row[3]))]; // 获取项目名称

  chartsVisible.value = true; // 显示图表

  // 生成项目颜色映射，确保相同项目颜色一致
  projects.value.forEach((project, index) => {
    projectColors.value[project] = predefinedColors[index % predefinedColors.length];
  });

  // 绘制总体图表
  const seriesData = geneNames.value.map(gene => ({
    name: gene,
    type: 'bar',
    data: tissues.value.map(tissue => {
      const row = jsonData.find(row => row[0] === tissue && row[1] === gene);
      return row ? row[2] : 0;
    }),
    label: { show: true, position: 'top' }
  }));

  const overallOption = {
    title: { text: '总体基因表达分面柱状图', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { data: geneNames.value, bottom: 20 },
    xAxis: {
      type: 'category',
      data: tissues.value,
      axisLabel: { rotate: 45, fontSize: 12, margin: 15 }, // 确保标签不重叠
      boundaryGap: true,
    },
    yAxis: { type: 'value', name: 'TPM' },
    dataZoom: [{ type: 'slider', xAxisIndex: 0, start: 0, end: 100 }],
    series: seriesData
  };

  // 初始化总体图表
  const facetChart = echarts.init(facetPlotContainer.value);
  facetChart.setOption(overallOption);

  // 绘制每个基因的独立图表
  geneNames.value.forEach((gene, index) => {
    const geneSeriesData = tissues.value.map(tissue => {
      return projects.value.map(project => {
        const row = jsonData.find(row => row[0] === tissue && row[1] === gene && row[3] === project);
        return row ? row[2] : 0;
      });
    });

    const series = projects.value.map((project, projectIndex) => ({
      name: project,
      type: 'bar',
      data: geneSeriesData.map(tissueData => tissueData[projectIndex]),
      stack: 'gene',
      label: { show: true, position: 'top' },
      itemStyle: { color: projectColors.value[project] }
    }));

    const geneOption = {
      title: { text: `${gene} 基因表达`, left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: tissues.value,
        axisLabel: { rotate: 45, fontSize: 12, margin: 15 }, // 确保文字完整显示
        boundaryGap: true,
      },
      yAxis: { type: 'value', name: 'TPM (表达量)' },
      series: series,
      dataZoom: [{ type: 'slider', xAxisIndex: 0, start: 0, end: 100 }]
    };

    const geneChart = echarts.init(chartRefs.value[index]);
    geneChart.setOption(geneOption);
  });
};
</script>

<style scoped>
.facet-test-page {
  padding: 20px;
  text-align: center;
}

.draw-btn {
  margin-bottom: 30px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chart-container {
  width: 100%;
  height: 600px;
  margin-bottom: 40px;
}

.gene-card {
  width: 100%;
  margin-bottom: 40px;
}

.gene-chart {
  width: 100%;
  height: 400px;
}
</style>
