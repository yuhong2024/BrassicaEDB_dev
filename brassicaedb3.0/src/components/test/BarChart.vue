<template>
  <div ref="chart" style="height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted, watch, ref } from 'vue'

export default {
  props: ['data'],
  setup(props) {
    const chart = ref(null)

    onMounted(() => {
      const myChart = echarts.init(chart.value)
      const option = {
        xAxis: {
          type: 'category',
          data: props.data.labels
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: props.data.values,
            type: 'bar'
          }
        ]
      }
      myChart.setOption(option)
    })

    watch(() => props.data, (newData) => {
      const myChart = echarts.init(chart.value)
      myChart.setOption({
        xAxis: { data: newData.labels },
        series: [{ data: newData.values }]
      })
    })

    return {
      chart
    }
  }
}
</script>
