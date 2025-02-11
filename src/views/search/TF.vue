<template>
  <div class="main-container">
    <TF />
    <div class="api-test-container">
      <div class="input-section">
        <el-form :model="form" label-width="120px" class="search-form">
          <el-form-item label="Gene ID">
            <el-input
                v-model="form.gene_id"
                placeholder="请输入基因ID"
                class="search-input">
            </el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button
                type="primary"
                @click="fetchData"
                :loading="loading"
                size="large"
            >
              {{ loading ? 'Searching...' : 'Search' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="loading" class="loading-container">
        <el-loading :visible="true" />
      </div>

      <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          :closable="false"
          class="error-alert"
      />

      <div v-if="result && !loading" class="result-section">
        <el-card v-if="result.GrnHomologous?.length" class="data-card">
          <template #header>
            <div class="card-header">
              <h2>Homologous Data</h2>
            </div>
          </template>
          <el-table
              :data="result.GrnHomologous"
              style="width: 100%"
              border
              :header-cell-style="{
                background: '#f5f7fa',
                color: '#2c3e50',
                fontSize: '16px',
                fontWeight: '600',
                height: '60px'
              }"
              :cell-style="{
                fontSize: '15px',
                height: '55px'
              }">
            <el-table-column
                v-for="column in tableColumns"
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                align="center">
            </el-table-column>
          </el-table>
        </el-card>

        <el-card v-if="result.GrnOrganismGrouped" class="data-card">
          <template #header>
            <div class="card-header">
              <h2>GRN Data by Species</h2>
            </div>
          </template>
          <el-tabs v-model="activeTab" @tab-click="renderActiveTabChart">
            <el-tab-pane
                v-for="(data, species) in result.GrnOrganismGrouped"
                :key="species"
                :label="formatSpeciesName(species)"
                :name="species">
              <el-card class="network-card">
                <div :id="`network-chart-${species}`" class="network-chart"></div>
                <p class="legend">
                  Legend:
                  <span class="legend-item tf">Red (TF and TF-type Target Genes)</span>,
                  <span class="legend-item non-tf">Blue (Non-TF Target Genes)</span>
                </p>
              </el-card>

              <el-table
                  :data="paginatedData"
                  stripe
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#f5f7fa',
                    color: '#2c3e50',
                    fontSize: '16px',
                    fontWeight: '600',
                    height: '60px'
                  }"
                  :cell-style="{
                    fontSize: '15px',
                    height: '55px'
                  }"
              >
                <el-table-column
                    prop="Coregene"
                    label="Coregene"
                    align="center">
                  <template #default="scope">
                    <span class="gene-text">{{ scope.row.Coregene }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="Targetgene"
                    label="Target Gene"
                    align="center">
                  <template #default="scope">
                    <span class="gene-text">{{ scope.row.Targetgene }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="Classification"
                    label="Classification"
                    align="center">
                  <template #default="scope">
                    <el-tag
                        :type="scope.row.Classification === 'TF_Hub' ? 'success' : 'info'"
                        size="large"
                        class="classification-tag">
                      {{ scope.row.Classification }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-container">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[15, 30, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="getCurrentSpeciesData.length"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import TF from '@/components/search/Title/TF.vue'

export default {
  name: 'TFSearch',
  components: {
    TF
  },
  data() {
    return {
      form: {
        gene_id: 'Bca101C2G037520'
      },
      result: null,
      activeTab: '',
      chartInstances: new Map(),
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 15,
    }
  },
  computed: {
    tableColumns() {
      if (!this.result?.GrnHomologous?.[0]) return []
      return Object.entries(this.result.GrnHomologous[0])
          .filter(([key]) => key !== 'id')
          .map(([key]) => ({
            prop: key,
            label: key.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
          }))
    },
    getCurrentSpeciesData() {
      if (!this.activeTab || !this.result?.GrnOrganismGrouped) return [];
      return this.result.GrnOrganismGrouped[this.activeTab] || [];
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.getCurrentSpeciesData.slice(start, end);
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://brassicaedb.com/api/grn/', {
          params: { gene_id: this.form.gene_id }
        });
        this.result = response.data;
        if (this.result?.GrnOrganismGrouped) {
          this.activeTab = Object.keys(this.result.GrnOrganismGrouped)[0];
          this.$nextTick(() => {
            this.renderActiveTabChart();
          });
        }
      } catch (error) {
        console.error('Request failed:', error);
        this.error = 'Request failed, please try again';
      } finally {
        this.loading = false;
      }
    },
    formatSpeciesName(species) {
      return species.replace('_', ' ')
    },
    renderActiveTabChart() {
      if (this.activeTab) {
        this.$nextTick(() => {
          this.generateNetworkChart(this.activeTab)
        })
      }
    },
    generateNetworkChart(species) {
      const chartDom = document.getElementById(`network-chart-${species}`);
      if (!chartDom) return;

      // 设置容器高度
      chartDom.style.height = '800px';  // 增加图表高度

      // 获取当前物种的数据
      const speciesData = this.result.GrnOrganismGrouped[species];
      if (!speciesData || !speciesData.length) return;

      // 清理已存在的实例
      if (this.chartInstances.has(species)) {
        this.chartInstances.get(species).dispose();
      }

      const chart = echarts.init(chartDom);
      this.chartInstances.set(species, chart);

      const nodes = new Set();
      const edges = [];

      speciesData.forEach(item => {
        nodes.add(item.Coregene);
        nodes.add(item.Targetgene);

        edges.push({
          source: item.Coregene,
          target: item.Targetgene,
          classification: item.Classification
        });
      });

      const option = {
        animation: false,
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.dataType === 'edge') {
              return `${params.data.source} -> ${params.data.target}<br/>Type: ${params.data.classification}`;
            }
            return params.name;
          }
        },
        series: [{
          type: 'graph',
          layout: 'force',
          data: [...nodes].map(node => ({
            name: node,
            value: node,
            category: edges.some(e => e.source === node) ? 0 :
                edges.some(e => e.target === node && e.classification === 'TF_Hub') ? 1 : 2,
            symbolSize: edges.some(e => e.source === node) ? 20 : 10,
            itemStyle: {
              color: edges.some(e => e.source === node) ? '#D5614A' :  // 中心节点为红色
                  edges.some(e => e.target === node && e.classification === 'TF_Hub') ? '#D5614A' :  // TF_Hub目标为红色
                      '#81B5CD'  // 普通目标为蓝色
            }
          })),
          categories: [
            { name: 'Coregene' },
            { name: 'TF_Hub Target' },
            { name: 'Normal Target' }
          ],
          edges: edges.map(edge => ({
            source: edge.source,
            target: edge.target,
            lineStyle: {
              color: edge.classification === 'TF_Hub' ? '#D5614A' : '#81B5CD',
              curveness: 0
            }
          })),
          force: {
            repulsion: 200,
            gravity: 0.1,
            edgeLength: 100,
            layoutAnimation: false
          },
          draggable: true,
          emphasis: {
            focus: 'adjacency'
          }
        }]
      };

      chart.setOption(option);

      // 处理窗口大小变化
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      // 组件销毁时清理
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', handleResize);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
    this.fetchData();
  },
  beforeUnmount() {
    this.chartInstances.forEach(chart => chart.dispose())
    this.chartInstances.clear()
  },
  watch: {
    'result.GrnOrganismGrouped': {
      handler(newVal) {
        if (newVal) {
          this.activeTab = Object.keys(newVal)[0]
          this.$nextTick(() => {
            this.renderActiveTabChart()
          })
        }
      },
      immediate: true
    },
    // 监听 activeTab 变化，自动刷新网络图
    activeTab: {
      handler(newTab) {
        if (newTab) {
          this.$nextTick(() => {
            this.generateNetworkChart(newTab);
          });
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

.main-container {
  width: 100%;
  margin-top: 30px;

}

.api-test-container {
  width: 100%;
  margin-top: 20px;
}

.input-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 60px 24px;
  margin: 10px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
}

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 500;
  line-height: 50px;
}

:deep(.el-input__inner) {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 15px;
}

.button-item {
  margin-left: 0;
  padding-left: 120px;
}

:deep(.el-button) {
  padding: 12px 30px;
  font-size: 16px;
}

.result-section {
  margin-top: 10px;
}

.result-section h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.result-section pre {
  margin-top: 30px;
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.data-card {
  margin: 10px 0;
  width: 100%;
}

.data-card h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

:deep(.el-table) {
  margin-bottom: 20px;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
}

:deep(.el-tabs__content) {
  padding: 20px 0;
}

.network-card {
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  box-sizing: border-box;
}

.network-chart {
  width: 100%;
  min-height: 300px;
  margin: 0 auto;
}

.legend {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.legend span {
  margin: 0 15px;
  padding: 4px 12px;
  border-radius: 2px;
}

/* 响应式调整 */
@media screen and (max-width: 1200px) {
  .description-box {
    flex-direction: column;
  }

  .gene-form {
    max-width: 100%;
  }
}

.input-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 24px; /* 增加上下内边距 */
  margin: 10px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
}

.search-form {
  display: flex;
  flex-direction: column; /* 改为纵向排列 */
  gap: 20px; /* 增加表单项之间的间距 */
}

.button-item {
  margin-left: 100px; /* 与输入框对齐 */
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.error-alert {
  margin: 20px 0;
}

.gene-text {
  font-family: 'Monaco', monospace;
  font-size: 14px;
  color: #2c3e50;
}

.classification-tag {
  font-size: 14px;
  padding: 8px 12px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.legend {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
}

.legend-item {
  margin: 0 10px;
}

.legend-item.tf {
  color: #D5614A;
}

.legend-item.non-tf {
  color: #81B5CD;
}

/* 分页器样式 */
:deep(.el-pagination) {
  font-size: 14px;
  font-weight: normal;
  padding: 2px 5px;
}

:deep(.el-pagination .el-pagination__total) {
  font-size: 14px;
}

:deep(.el-pagination .el-pagination__sizes) {
  margin-left: 15px;
}

:deep(.el-select .el-input) {
  width: 110px;
}

:deep(.el-pagination button) {
  min-width: 35px;
  height: 35px;
}

:deep(.el-pagination.is-background .el-pager li) {
  min-width: 35px;
  height: 35px;
  line-height: 35px;
}
</style>
