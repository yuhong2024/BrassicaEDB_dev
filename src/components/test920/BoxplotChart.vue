<template>
  <div>
    <apexchart type="boxPlot" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ['data'],
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'boxPlot'
        },
        xaxis: {
          categories: this.data.tissues
        }
      },
      series: this.formatSeries(this.data.expression)
    };
  },
  methods: {
    formatSeries(expressionData) {
      // Transform the data for boxplot series
      return expressionData.map(gene => ({
        name: gene.id,
        data: gene.values // Min, Q1, Median, Q3, Max
      }));
    }
  }
};
</script>
