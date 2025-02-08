<template>
  <div class="tf-info-container">
    <!-- Breadcrumb Navigation -->
    <!-- 引入 TF.vue 组件 -->
    <TF />
    <!-- Gene ID Search Section -->
    <el-card class="search-card">
      <el-row gutter="30" align="middle">
        <!-- Species Selection -->
        <el-col :span="8" md="10">
          <el-select
              v-model="selectedSpecies"
              placeholder="Select Species"
              class="species-select"
              @change="updateExampleGene"
          >
            <el-option
                v-for="(species, index) in speciesOptions"
                :key="index"
                :label="species"
                :value="species"
            />
          </el-select>
        </el-col>

        <!-- Gene ID Input -->
        <el-col :span="8" md="10">
          <el-input
              v-model="geneId"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Enter Gene ID"
              class="gene-id-input"
          />
        </el-col>

        <!-- Buttons Section -->
        <el-col :span="8" md="4" class="right-controls">
          <div class="button-container">
            <el-button
                type="primary"
                class="submit-button"
                @click="handleSubmit"
            >
              Submit
            </el-button>
            <el-button
                type="text"
                class="example-button"
                @click="fillExampleGene"
            >
              Example
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- Carousel (显示条件：showCarousel 为 true) -->
    <Carousel v-if="showCarousel" />

    <!-- Results Section (显示条件：showCarousel 为 false) -->
    <div v-else>
      <!-- Homologous Data Section -->
      <el-card v-if="homologousData && homologousData.length" class="data-card">
        <h2>Homologous Data</h2>
        <el-table :data="homologousData" stripe>
          <el-table-column
              v-for="(value, key) in homologousData[0]"
              :key="key"
              :prop="key"
              :label="key.replace('_', ' ')"
              align="center"
          ></el-table-column>
        </el-table>
      </el-card>

      <!-- TRN Data by Species with Network Graph and Table -->
      <el-card v-if="classifiedTrnData && Object.keys(classifiedTrnData).length" class="result-card">
        <h2>TRN Data by Species</h2>

        <el-tabs v-model="activeTab" @tab-click="renderActiveTabChart" class="chart">
          <el-tab-pane v-for="(data, species) in paginatedData" :label="species" :name="species" :key="species">
            <!-- Network Graph Card -->
            <el-card class="netchart" style="margin-bottom: 10px;">
              <div :ref="`chartContainer-${species}`" :id="`network-chart-${species}`" class="network-chart"></div>
              <p class="legend">
                Legend:
                <span style="color: red;">Red (TF and TF-type Target Genes)</span>,
                <span style="color: blue;">Blue (Non-TF Target Genes)</span>
              </p>
            </el-card>

            <!-- Data Table Card -->
            <!-- Data Table Card -->
            <el-card class="trn-card" shadow="hover" style="margin-top: 10px; width: 100%;">
              <el-table :data="data" stripe style="width: 100%;">
                <!-- TF 列 -->
                <el-table-column prop="tf" label="TF" width="180" align="center"></el-table-column>

                <!-- Target Gene 列 -->
                <el-table-column prop="target" label="Target Gene" width="180" align="center"></el-table-column>

                <!-- Value 列 -->
                <el-table-column prop="weight" label="Value" align="center"></el-table-column>

                <!-- Type 列 -->
                <el-table-column prop="classify" label="Type" align="center">
                  <template #default="scope">
        <span :style="{ color: scope.row.classify === 'TF' ? 'red' : 'blue' }">
          {{ scope.row.classify }}
        </span>
                  </template>
                </el-table-column>
              </el-table>

              <!-- Pagination -->
              <el-pagination
                  v-model:current-page="pagination.currentPage"
                  :page-size="pagination.pageSize"
                  :total="classifiedTrnData[species].length"
                  @current-change="handlePageChange"
                  layout="prev, pager, next"
                  class="pagination"
              />
            </el-card>

          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- Error Message Display -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, watch, onUnmounted } from 'vue';
import axios from 'axios';
import Carousel from '@/components/search/tf/Carousel.vue';
import * as echarts from 'echarts';
import TF from '@/components/search/Title/TF.vue';

const showCarousel = ref(true); // 控制走马灯的显示
const geneId = ref('Bca101B3G035300');
const homologousData = ref(null);
const trnData = ref(null);
const classifiedTrnData = ref({});
const activeTab = ref('');
const errorMessage = ref('');
const chartInstances = new Map();
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
});

