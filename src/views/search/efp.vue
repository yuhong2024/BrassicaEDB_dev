<template>
  <div class="main-container">
    <!-- 引入 EFP 组件 -->
    <EFP />

    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <div class="search-container">
        <div class="form-group">
          <label class="form-label">Species</label>
          <el-select
              v-model="species"
              placeholder="Select Species"
              class="species-select"
              disabled
          >
            <el-option label="Brassica napus" value="Brassica napus" />
          </el-select>
        </div>

        <div class="form-group">
          <label class="form-label">Gene ID</label>
          <div class="input-group">
            <el-input
                v-model="geneId"
                placeholder="Enter Gene ID"
                class="gene-input"
            />
            <el-button
                type="primary"
                @click="fetchData"
                :loading="loading"
                class="submit-button"
            >
              Search
            </el-button>
            <el-button
                type="default"
                @click="fillExample"
                class="example-button"
            >
              Fill Example
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 结果展示 -->
    <div v-if="tableData.length > 0" class="result-container">
      <el-card>
        <el-tabs v-model="activeTab" type="card">
          <!-- eFP Map Tab -->
          <el-tab-pane label="eFP Map" name="efp">
            <Efptool
                :data="efpData"
                :svgPath="testEfpSvg"
                :width="'100%'"
                :height="'600px'"
                :gene_id="geneId"
                title="eFP Map"
            />
          </el-tab-pane>

          <!-- Chart Tab -->
          <el-tab-pane label="Chart" name="chart">
            <div class="chart-tab-container">
              <!-- 表格部分 -->
              <div class="table-container">
                <el-table
                    :data="paginatedData"
                    style="width: 100%"
                    :max-height="400"
                    border
                >
                  <el-table-column
                      label="Sample"
                      prop="Sample"
                      min-width="200"
                  ></el-table-column>
                  <el-table-column
                      label="TPM"
                      prop="TPM"
                      width="120"
                  ></el-table-column>
                </el-table>

                <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="tableData.length"
                    @current-change="handlePageChange"
                    layout="prev, pager, next"
                    class="pagination"
                ></el-pagination>
              </div>

              <!-- 图表容器 -->
              <div
                  v-if="tableData.length"
                  ref="chartRef"
                  class="chart-container"
                  style="min-height: 500px; width: 100%;"
              ></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onUnmounted, watch } from 'vue';
import axios from 'axios';
import Efptool from '@/components/search/efp/efptool.vue';
import EFP from '@/components/search/Title/EFP.vue';
import testEfpSvg from '@/assets/img/search/efp/testefp.svg';
import * as echarts from 'echarts';

// 基因 ID 和数据
const geneId = ref('BnaA01G0000100ZS'); // 默认基因 ID
const tableData = ref<any[]>([]);
const efpData = ref<any[]>([]);
const currentPage = ref(1);
const pageSize = 10;
const chartRef = ref(null);
const activeTab = ref('efp'); // 默认 Tab
const loading = ref(false);
const species = ref('Brassica napus');

// 分页计算
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return tableData.value.slice(start, start + pageSize);
});

// 获取数据
const fetchData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://brassica.wangyuhong.cn/api/eFP_tpm/', {
      params: { gene_id: geneId.value },
    });
    tableData.value = response.data;
    efpData.value = response.data.map((item: any) => ({
      name: item.Sample,
      value: item.TPM,
    }));
    currentPage.value = 1;
    activeTab.value = 'efp';

    nextTick(renderChart);
  } catch (error) {
    console.error('API请求失败', error);
  } finally {
    loading.value = false;
  }
};

// 示例填充
const fillExample = () => {
  geneId.value = 'BnaA01G0000100ZS'; // 示例基因
};

// 分页切换
const handlePageChange = (page: number) => {
  currentPage.value = page;
  renderChart();
};

// 修改图表渲染函数
const renderChart = () => {
  if (!chartRef.value || tableData.value.length === 0) return;

  // 等待 DOM 更新完成后再初始化图表
  nextTick(() => {
    const chartDom = chartRef.value;
    // 如果已存在实例，先销毁
    const existingChart = echarts.getInstanceByDom(chartDom);
    if (existingChart) {
      existingChart.dispose();
    }

    const chart = echarts.init(chartDom);
    const chartData = paginatedData.value.map(item => ({ name: item.Sample, value: item.TPM }));

    chart.setOption({
      grid: {
        top: 60,
        bottom: 90,
        left: 100,
        right: 40,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name),
        axisLabel: {
          rotate: 45,
          interval: 0,
          fontSize: 12,
          overflow: 'break',
          width: 120
        }
      },
      yAxis: {
        type: 'value',
        name: 'TPM',
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      series: [
        {
          name: 'TPM',
          type: 'bar',
          data: chartData.map(item => item.value),
          itemStyle: { color: '#dbac00' },
          barWidth: '60%'
        }
      ]
    });

    // 监听窗口大小变化
    const resizeHandler = () => {
      chart.resize();
    };
    window.addEventListener('resize', resizeHandler);

    // 组件卸载时清理事件监听
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler);
      chart.dispose();
    });
  });
};

// 添加 tab 切换监听
watch(activeTab, (newTab) => {
  if (newTab === 'chart' && tableData.value.length > 0) {
    nextTick(() => {
      renderChart();
    });
  }
});
</script>

<style scoped>
.main-container {
  width: 100%;
  margin-top: 30px;

}

.search-wrapper {
  background-color: #fff;
  padding: 40px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px;
}

.form-group {
  margin-bottom: 30px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
}

.species-select {
  width: 100%;
}

.input-group {
  display: flex;
  gap: 10px;
  align-items: center;
  min-height: 45px;
}

.gene-input {
  flex: 1;
}

:deep(.el-input__inner) {
  height: 45px;
  line-height: 45px;
}

.submit-button,
.example-button {
  height: 45px;
  padding: 0 20px;
  font-size: 15px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }

  .gene-input,
  .submit-button,
  .example-button {
    width: 100%;
  }
}

.result-container {
  margin: 0;
  padding: 20px;
}

.table-container {
  width: 100%;
  margin-bottom: 30px;
}

.chart-tab-container {
  width: 100%;
  min-height: 800px; /* 确保容器有足够的高度 */
  position: relative;
}

.chart-container {
  width: 100%;
  height: 500px;
  margin-top: 20px;
  position: relative;
}

:deep(.el-card) {
  margin: 0;
  border-radius: 0;
}

:deep(.el-table) {
  margin-bottom: 20px;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #333;
  font-weight: bold;
  padding: 12px 0;
}

:deep(.el-table td) {
  padding: 8px 0;
}

.pagination {
  margin: 20px 0;
  text-align: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .result-container {
    margin: 10px;
  }

  .chart-container {
    height: 400px;
  }
}
</style>
