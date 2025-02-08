<template>
  <div class="container">
    <AS />
    <!-- 测试表单 -->
    <el-card class="api-test-card">
      <!-- 测试表单 -->
      <el-form :model="form" label-width="120px" class="test-form">
        <el-form-item label="Species">
          <el-select v-model="form.species" placeholder="Select Species" style="width: 100%">
            <el-option
              v-for="(gene, species) in exampleGenes"
              :key="species"
              :label="species"
              :value="species"
              @click="handleSpeciesSelect(species)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Gene ID">
          <el-input v-model="form.gene_id" placeholder="Enter Gene ID">
            <template #append>
              <el-button @click="fillExample">Fill Example</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="testAPI" :loading="loading">
            Test API
          </el-button>
        </el-form-item>
      </el-form>

      <!-- API响应结果 -->
      <div v-if="hasTestResults" class="api-results">
        <h4>API Test Results:</h4>
        <el-tabs v-model="activeTab">
          <!-- Expression结果 -->
          <el-tab-pane 
            name="exp"
            :disabled="!expResult"
          >
            <template #label>
              <span :style="{ color: expResult ? '#409EFF' : '#999' }">Expression Result</span>
            </template>
            <el-collapse>
              <el-collapse-item title="Expression API Response">
                <div class="api-info">
                  <div class="url">https://brassicaedb.com/api/as/exp/?gene_id={{ form.gene_id }}</div>
                </div>
                <pre class="response-data">{{ formatResponse(expResult) }}</pre>
              </el-collapse-item>
            </el-collapse>
            <!-- Expression图表展示 -->
            <ExpResultTab 
              :geneId="form.gene_id" 
              :activeTab="activeTab"
              v-if="expResult"
            />
          </el-tab-pane>

          <!-- AS类型的结果 -->
          <el-tab-pane 
            v-for="(endpoint, key) in endpoints" 
            :key="key"
            :name="key"
            :disabled="!hasData(results[key], key)"
          >
            <template #label>
              <span :style="{ color: hasData(results[key], key) ? '#409EFF' : '#999' }">
                {{ endpoint.title }}
              </span>
            </template>
            
            <!-- 添加注释说明在最上方 -->
            <div class="as-notation">
              <template v-if="key === 'a3ss' || key === 'a5ss'">
                <p class="notation-text">
                  chr strand longExonStart_0base longExonEnd shortES shortEE flankingES flankingEE
                </p>
              </template>
              
              <template v-if="key === 'mxe'">
                <p class="notation-text">
                  chr strand 1stExonStart_0base 1stExonEnd 2ndExonStart_0base 2ndExonEnd upstreamES upstreamEE downstreamES downstreamEE
                </p>
              </template>
              
              <template v-if="key === 'ri'">
                <p class="notation-text">
                  chr strand riExonStart_0base riExonEnd upstreamES upstreamEE downstreamES downstreamEE
                </p>
              </template>
              
              <template v-if="key === 'se'">
                <p class="notation-text">
                  chr strand exonStart_0base exonEnd upstreamES upstreamEE downstreamES downstreamEE
                </p>
              </template>
            </div>
            
            <!-- API响应数据折叠面板 -->
            <el-collapse>
              <el-collapse-item :title="`${endpoint.title} API Response`">
                <div class="api-info">
                  <div class="url">{{ endpoint.url }}?gene_id={{ form.gene_id }}&species={{ form.species }}</div>
                </div>
                <pre class="response-data">{{ formatResponse(results[key]) }}</pre>
              </el-collapse-item>
            </el-collapse>

            <!-- 数据表格 -->
            <div v-if="results[key]" class="result-content">
              <!-- A3SS, A5SS, RI 类型的表格 -->
              <el-table 
                v-if="['a3ss', 'a5ss', 'ri'].includes(key)"
                :data="getTableData(results[key])" 
                border 
                style="width: 100%; margin-top: 20px"
              >
                <el-table-column prop="gene_id" label="Gene ID" />
                <el-table-column prop="chromosome" label="Chromosome" />
                <el-table-column prop="strand" label="Strand" />
                <el-table-column prop="long_exon_start" label="Long Exon Start" />
                <el-table-column prop="long_exon_end" label="Long Exon End" />
                <el-table-column prop="short_exon_start" label="Short Exon Start" />
                <el-table-column prop="short_exon_end" label="Short Exon End" />
                <el-table-column prop="flanking_exon_start" label="Flanking Exon Start" />
                <el-table-column prop="flanking_exon_end" label="Flanking Exon End" />
              </el-table>

              <!-- MXE 类型的表格 -->
              <el-table 
                v-if="key === 'mxe'"
                :data="getTableData(results[key])" 
                border 
                style="width: 100%; margin-top: 20px"
              >
                <el-table-column prop="gene_id" label="Gene ID" />
                <el-table-column prop="chromosome" label="Chromosome" />
                <el-table-column prop="strand" label="Strand" />
                <el-table-column prop="first_exon_start" label="First Exon Start" />
                <el-table-column prop="first_exon_end" label="First Exon End" />
                <el-table-column prop="second_exon_start" label="Second Exon Start" />
                <el-table-column prop="second_exon_end" label="Second Exon End" />
                <el-table-column prop="upstream_es" label="Upstream ES" />
                <el-table-column prop="upstream_ee" label="Upstream EE" />
                <el-table-column prop="downstream_es" label="Downstream ES" />
                <el-table-column prop="downstream_ee" label="Downstream EE" />
              </el-table>

              <!-- SE 类型的表格 -->
              <el-table 
                v-if="key === 'se'"
                :data="getTableData(results[key])" 
                border 
                style="width: 100%; margin-top: 20px"
              >
                <el-table-column prop="gene_id" label="Gene ID" />
                <el-table-column prop="chromosome" label="Chromosome" />
                <el-table-column prop="strand" label="Strand" />
                <el-table-column prop="exon_start" label="Exon Start" />
                <el-table-column prop="exon_end" label="Exon End" />
                <el-table-column prop="upstream_es" label="Upstream ES" />
                <el-table-column prop="upstream_ee" label="Upstream EE" />
                <el-table-column prop="downstream_es" label="Downstream ES" />
                <el-table-column prop="downstream_ee" label="Downstream EE" />
              </el-table>

              <!-- 箱线图部分 -->
              <div class="charts">
                <div class="chart-wrapper" v-if="results[key].grouped?.Tissue?.length">
                  <h4>
                    Tissue PSI Distribution
                    <el-button
                      size="mini"
                      type="primary"
                      @click="downloadChart(`${key}TissueChart`)"
                      class="download-button"
                    >
                      Download
                    </el-button>
                  </h4>
                  <div :id="`${key}TissueChart`" class="chart-container"></div>
                </div>

                <div class="chart-wrapper" v-if="results[key].grouped?.Treatment?.length">
                  <h4>
                    Treatment PSI Distribution
                    <el-button
                      size="mini"
                      type="primary"
                      @click="downloadChart(`${key}TreatmentChart`)"
                      class="download-button"
                    >
                      Download
                    </el-button>
                  </h4>
                  <div :id="`${key}TreatmentChart`" class="chart-container"></div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import ExpResultTab from '@/components/search/as/exp.vue'
