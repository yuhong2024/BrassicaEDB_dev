<template>
  <div>
    <!-- Combined Input Form -->
    <h3>Combined Input Form</h3>
    <el-form :model="combinedFormData" style="margin-top: 20px">
      <el-form-item label="Gene IDs">
        <el-input v-model="combinedFormData.gene_ids" placeholder="Click on the column header in the table to auto-fill Gene IDs"></el-input>
      </el-form-item>
      <el-form-item label="Species">
        <el-input v-model="combinedFormData.species" placeholder="Click on the BioProject in the table to auto-fill species"></el-input>
      </el-form-item>
      <el-form-item label="BioProject">
        <el-input v-model="combinedFormData.bioproject" placeholder="Click on the BioProject in the table to auto-fill"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
        <el-button @click="clearForm">Clear</el-button>
      </el-form-item>
    </el-form>

    <!-- Display error message if any -->
    <div v-if="errorMessage" style="margin-top: 20px; color: red;">
      <h4>Error:</h4>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'

// Props from parent component
const props = defineProps({
  combinedFormData: {
    type: Object,
    required: true
  }
});

const errorMessage = ref('')
const chartData = ref(null)

// Watch for changes in species and remove underscores
watch(() => props.combinedFormData.species, (newSpecies) => {
  if (newSpecies) {
    props.combinedFormData.species = newSpecies.replace(/_/g, ' ')
  }
})

// Handle form submission and display result in a new window
const handleSubmit = async () => {
  if (!props.combinedFormData.species || !props.combinedFormData.bioproject) {
    ElMessage.warning('Missing required parameters: species or bioproject')
    return
  }

  const formData = new FormData()
  const geneIdArray = props.combinedFormData.gene_ids.split(',').map(id => id.trim())
  geneIdArray.forEach(id => formData.append('gene_ids', id))
  formData.append('species', props.combinedFormData.species)
  formData.append('bioproject', props.combinedFormData.bioproject)

  try {
    const response = await axios.post('https://brassica.wangyuhong.cn/api/transcriptomdata/', formData)
    if (response.data.status === 'success') {
      chartData.value = response.data.data

      const resultWindow = window.open('', '_blank', 'width=1000,height=800,resizable=yes,scrollbars=yes,status=yes')
      if (resultWindow) {
        resultWindow.document.write(`
          <html>
            <head>
              <title>Result</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                .chart-container {
                  width: 100%;
                  height: 400px;
                  margin-bottom: 30px;
                }
              </style>
            </head>
            <body>
              <h2>API Result</h2>
              <div id="tableData"></div>
              <div id="trendChart" class="chart-container"></div>
              <div id="heatmapChart" class="chart-container"></div>
              <div id="boxplotChart" class="chart-container"></div>
              <div id="barplotChart" class="chart-container"></div>
            </body>
          </html>
        `)
        resultWindow.document.close()

        resultWindow.onload = () => {
          renderTableData(resultWindow)
          initializeCharts(resultWindow)
        }
      } else {
        ElMessage.error('Unable to open a new window, please check popup settings')
      }
    } else {
      ElMessage.error('Failed to load data')
    }
  } catch (error) {
    ElMessage.error(`Error fetching data: ${error.message}`)
  }
}

// Render table data in the new window
const renderTableData = (resultWindow) => {
  const tableDataContainer = resultWindow.document.getElementById('tableData')
  if (!tableDataContainer || !chartData.value) return

  const formattedCountsData = Object.keys(chartData.value.counts_data).map(gene_id => ({
    gene_id,
    ...chartData.value.counts_data[gene_id]
  }))

  let countsTableHtml = `
    <h3>Counts Data</h3>
    <table border="1" cellspacing="0" cellpadding="5" style="width: 100%;">
      <thead>
        <tr>
          <th>Gene ID</th>
  `
  const sampleKeys = Object.keys(formattedCountsData[0]).filter(key => key !== 'gene_id')
  sampleKeys.forEach(sample => {
    countsTableHtml += `<th>${sample}</th>`
  })
  countsTableHtml += `</tr></thead><tbody>`

  formattedCountsData.forEach(row => {
    countsTableHtml += `<tr><td>${row.gene_id}</td>`
    sampleKeys.forEach(sample => {
      countsTableHtml += `<td>${row[sample]}</td>`
    })
    countsTableHtml += `</tr>`
  })

  countsTableHtml += `</tbody></table>`
  tableDataContainer.innerHTML = countsTableHtml
}

// Initialize charts in the new window
const initializeCharts = (resultWindow) => {
  drawGeneTrend(resultWindow)
  drawHeatmap(resultWindow)
  drawBoxplot(resultWindow)
  drawBarplot(resultWindow)
}

