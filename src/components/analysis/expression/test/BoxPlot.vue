<template>
  <div class="container">
    <div class="controls">
      <h2>基因表达箱线图</h2>
    </div>

    <!-- 绘制箱线图的容器 -->
    <div ref="boxPlotContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

const boxPlotContainer = ref(null);

// 读取 Excel 数据
const readExcelData = async () => {
  const response = await fetch('/src/assets/datatest/expressiontest/test.tissue.tpm.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  return jsonData;
};

// 准备 boxplot 数据
const prepareBoxplotData = (data) => {
  return data.map((group) => {
    group.sort((a, b) => a - b);
    const q1 = group[Math.floor(group.length * 0.25)];
    const median = group[Math.floor(group.length * 0.5)];
    const q3 = group[Math.floor(group.length * 0.75)];
    const min = group[0];
    const max = group[group.length - 1];
    return [min, q1, median, q3, max];
  });
};

// 绘制箱线图
const drawBoxPlot = async () => {
  const jsonData = await readExcelData();

  // 组织名称和基因 ID
  const tissues = ['Leaf', 'Flower_bud', 'Root', 'Seed', 'Bud', 'Hypocotyl', 'Stem', 'Petal', 'Ovule', 'Whole_Plant'];
  const geneNames = ['BnaA01G0000100ZS', 'BnaA01G0000200ZS', 'BnaA01G0000300ZS', 'BnaA01G0000400ZS', 'BnaA01G0000500ZS', 'BnaA01G0000600ZS'];

  // 为每个基因分配统一颜色
  const geneColors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'];

  // 组织和基因表达量数据处理
  const tissueData = tissues.map((tissue) => {
    return geneNames.map(gene => {
      return jsonData
          .filter(row => row[0] === tissue && row[1] === gene)
          .map(row => row[2] || 0);  // TPM 表达量
    });
  });

  // 将数据转换为箱线图格式
  const seriesData = geneNames.map((gene, geneIndex) => ({
    name: gene,
    type: 'boxplot',
    data: tissueData.map((data) => prepareBoxplotData([data[geneIndex]])[0]),  // 每个基因对应每个组织的 boxplot 数据
    boxWidth: '10%',  // 调整箱线图的宽度
    itemStyle: { color: geneColors[geneIndex] }
  }));

  // ECharts 配置项
  const option = {
    title: {
      text: '基因表达箱线图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `基因: ${params.seriesName}<br/>组织: ${tissues[params.dataIndex]}<br/>表达量: ${params.value}`;
      }
    },
    legend: {
      data: geneNames,
      bottom: 20,
      textStyle: { fontSize: 12 }
    },
    grid: {
      top: '10%',
      left: '5%',    // 进一步减少两边的空隙
      right: '5%',   // 确保足够的显示空间
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: tissues,  // 每个X轴显示的组织名
      axisLabel: {
        rotate: 0,    // 保持标签水平
        fontSize: 12,
        margin: 10
      }
    },
    yAxis: {
      type: 'value',
      name: '表达量 (TPM)',
      axisLabel: {
        fontSize: 12
      }
    },
    series: seriesData
  };

  // 初始化 ECharts 图表
  const boxPlotChart = echarts.init(boxPlotContainer.value);
  boxPlotChart.setOption(option);

  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener('resize', () => {
    boxPlotChart.resize();
  });
};

onMounted(drawBoxPlot);
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-container {
  width: 100%;
  height: 600px;
}

h2 {
  font-size: 18px;
  margin: 0;
}
</style>
