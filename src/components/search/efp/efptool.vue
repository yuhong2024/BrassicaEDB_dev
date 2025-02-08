<template>
  <div class="efp-container">
    <!-- 标题：基因ID -->
    <div class="title-container">
      <h2>{{ gene_id }}</h2>
    </div>

    <!-- eFP图表 -->
    <div ref="graphRef" class="graph-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';

interface DataItem {
  name: string;
  value: number;
}

const props = defineProps({
  data: { type: Array, required: true },
  svgPath: { type: String, required: true },
  gene_id: { type: String, default: 'BnaA01G0000100ZS' },
});

const graphRef = ref(null);
let chart: echarts.ECharts | null = null;
let svgContent = ref<string>('');

// 渲染eFP图表
const createChart = () => {
  if (!graphRef.value || !svgContent.value) return;

  if (chart) chart.dispose();
  chart = echarts.init(graphRef.value);
  echarts.registerMap(props.gene_id, { svg: svgContent.value });

  const minValue = Math.min(...props.data.map((item: DataItem) => item.value));
  const maxValue = Math.max(...props.data.map((item: DataItem) => item.value));

  const option = {
    toolbox: {
      feature: {
        saveAsImage: {
          name: props.gene_id,
          icon: 'path://M505.7 661.3a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.7H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.7zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z',
          iconStyle: {
            borderWidth: 2,
            borderColor: '#666',
            color: '#666'
          },
          emphasis: {
            iconStyle: {
              borderColor: '#333',
              color: '#333'
            }
          },
          pixelRatio: 2
        }
      },
      right: '5%',
      top: '5%',
      itemSize: 25
    },
    visualMap: {
      left: '10%',
      top: '10%',
      orient: 'horizontal',
      min: minValue,
      max: maxValue,
      text: ['', 'TPM'],
      textGap: 8,
      itemGap: 0,
      calculable: true,
      inRange: { color: ['#dbac00', '#db6e00', '#cf0000'] },
      textStyle: {
        align: 'center',
        verticalAlign: 'bottom'
      }
    },
    series: [
      {
        name: 'eFP Map',
        type: 'map',
        map: props.gene_id,
        roam: true,
        data: props.data,
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        select: {
          label: {
            show: false
          }
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => `
        Tissue: ${params.name}<br>
        TPM: ${params.value}
      `
    }
  };

  chart.setOption(option);
};

// 获取SVG内容并渲染eFP图
const fetchSvgContent = async () => {
  try {
    const response = await fetch(props.svgPath);
    svgContent.value = await response.text();
    createChart();
  } catch (error) {
    console.error('Error fetching SVG:', error);
  }
};

onMounted(fetchSvgContent);
watch(() => props.data, createChart);
</script>

<style scoped>
.efp-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.title-container h2 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.graph-container {
  width: 100%;
  height: calc(100vh - 150px);  
  min-height: 600px;            
  margin: 0;                   
  position: relative;           
}
</style>