// 点击提交按钮的处理函数
const handleSubmit = () => {
  showCarousel.value = false; // 立即隐藏走马灯
  fetchTFData(); // 调用数据获取函数
};

const fetchTFData = async () => {
  try {
    // 请求数据
    const response = await axios.get(`https://brassica.wangyuhong.cn/api/tf/`, {
      params: { gene_id: geneId.value },
    });
    // 处理响应数据
    homologousData.value = response.data.homologous_data;
    trnData.value = response.data.tf_data;
    classifyTrnDataBySpecies();
    errorMessage.value = '';

    // 自动切换到第一个物种的数据并渲染图表
    nextTick(() => {
      const speciesList = Object.keys(classifiedTrnData.value);
      if (speciesList.length > 0) {
        activeTab.value = speciesList[0];
      }
      nextTick(renderActiveTabChart);
    });
  } catch (error) {
    homologousData.value = null;
    trnData.value = null;
    errorMessage.value = `Error fetching data: ${error.message}`;
  }
};

const classifyTrnDataBySpecies = () => {
  classifiedTrnData.value = trnData.value.reduce((acc, item) => {
    const species = item.species;
    if (!acc[species]) acc[species] = [];
    acc[species].push(item);
    return acc;
  }, {});
};

// Paginate TRN data for each species
const paginatedData = computed(() => {
  const result = {};
  for (const [species, data] of Object.entries(classifiedTrnData.value)) {
    const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    result[species] = data.slice(start, end);
  }
  return result;
});

// Handle page change
const handlePageChange = () => {
  nextTick(() => renderActiveTabChart());
};

// Generate Network Graph
const generateNetworkChart = (species) => {
  const chartDom = document.getElementById(`network-chart-${species}`);
  if (!chartDom) return;

  // 清理已有图表实例
  if (chartInstances.has(species)) {
    chartInstances.get(species).dispose();
  }

  // 初始化 ECharts 实例
  const chartInstance = echarts.init(chartDom, null, {
    width: chartDom.offsetWidth,
    height: 600,
  });
  chartInstances.set(species, chartInstance);

  // 数据处理
  const tfGene = classifiedTrnData.value[species][0]?.tf; // 中心 TF 基因
  const data = [
    // 中心 TF 基因
    {
      name: tfGene,
      category: 'TF',
      itemStyle: { color: '#D5614A' }, // 红色
      symbolSize: 50, // 尺寸较大
      label: { show: true, position: 'right', formatter: '{b}' }, // 始终显示标签
    },
    // Target 基因
    ...classifiedTrnData.value[species].map((item) => ({
      name: item.target,
      category: 'Target',
      itemStyle: { color: '#81B5CD' }, // 蓝色
      symbolSize: 30, // 尺寸较小
      label: {
        show: false, // 初始不显示
        emphasis: { show: true }, // 鼠标悬停时显示标签
      },
    })),
  ];

  // 连接线数据
  const links = classifiedTrnData.value[species].map((item) => ({
    source: tfGene,
    target: item.target,
    lineStyle: { color: '#869197', width: 2 }, // 连线颜色和样式
  }));

  // ECharts 配置项
  const option = {
    tooltip: { trigger: 'item' },
    legend: [
      {
        data: ['TF', 'Target'],
        textStyle: { color: '#333' },
      },
    ],
    series: [
      {
        type: 'graph',
        layout: 'force',
        data,
        links,
        categories: [
          { name: 'TF', itemStyle: { color: '#D5614A' } },
          { name: 'Target', itemStyle: { color: '#81B5CD' } },
        ],
        roam: true, // 支持拖拽和缩放
        label: { show: true, position: 'right' },
        emphasis: {
          focus: 'adjacency', // 鼠标悬停时高亮连线
          lineStyle: { width: 3 },
        },
        lineStyle: {
          color: 'source',
          curveness: 0, // 连线弯曲程度
        },
        force: {
          edgeLength: [50, 100], // 连线长度范围
          repulsion: 200, // 节点之间的斥力
          gravity: 0.05, // 引力参数
          layoutAnimation: false, // 布局动画
        },
      },
    ],
  };

  // 设置图表配置
  chartInstance.setOption(option);
};

// 渲染图表的函数
const renderActiveTabChart = () => {
  // 只有当activeTab有值时才渲染对应的图表
  if (activeTab.value) {
    nextTick(() => generateNetworkChart(activeTab.value)); // 使用nextTick确保DOM更新
  }
};

// Cleanup chart instances on component unmount
onUnmounted(() => {
  chartInstances.forEach((chart) => chart.dispose());
  chartInstances.clear();
});
</script>



