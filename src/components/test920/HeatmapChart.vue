<!--<template>-->
<!--  <div>-->
<!--    <apexchart type="heatmap" :options="chartOptions" :series="series"></apexchart>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import VueApexCharts from 'vue-apexcharts';-->

<!--export default {-->
<!--  components: {-->
<!--    apexchart: VueApexCharts-->
<!--  },-->
<!--  props: ['data'],-->
<!--  data() {-->
<!--    return {-->
<!--      chartOptions: {-->
<!--        chart: {-->
<!--          type: 'heatmap'-->
<!--        },-->
<!--        xaxis: {-->
<!--          categories: this.data.samples // Samples on x-axis-->
<!--        },-->
<!--        colors: ['#008FFB']-->
<!--      },-->
<!--      series: this.formatSeries(this.data.expression)-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    formatSeries(expressionData) {-->
<!--      // Transform the data to ApexCharts' series format-->
<!--      return expressionData.map(gene => ({-->
<!--        name: gene.id,-->
<!--        data: gene.values-->
<!--      }));-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<template>
  <div>
    <apexchart type="heatmap" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ['data'],  // 从父组件传入数据
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'heatmap',
          toolbar: { show: true }
        },
        xaxis: {
          categories: this.data.samples,  // 样本名称
          labels: {
            rotate: -45  // 旋转标签以适应更多文本
          }
        },
        colors: ['#008FFB'],
        colorScale: {
          ranges: [{
            from: 0,
            to: 11,
            color: ['#00A100', '#128FD9', '#FFB200', '#FF0000'],  // 色标范围
            name: 'expression'
          }]
        }
      },
      series: this.formatSeries(this.data.expression)
    };
  },
  methods: {
    formatSeries(expressionData) {
      // 将表达数据转换为ApexCharts所需的格式
      return expressionData.map(gene => ({
        name: gene.id,
        data: gene.values
      }));
    }
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        // 当数据变化时，重新格式化series
        this.series = this.formatSeries(this.data.expression);
      }
    }
  }
};
</script>

<style scoped>
div {
  max-width: 800px;
  margin: auto;
}
</style>
