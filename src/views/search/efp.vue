<template>
  <div class="main-container">
    <!-- 引入 EFP 组件 -->
    <EFP />

    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <div class="search-container">
        <h2 class="species-title">Brassica napus</h2>
        
        <div class="search-box">
          <div class="input-row">
            <el-input
              v-model="geneId"
              placeholder="Enter Gene ID"
              class="gene-input"
            />
            <el-button
              type="primary"
              @click="fetchData"
              class="submit-button"
            >
              Submit
            </el-button>
            <el-button
              link
              type="info"
              @click="fillExample"
              class="example-button"
            >
              Example
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 默认图片展示 -->
    <div v-if="showDefaultImage" class="image-container">
      <img
          src="@/assets/img/search/efp/efplook.jpg"
          alt="Default Image"
          class="default-image"
      />
    </div>

    <!-- 结果展示 -->
    <div v-else class="result-container">
      <el-card>
        <el-tabs v-model="activeTab" type="card">
          <!-- eFP Map Tab -->
          <el-tab-pane label="eFP Map" name="efp">
            <Efptool
                v-if="efpData.length > 0"
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
              <div v-if="tableData.length" class="table-container">
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
const showDefaultImage = ref(true); // 控制默认图片显示状态

// 分页计算
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return tableData.value.slice(start, start + pageSize);
});

// 获取数据
const fetchData = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/eFP_tpm/', {
      params: { gene_id: geneId.value },
    });
    tableData.value = response.data;
    efpData.value = response.data.map((item: any) => ({
      name: item.Sample,
      value: item.TPM,
    }));
    currentPage.value = 1;
    activeTab.value = 'efp'; // 默认 Tab 设置
    showDefaultImage.value = false; // 隐藏默认图片

    nextTick(renderChart); // 渲染图表
  } catch (error) {
    console.error('API请求失败', error);
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
  padding: 0;
}

.search-wrapper {
  background-color: #f8f9fa;
  padding: 15px 0;
  margin: 10px 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}

.search-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.species-title {
  text-align: center;
  font-style: italic;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.search-box {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 700px;
}

.gene-input {
  flex: 1;
  
  :deep(.el-input__inner) {
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
  }
}

.submit-button {
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
}

.example-button {
  height: 40px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .search-wrapper {
    padding: 10px 0;
  }

  .input-row {
    flex-direction: column;
    width: 100%;
  }

  .gene-input {
    width: 100%;
  }

  .submit-button,
  .example-button {
    width: 100%;
  }
}

.image-container {
  margin-top: 20px;
  text-align: center;
}

.default-image {
  max-width: 100%;
  height: auto;
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