import * as echarts from 'echarts'
import AS from "@/components/search/Title/AS.vue";


// 示例基因数据
const exampleGenes = {
  'Brassica_juncea': 'BjuVB08G30170',
  'Brassica_carinata': 'Bca101B8G015920',
  'Brassica_rapa': 'BraA03g028350.4C',
  'Brassica_oleracea': 'BolC07g001570.2J',
  'Brassica_nigra': 'BniB03g030690.2N',
  'Brassica_napus': 'BnaA01G0004200ZS'
}

// 表单数据（预填充napus）
const form = ref({
  gene_id: 'BnaA01G0004200ZS',
  species: 'Brassica_napus'
})

// API endpoints
const endpoints = {
  a3ss: { title: "A3SS Result", url: "https://brassicaedb.com/api/as/a3ss/" },
  mxe: { title: "MXE Result", url: "https://brassicaedb.com/api/as/mxe/" },
  se: { title: "SE Result", url: "https://brassicaedb.com/api/as/se/" },
  a5ss: { title: "A5SS Result", url: "https://brassicaedb.com/api/as/a5ss/" },
  ri: { title: "RI Result", url: "https://brassicaedb.com/api/as/ri/" }
}

// 状态控制
const loading = ref(false)
const results = ref({})
const expResult = ref(null)
const activeTab = ref('exp')
const hasTestResults = computed(() => Object.keys(results.value).length > 0 || expResult.value)

