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
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '数据',
            type: 'pie',
            radius: '50%',
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    })

    watch(() => props.data, (newData) => {
      const myChart = echarts.init(chart.value)
      myChart.setOption({series: [{data: newData}]})
    })

    return {
      chart
    }
  }
}
</script>
