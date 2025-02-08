<template>
  <WG />

  <el-card class="search-card">
    <el-row gutter="20" align="middle" class="search-row">
      <!-- Input Field on the Left with Larger Height and Font -->
      <el-col :span="16" md="14">
        <el-input
            v-model="geneId"
            placeholder="Enter Gene ID"
            class="gene-id-input"
        ></el-input>
      </el-col>

      <!-- Example Buttons (Top Right) -->
      <el-col :span="8" md="6" class="example-buttons">
        <el-space>
          <el-button @click="geneId = 'BolC06g049580.2J'" type="text" class="example-button">
            Example: BolC06g049580.2J
          </el-button>
          <el-button @click="geneId = 'Bca101B3G006160'" type="text" class="example-button">
            Bca101B3G006160
          </el-button>
        </el-space>
      </el-col>

      <!-- Submit Button (Bottom Right) -->
      <el-col :span="6" md="4" class="submit-button-container">
        <el-button type="primary" @click="handleSubmit" class="submit-button">Submit</el-button>
      </el-col>
    </el-row>
  </el-card>

  <!-- Carousel (显示条件：showCarousel 为 true) -->
  <Carousel v-if="showCarousel" />

  <!-- Results Section (显示条件：showCarousel 为 false) -->
  <div v-else>
    <!-- Homologous Data Section -->
    <div v-if="homologousData && Object.keys(homologousData).length" class="section">
      <h2>Homologous Data:</h2>
      <el-card shadow="always" class="data-card">
        <el-table :data="[homologousData]" stripe>
          <el-table-column
              v-for="(value, key) in homologousData"
              :key="key"
              :prop="key"
              :label="key.replace('_', ' ')"
              align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-card class="result-card">
      <!-- WGCNA Data Section with Network Graph and Table -->
      <div v-if="classifiedWGCNAData && Object.keys(classifiedWGCNAData).length" class="section">
        <h2>WGCNA Data by Species:</h2>
        <el-tabs v-model="activeTab" @tab-click="renderActiveTabChart">
          <el-tab-pane
              v-for="(data, species) in paginatedData"
              :label="species"
              :name="species"
              :key="species"
          >
            <!-- Network Graph Container -->
            <div :ref="`chartContainer-${species}`" :id="`network-chart-${species}`" class="network-chart"></div>
            <p class="legend">
              Legend:
              <span style="color: red;">Red (Hub Gene)</span>,
              <span style="color: blue;">Blue (Target Genes)</span>
            </p>

            <!-- WGCNA Data Table -->
            <el-card class="wgcna-card" shadow="hover" style="width: 100%; padding: 0px;">
              <el-table :data="data" stripe style="width: 100%;">
                <el-table-column prop="gene_id_1" label="Hub Gene" align="center"></el-table-column>
                <el-table-column prop="gene_id_2" label="Target Gene" align="center"></el-table-column>
                <el-table-column prop="value" label="Value" align="center"></el-table-column>
                <el-table-column prop="species" label="Species" align="center"></el-table-column>
              </el-table>

              <!-- Pagination -->
              <el-pagination
                  v-model:current-page="pagination.currentPage"
                  :page-size="pagination.pageSize"
                  :total="classifiedWGCNAData[species].length"
                  @current-change="handlePageChange"
                  layout="prev, pager, next"
                  class="pagination"
                  style="text-align: center; margin-top: 10px;"
              />
            </el-card>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <!-- Error Message Display -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import WG from '@/components/search/Title/WG.vue';

import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import Carousel from '@/components/search/WGCNA/Carousel.vue'; // 导入Carousel组件

const geneId = ref('BolC06g049580.2J'); // Default Gene ID
const homologousData = ref(null);
const wgcnaData = ref([]);
const classifiedWGCNAData = ref({});
const activeTab = ref('');
const errorMessage = ref('');
const chartInstances = new Map(); // Store echarts instances


// 控制走马灯显示的状态变量
const showCarousel = ref(true);
// Pagination data
const pagination = ref({
  currentPage: 1,
  pageSize: 10, // Set to 10 items per page
});

