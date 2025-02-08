<template>
  <div class="charts-container">
    <!-- 序列展示区域 -->
    <div class="sequences-section">
      <h3 class="section-title">FA Sequences</h3>
      <div class="sequences-wrapper">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(sequence, key) in sequences"
            :key="key"
            :name="key"
          >
            <template #title>
              <span class="sequence-title">{{ key }}</span>
            </template>
            <div class="sequence-content">
              <div class="sequence-text">{{ sequence }}</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <!-- Tissue 类型图表 -->
    <div class="chart-wrapper">
      <h2 class="chart-title">{{ geneId }} - Tissue</h2>
      <div ref="tissueChartRef" class="chart" style="width: 1400px; height: 800px;"></div>
    </div>
    
    <!-- Treat 类型图表 -->
    <div class="chart-wrapper">
      <h2 class="chart-title">{{ geneId }} - Treat</h2>
      <div ref="treatChartRef" class="chart" style="width: 1400px; height: 800px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const props = defineProps({
  geneId: String,
  activeTab: String
});

const tissueChartRef = ref(null);
const treatChartRef = ref(null);
const sequences = ref(null);
const activeNames = ref([]);

let tissueChart = null;
let treatChart = null;

// 定义统一的颜色方案和顺序
const transcriptOrder = ['TU4591', 'TU4589', 'BnaA01T0004200ZS', 'TU4590'];
const colorScheme = {
  'TU4591': '#5470c6',  // 蓝色
  'TU4589': '#91cc75',  // 绿色
  'BnaA01T0004200ZS': '#fac858',  // 黄色
  'TU4590': '#ee6666'   // 红色
};

// 处理序列数据
const formatSequences = (data) => {
  if (!data?.sequence_data) return null;
  // 获取所有序列的键名并设置为默认展开
  const sequenceData = data.sequence_data;
  activeNames.value = Object.keys(sequenceData);
  return sequenceData;
};

// 处理图表数据
const processData = (data) => {
  if (!data?.as_exp_data) return { tissue: { traits: [], series: [] }, treat: { traits: [], series: [] } };
  
  const expData = data.as_exp_data;
  
  // 分离 Tissue 和 Treat 数据
  const tissueData = expData.filter(item => item.classify === 'Tissue');
  const treatData = expData.filter(item => item.classify === 'Treat');
  
  const processTypeData = (typeData) => {
    if (!typeData.length) return { traits: [], series: [] };
    
    // 获取所有不同的 trait 和 transcript_id
    const traits = [...new Set(typeData.map(item => item.trait))].sort();
    const transcripts = [...new Set(typeData.map(item => item.transcript_id))];
    
    // 按照预定义顺序排序 transcripts
    const sortedTranscripts = transcriptOrder.filter(t => transcripts.includes(t));
    
    // 为每个 transcript_id 创建一个系列，保持顺序一致
    const series = sortedTranscripts.map(transcript => ({
      name: transcript,
      type: 'bar',
      data: traits.map(trait => {
        const item = typeData.find(d => d.trait === trait && d.transcript_id === transcript);
        return item ? Number(item.tpm) : 0;
      })
    }));

    return { traits, series };
  };

  return {
    tissue: processTypeData(tissueData),
    treat: processTypeData(treatData)
  };
};

const createChartOption = (data, title) => {
  // 确保所有系列使用相同的颜色和顺序
  const series = data.series.map(s => ({
    ...s,
    itemStyle: {
      color: colorScheme[s.name] || '#999'
    }
  }));

  return {
    title: {
      text: title,
      left: 'center',
      top: 20,
      textStyle: { 
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: series.map(s => s.name),
      top: 60,
      type: 'scroll',
      width: '90%',
      left: 'center',
      textStyle: {
        fontSize: 14
      },
      itemWidth: 25,
      itemHeight: 14,
      selectedMode: true,
      // 保持图例顺序一致
      formatter: function(name) {
        return name;
      },
      // 确保图例项的顺序
      sort: 'ascending'
    },
    grid: {
      left: 60,
      right: 40,
      bottom: 120,
      top: 150,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.traits,
      axisLabel: {
        interval: 0,
        rotate: 45,
        fontSize: 12,
        overflow: 'break'
      }
    },
    yAxis: {
      type: 'value',
      name: 'TPM',
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    series: series,  // 使用处理过颜色的系列
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      bottom: 20,
      height: 30
    }, {
      type: 'inside',
      xAxisIndex: [0]
    }]
  };
};

const initCharts = async () => {
  if (!props.geneId) return;
  
  try {
    const response = await axios.get(`https://brassicaedb.com/api/as/exp/`, {
      params: { gene_id: props.geneId }
    });
    
    // 处理序列数据
    sequences.value = formatSequences(response.data);
    
    // 处理图表数据
    const { tissue, treat } = processData(response.data);
    
    // 初始化图表
    if (tissueChart) tissueChart.dispose();
    if (treatChart) treatChart.dispose();
    
    if (tissueChartRef.value && tissue.series.length) {
      tissueChart = echarts.init(tissueChartRef.value);
      const tissueOption = createChartOption(tissue, `${props.geneId} - Tissue Expression`);
      tissueChart.setOption(tissueOption);
    }
    
    if (treatChartRef.value && treat.series.length) {
      treatChart = echarts.init(treatChartRef.value);
      const treatOption = createChartOption(treat, `${props.geneId} - Treatment Expression`);
      treatChart.setOption(treatOption);
    }

    setTimeout(handleResize, 200);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 优化 resize 处理
const handleResize = () => {
  if (tissueChart) {
    tissueChart.resize();
  }
  if (treatChart) {
    treatChart.resize();
  }
};

// 监听 geneId 变化
watch(() => props.geneId, (newVal) => {
  if (newVal) {
    // 重置图表
    if (tissueChart) {
      tissueChart.dispose();
      tissueChart = null;
    }
    if (treatChart) {
      treatChart.dispose();
      treatChart = null;
    }
    // 重新初始化
    initCharts();
  }
}, { immediate: true });

// 监听 tab 切换
watch(() => props.activeTab, (newVal) => {
  if (newVal === 'exp') {
    nextTick(() => {
      handleResize();
      // 如果图表未初始化，重新初始化
      if (!tissueChart || !treatChart) {
        initCharts();
      }
    });
  }
});

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  tissueChart?.dispose();
  treatChart?.dispose();
});
</script>

<style scoped>
.charts-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sequences-section {
  width: 100%;
  margin-bottom: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}

.sequences-wrapper {
  max-width: 100%;
  overflow-x: auto;
}

.section-title {
  margin: 0 0 20px;
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

.sequence-title {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
}

.sequence-content {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
  overflow-x: auto;
}

.sequence-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

:deep(.el-collapse-item__header) {
  font-size: 16px;
  padding: 16px;
  font-weight: 500;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}

.chart-wrapper {
  width: 100%;
  margin-bottom: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  min-width: 1440px; /* 容器宽度 + padding */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: #333;
}

.chart {
  min-width: 1400px;
}

@media screen and (max-width: 1600px) {
  .chart-wrapper {
    min-width: 1440px;
  }
}
</style>
