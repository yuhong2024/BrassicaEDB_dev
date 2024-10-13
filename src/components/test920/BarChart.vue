<template>
  <div>
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
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
          type: 'bar'
        },
        xaxis: {
          categories: this.data.treatments
        }
      },
      series: this.formatSeries(this.data.expression)
    };
  },
  methods: {
    formatSeries(expressionData) {
      // Transform the data for bar chart series
      return expressionData.map(gene => ({
        name: gene.id,
        data: gene.values
      }));
    }
  }
};
</script>