// 处理物种选择
const handleSpeciesSelect = (species) => {
  form.value.gene_id = exampleGenes[species]
}

// 填充默认示例数据(napus)
const fillExample = () => {
  form.value.gene_id = 'BnaA01G0004200ZS'
  form.value.species = 'Brassica_napus'
}

// 格式化响应数据
const formatResponse = (data) => {
  return JSON.stringify(data, null, 2)
}

// 获取表格数据
const getTableData = (result) => {
  if (!result) return []
  
  // 根据不同的数据类型获取对应的数据
  if (result.A3SS_data) return result.A3SS_data
  if (result.MXE_data) return result.MXE_data
  if (result.SE_data) return result.SE_data
  if (result.A5SS_data) return result.A5SS_data
  if (result.RI_data) return result.RI_data
  
  return []
}

// 格式化图表数据
const formatChartData = (data) => {
  const categories = [...new Set(data.map(item => item.classify))].sort()
  
  const boxData = categories.map(category => {
    const values = data
      .filter(item => item.classify === category)
      .map(item => item.inclusion_level)
      .sort((a, b) => a - b)
    
    if (!values.length) return null
    
    return [
      Math.min(...values),
      values[Math.floor(values.length / 4)],
      values[Math.floor(values.length / 2)],
      values[Math.floor(values.length * 3 / 4)],
      Math.max(...values)
    ]
  })

  const scatterData = data.map(item => [
    item.inclusion_level,
    item.classify
  ])

  return { categories, boxData, scatterData }
}

// 创建图表配置
const createChartOption = (data, title) => {
  return {
    title: {
      text: title,
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '20%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.categories,
      name: 'Classify',
      nameLocation: 'middle',
      nameGap: 45,
      axisLabel: {
        interval: 0,
        rotate: 45,
        fontSize: 12,
        margin: 15,
        formatter: function(value) {
          const maxLength = 15;
          if (value.length > maxLength) {
            const lines = value.match(new RegExp(`.{1,${maxLength}}`, 'g')) || [];
            return lines.join('\n');
          }
          return value;
        }
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      name: 'PSI Level',
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 0, 0]
      },
      min: 0,
      max: 1,
      interval: 0.2
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        data: data.boxData,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#409EFF',
          color: 'transparent'
        },
        boxWidth: [10, 50],
        tooltip: {
          formatter: function(param) {
            return `${param.name}\n` +
                   `Maximum: ${param.data[5]}\n` +
                   `Upper Quartile: ${param.data[4]}\n` +
                   `Median: ${param.data[3]}\n` +
                   `Lower Quartile: ${param.data[2]}\n` +
                   `Minimum: ${param.data[1]}`
          }
        }
      },
      {
        name: 'scatter',
        type: 'scatter',
        data: data.scatterData,
        itemStyle: {
          color: '#409EFF',
          opacity: 0.3
        },
        symbolSize: 3
      }
    ],
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      height: 20,
      bottom: 0,
      borderColor: 'transparent',
      backgroundColor: '#f5f5f5',
      fillerColor: 'rgba(64, 158, 255, 0.2)',
      handleStyle: {
        color: '#409EFF'
      }
    }]
  }
}

