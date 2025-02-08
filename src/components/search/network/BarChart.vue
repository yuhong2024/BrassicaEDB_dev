<template>
  <div ref="barChart" class="bar-chart-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  chartLabels: {
    type: Array,
    required: true,
  },
});

const barChart = ref(null);
const myBarChart = ref(null);

const loadChartData = () => {
  myBarChart.value = echarts.init(barChart.value);
  const options = {
    xAxis: {
      type: 'category',
      data: props.chartLabels,
    },
    yAxis: {
      type: 'value',
      name: 'Gene Count',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series: [{
      data: props.chartData,
      type: 'bar',
      barWidth: '60%',
      itemStyle: {
        color: function (params) {
          const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'];
          return colors[params.dataIndex % colors.length];
        },
      },
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
  };

  myBarChart.value.setOption(options);
};

onMounted(() => {
  loadChartData();
});

onUnmounted(() => {
  if (myBarChart.value) {
    myBarChart.value.dispose();
  }
});
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 500px; /* Adjust height as needed */
}

</style>