// Draw gene trend chart
const drawGeneTrend = (resultWindow) => {
  if (!chartData.value.trendplot_data) return

  const sampleNames = Object.values(chartData.value.trendplot_data)[0].map(item => item.name)
  const series = Object.keys(chartData.value.trendplot_data).map(geneId => ({
    name: geneId,
    type: 'line',
    data: chartData.value.trendplot_data[geneId].map(item => item.tpm),
    smooth: false,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { width: 2 }
  }))

  const option = {
    title: { text: 'Gene Expression Trend Chart' },
    tooltip: { trigger: 'axis' },
    legend: { data: Object.keys(chartData.value.trendplot_data), bottom: 0, type: 'scroll' },
    grid: { top: '10%', left: '5%', right: '4%', bottom: '20%', containLabel: true },
    xAxis: { type: 'category', data: sampleNames, axisLabel: { rotate: 45, interval: 0 } },
    yAxis: { type: 'value', name: 'Expression Value (TPM)' },
    series
  }

  const chart = echarts.init(resultWindow.document.getElementById('trendChart'))
  chart.setOption(option)
}

// Draw heatmap chart
const drawHeatmap = (resultWindow) => {
  if (!chartData.value.heatmap_data) return

  const geneNames = Object.keys(chartData.value.heatmap_data)
  const sampleNames = chartData.value.heatmap_data[geneNames[0]].map(item => item.name)
  const heatmapArray = []
  geneNames.forEach((gene, rowIndex) => {
    chartData.value.heatmap_data[gene].forEach((sample, colIndex) => {
      heatmapArray.push([colIndex, rowIndex, sample.log_tpm || 0])
    })
  })

  const option = {
    title: { text: 'Gene Expression Heatmap' },
    xAxis: { type: 'category', data: sampleNames, axisLabel: { rotate: 45 } },
    yAxis: { type: 'category', data: geneNames },
    visualMap: { min: 0, max: 1, calculable: true, orient: 'vertical', left: 'right' },
    series: [{ type: 'heatmap', data: heatmapArray }]
  }

  const chart = echarts.init(resultWindow.document.getElementById('heatmapChart'))
  chart.setOption(option)
}

// Draw boxplot chart
const drawBoxplot = (resultWindow) => {
  if (!chartData.value.boxplot_data) return

  const geneIds = Object.keys(chartData.value.boxplot_data)
  const tissueNames = Array.from(new Set(chartData.value.boxplot_data[geneIds[0]].map(item => item.tissue)))

  const boxplotSeries = tissueNames.map(tissue => {
    const data = geneIds.map(geneId => {
      const tissueData = chartData.value.boxplot_data[geneId].filter(item => item.tissue === tissue).map(item => item.tpm)
      if (tissueData.length === 0) return null
      tissueData.sort((a, b) => a - b)
      return [
        Math.min(...tissueData),
        tissueData[Math.floor(tissueData.length / 4)],
        tissueData[Math.floor(tissueData.length / 2)],
        tissueData[Math.floor((tissueData.length * 3) / 4)],
        Math.max(...tissueData)
      ]
    })

    return {
      name: tissue,
      type: 'boxplot',
      data,
      tooltip: { formatter: param => `${tissue} <br/> Gene ID: ${geneIds[param.dataIndex]} <br/> TPM: ${param.data}` }
    }
  })

  const option = {
    title: { text: 'Gene Expression Boxplot' },
    tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
    legend: { data: tissueNames, bottom: 20 },
    grid: { top: '10%', left: '5%', right: '5%', bottom: '25%', containLabel: true },
    xAxis: { type: 'category', data: geneIds, name: 'Gene ID', axisLabel: { rotate: 45 } },
    yAxis: { type: 'value', name: 'TPM' },
    series: boxplotSeries
  }

  const chart = echarts.init(resultWindow.document.getElementById('boxplotChart'))
  chart.setOption(option)
}

// Draw barplot chart
const drawBarplot = (resultWindow) => {
  if (!chartData.value.barplot_data) return

  const geneIds = Object.keys(chartData.value.barplot_data)
  const classifySet = new Set()

  const series = []
  geneIds.forEach(geneId => {
    chartData.value.barplot_data[geneId].forEach(item => {
      if (!classifySet.has(item.classify)) {
        classifySet.add(item.classify)
        series.push({
          name: item.classify,
          type: 'bar',
          data: geneIds.map(id => {
            const match = chartData.value.barplot_data[id].find(dataItem => dataItem.classify === item.classify)
            return match ? match.tpm : 0
          }),
          label: { show: true, position: 'top' }
        })
      }
    })
  })

  const option = {
    title: { text: 'Gene Expression Barplot' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: Array.from(classifySet), bottom: 20 },
    xAxis: { type: 'category', data: geneIds, name: 'Gene ID', axisLabel: { rotate: 45 } },
    yAxis: { type: 'value', name: 'TPM' },
    series,
    grid: { top: '10%', left: '5%', right: '5%', bottom: '20%', containLabel: true }
  }

  const chart = echarts.init(resultWindow.document.getElementById('barplotChart'))
  chart.setOption(option)
}

// Clear form data
const clearForm = () => {
  props.combinedFormData.gene_ids = ''
  props.combinedFormData.species = ''
  props.combinedFormData.bioproject = ''
}
</script>

<style scoped>
h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
}
</style>