// 渲染图表
const renderCharts = (key, result) => {
  if (result.grouped?.Tissue?.length) {
    const tissueChart = echarts.init(document.getElementById(`${key}TissueChart`))
    const tissueData = formatChartData(result.grouped.Tissue)
    tissueChart.setOption(createChartOption(tissueData, 'Tissue PSI Distribution'))
    
    window.addEventListener('resize', () => {
      tissueChart.resize()
    })
  }

  if (result.grouped?.Treatment?.length) {
    const treatmentChart = echarts.init(document.getElementById(`${key}TreatmentChart`))
    const treatmentData = formatChartData(result.grouped.Treatment)
    treatmentChart.setOption(createChartOption(treatmentData, 'Treatment PSI Distribution'))
    
    window.addEventListener('resize', () => {
      treatmentChart.resize()
    })
  }
}

// 下载图表
const downloadChart = (chartId) => {
  const chart = echarts.getInstanceByDom(document.getElementById(chartId))
  const url = chart.getDataURL()
  const link = document.createElement('a')
  link.download = `${chartId}.png`
  link.href = url
  link.click()
}

// 添加判断数据是否为空的函数
const hasData = (result, type) => {
  if (!result) return false
  
  // 检查对应类型的数据是否存在且不为空
  const dataKey = `${type.toUpperCase()}_data`
  return result[dataKey]?.length > 0
}

// 测试API
const testAPI = async () => {
  if (!form.value.gene_id || !form.value.species) {
    ElMessage.warning('请填写所有必需参数')
    return
  }

  loading.value = true
  results.value = {}
  expResult.value = null

  try {
    const params = {
      gene_id: form.value.gene_id,
      species: form.value.species
    }

    // AS类型的API请求
    const asRequests = Object.entries(endpoints).map(([key, endpoint]) => 
      axios.get(endpoint.url, { params })
        .then(response => [key, response.data])
        .catch(error => [key, { error: error.message }])
    )

    // Expression API请求
    const expRequest = axios.get('https://brassicaedb.com/api/as/exp/', {
      params: { gene_id: form.value.gene_id }
    })

    // 并行执行所有请求
    const [asResponses, expResponse] = await Promise.all([
      Promise.all(asRequests),
      expRequest
    ])

    // 处理AS响应
    asResponses.forEach(([key, data]) => {
      results.value[key] = data
      // 等待DOM更新后渲染图表
      setTimeout(() => renderCharts(key, data), 100)
    })

    // 处理Expression响应
    expResult.value = expResponse.data

    ElMessage.success('API测试完成')
  } catch (error) {
    console.error('API请求错误:', error)
    ElMessage.error('API请求失败，请查看控制台了解详情')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.test-form {
  max-width: 600px;
  margin: 0 auto;
}

.api-results {
  margin-top: 20px;
}

.api-info {
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.url {
  font-family: monospace;
  color: #666;
  word-break: break-all;
}

.response-data {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: Monaco, monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

:deep(.el-collapse-item__header) {
  font-size: 16px;
  font-weight: bold;
}

:deep(.el-collapse-item__content) {
  padding: 15px;
}

/* 添加新的样式 */
.el-tabs {
  margin-top: 20px;
}

:deep(.el-tabs__content) {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  min-height: 600px;
}

.chart-wrapper {
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
}

.chart-container {
  width: 1200px !important;
  height: 400px !important;
  margin: 0 auto;
}

.download-button {
  float: right;
  margin-left: 10px;
}

.result-content {
  margin-top: 20px;
}

.charts {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.el-tabs__item) {
  transition: color 0.3s;
}

.as-notation {
  margin: 10px 0;
  padding: 12px 15px;
  background-color: #f0f9ff;
  border-left: 4px solid #409EFF;
  border-radius: 4px;
  width: 100%;
}

.notation-text {
  font-family: Monaco, monospace;
  font-size: 14px;
  color: #333;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5;
}
</style>