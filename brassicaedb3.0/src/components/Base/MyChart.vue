<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';

export default {
  name: 'MyChart',
  setup() {
    const chart = ref(null);

    const initChart = () => {
      const myChart = echarts.init(chart.value);
      const option = {
        title: {
          text: 'ECharts 示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };
      myChart.setOption(option);
      window.addEventListener('resize', myChart.resize);
    };

    onMounted(initChart);

    return {
      chart
    };
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
