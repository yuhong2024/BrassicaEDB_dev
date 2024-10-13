<template>
  <div>
    <div ref="heatmapContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

const heatmapContainer = ref(null);

// 读取 Excel 数据
const readExcelData = async () => {
  const response = await fetch('/src/assets/datatest/expressiontest/test.period_log.tpm.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  return jsonData;
};

// 绘制热图
const drawHeatmap = async () => {
  const jsonData = await readExcelData();

  const sampleNames = jsonData[0].slice(1); // 样本名
  const geneData = jsonData.slice(1); // 基因表达数据

  let heatmapData = [];
  geneData.forEach((row, rowIndex) => {
    row.slice(1).forEach((value, colIndex) => {
      heatmapData.push([colIndex, rowIndex, value || 0]); // 填充热图数据
    });
  });

  const option = {
    title: { text: '基因表达热图' },
    tooltip: {
      position: 'top',
      formatter: params => `样本: ${sampleNames[params.value[0]]}<br />基因: ${geneData[params.value[1]][0]}<br />表达量: ${params.value[2]}`,
    },
    grid: {
      top: '10%',
      left: '10%',   // 左侧留出更多空间
      right: '15%',  // 右侧留出空间给 visualMap
      bottom: '15%', // 增加底部空间以显示旋转的 X 轴标签
      containLabel: true  // 自动调整图表，确保标签不会被裁剪
    },
    xAxis: {
      type: 'category',
      data: sampleNames,
      splitArea: { show: true },
      axisLabel: {
        rotate: 45,   // 旋转45度以避免标签重叠
        interval: 0,  // 显示所有标签
        fontSize: 12, // 调整字体大小
      }
    },
    yAxis: {
      type: 'category',
      data: geneData.map(row => row[0]),
      splitArea: { show: true },
      axisLabel: {
        fontSize: 12, // 设置Y轴字体大小
        margin: 10    // 增加文字与轴线之间的间距
      }
    },
    visualMap: {
      min: 0,
      max: Math.max(...heatmapData.map(d => d[2])),  // 动态计算最大值
      calculable: true,
      orient: 'vertical',
      left: 'right',
      top: 'middle',
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    series: [{
      name: '表达量',
      type: 'heatmap',
      data: heatmapData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const heatmapChart = echarts.init(heatmapContainer.value);
  heatmapChart.setOption(option);

  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener('resize', () => {
    heatmapChart.resize();
  });
};

onMounted(drawHeatmap);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
