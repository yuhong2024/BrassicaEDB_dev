<template>
  <div>
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
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
          type: 'line'
        },
        xaxis: {
          categories: this.data.samples // Time points or samples
        }
      },
      series: this.formatSeries(this.data.expression)
    };
  },
  methods: {
    formatSeries(expressionData) {
      // Transform to series format for trend line
      return expressionData.map(gene => ({
        name: gene.id,
        data: gene.values
      }));
    }
  }
};
</script>