// 处理提交的函数
const handleSubmit = async () => {
  showCarousel.value = false; // 隐藏走马灯
  await fetchWGCNAData(); // 调用数据获取函数
};
watch(activeTab, (newTab) => {
  if (newTab) {
    renderActiveTabChart(); // 重新渲染当前选中的网络图
  }
});


// Fetch WGCNA Data from API
const fetchWGCNAData = async () => {
  try {
    const response = await axios.get(`https://brassica.wangyuhong.cn/api/wgcna/`, {
      params: { gene_id: geneId.value },
    });
    homologousData.value = response.data.homologous_data[0]; // Adjust to the new API structure
    wgcnaData.value = response.data.wgcna_data;
    classifyWGCNADataBySpecies();
    activeTab.value = Object.keys(classifiedWGCNAData.value)[0]; // Set initial active tab
    errorMessage.value = '';
    nextTick(renderActiveTabChart); // Render chart on initial load
  } catch (error) {
    homologousData.value = null;
    wgcnaData.value = [];
    errorMessage.value = `Error fetching data: ${error.message}`;
  }
};

// Classify WGCNA data by species and remove the limit to 200 entries for charting
const classifyWGCNADataBySpecies = () => {
  classifiedWGCNAData.value = wgcnaData.value.reduce((acc, item) => {
    const species = item.species;
    if (!acc[species]) acc[species] = [];
    acc[species].push(item); // Remove entry limit to allow all entries
    return acc;
  }, {});
};

// Paginate WGCNA data for each species
const paginatedData = computed(() => {
  const result = {};
  for (const [species, data] of Object.entries(classifiedWGCNAData.value)) {
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

// Generate Network Graph with straight lines
const generateNetworkChart = (species) => {
  const chartDom = document.getElementById(`network-chart-${species}`);
  if (!chartDom) return;

  // Clear and reinitialize chart instance
  if (chartInstances.has(species)) {
    chartInstances.get(species).dispose();
  }
  const chartInstance = echarts.init(chartDom, null, {
    width: chartDom.offsetWidth,
    height: 800,
  });
  chartInstances.set(species, chartInstance);



  const hubGene = classifiedWGCNAData.value[species][0].gene_id_1;
  const data = [
    {
      name: hubGene,
      category: 'Hub Gene',
      itemStyle: { color: '#D5614A' },
      symbolSize: 50,
      label: { show: true }, // Hub Gene 始终显示
    },
    ...classifiedWGCNAData.value[species].slice(0, 200).map((item) => ({ // Limit to 200 for charting
      name: item.gene_id_2,
      category: 'Target',
      itemStyle: { color: item.identifier === 'TF' ? '#D5614A' : '#81B5CD' },
      symbolSize: 30,
      label: { show: false }, // 默认不显示 Target 名称
    })),
  ];

  const links = classifiedWGCNAData.value[species].slice(0, 200).map((item) => ({
    source: hubGene,
    target: item.gene_id_2,
    lineStyle: { curveness: 0 }, // Straight lines
  }));

  const option = {
    tooltip: {},
    legend: [{ data: ['Hub Gene', 'Target'] }],
    series: [
      {
        type: 'graph',
        layout: 'force',
        data,
        links,
        categories: [
          { name: 'Hub Gene', itemStyle: { color: '#D5614A' } },
          { name: 'Target', itemStyle: { color: '#81B5CD' } },
        ],
        roam: true,
        label: { show: true, position: 'right', formatter: '{b}' },
        lineStyle: { color: 'source', width: 2 },
        emphasis: { focus: 'adjacency', lineStyle: { width: 3 } },
        force: { edgeLength: [70, 100], repulsion: 300, gravity: 0.1 ,layoutAnimation: false},
      },
    ],
  };

  chartInstance.setOption(option);
};

// Render the active tab's chart
const renderActiveTabChart = () => {
  if (activeTab.value) {
    nextTick(() => generateNetworkChart(activeTab.value)); // 使用 nextTick 确保 DOM 已更新
  }
};

// Cleanup on component unmount
onUnmounted(() => {
  chartInstances.forEach((chartInstance) => chartInstance.dispose());
});
</script>
