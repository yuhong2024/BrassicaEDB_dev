<template>
  <div class="container">
    <!-- 页面标题 -->
    <h1 class="page-title">Brassica Data Visualization</h1>

    <!-- 数据展示 -->
    <div class="data-section">
      <!-- 图表展示 -->
      <div class="charts-container">
        <div id="wgna-hub-chart" class="chart"></div>
        <div id="genome-pie-chart" class="chart"></div>
        <div id="transcriptome-sample-chart" class="chart">
          <h3 class="chart-title">Transcriptome Sample</h3>
        </div>
      </div>

      <!-- 表格展示区域 -->
      <div class="tables-container">
        <!-- 左侧表格 -->
        <div class="table-wrapper">
          <h3 class="table-title">Data Summary</h3>
          <el-table :data="summaryData" style="width: 100%">
            <el-table-column prop="category" label="Category" />
            <el-table-column prop="value" label="Value" align="center" />
          </el-table>
        </div>

        <!-- 右侧表格 -->
        <div class="table-wrapper">
          <h3 class="table-title">Species Statistics</h3>
          <el-table :data="speciesData" style="width: 100%">
            <el-table-column prop="organism" label="Organism">
              <template #default="scope">
                <span class="species-name">{{ scope.row.organism }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sample_number" label="Sample Number" align="center" />
            <el-table-column prop="base_pair" label="Base Pair (Gbp)" align="center" />
            <el-table-column prop="sample_size" label="Sample Size (GB)" align="center" />
          </el-table>
        </div>
      </div>

      <!-- 图片介绍区域 -->
      <div class="species-intro-section">
        <div v-for="(species, index) in featureSections" :key="index" class="species-card">
          <div class="species-image">
            <img :src="species.image" :alt="species.name" />
          </div>
          <div class="species-content">
            <h3 class="species-title">{{ species.name }}</h3>
            <p class="species-description">{{ species.description }}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 数据相关变量
const apiUrl = "https://brassica.wangyuhong.cn/api/homeboard/";


const tableData = ref([]);
const rawData = ref({});

// 物种颜色映射
const speciesColorMap = {
  "Brassica carinata": "#5C7BD9",
  "Brassica juncea": "#9FE080",
  "Brassica napus": "#FFDC60",
  "Brassica nigra": "#FF7070",
  "Brassica oleracea": "#7ED3F4",
  "Brassica rapa": "#40B27D",
};

// 获取API数据
const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl);
    rawData.value = response.data;

    // 更新表格数据
    updateTableData();

    // 绘制图表
    drawWGCNAHubChart();
    drawGenomePieChart();
    drawTranscriptomeSampleChart();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 更新表格数据
const updateTableData = () => {
  tableData.value = [
    { name: "BioProjects", value: rawData.value.data_summary.BioProject },
    { name: "BioSamples", value: rawData.value.data_summary.BioSample },
    { name: "Bases", value: rawData.value.data_summary.Bases },
    { name: "Bytes", value: rawData.value.data_summary.Bytes },
    { name: "Genomes", value: rawData.value.data_summary.Genome },
    { name: "Tissues", value: rawData.value.data_summary.Tissue },
  ];
};

// 绘制 WGCNA Hub Genes 图表
const drawWGCNAHubChart = () => {
  const chartDom = document.getElementById('wgna-hub-chart');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: 'WGCNA Hub Genes',
      left: 'center'
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: Object.keys(rawData.value.WGCNA_hub_genes),
      axisLabel: {
        rotate: 35,
        fontStyle: 'italic'
      }
    },
    yAxis: { type: 'value' },
    series: [{
      data: Object.entries(rawData.value.WGCNA_hub_genes).map(([name, value]) => ({
        value,
        itemStyle: {
          color: speciesColorMap[name] // 使用物种对应的颜色
        }
      })),
      type: 'bar',
      barWidth: '60%'
    }]
  };
  myChart.setOption(option);
};

// 绘制 Genome Pie 图表
const drawGenomePieChart = () => {
  const chartDom = document.getElementById('genome-pie-chart');
  const myChart = echarts.init(chartDom);
  const option = {
    title: { text: 'Genome Pie', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Genomes',
        type: 'pie',
        radius: '70%',
        data: Object.entries(rawData.value.genome_pie).map(([name, value]) => ({
          name,
          value,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        startAngle: 60, // 调整起始角度
      },
    ],
  };
  myChart.setOption(option);
};

// 绘制 Transcriptome Sample 图表
const drawTranscriptomeSampleChart = () => {
  const chartDom = document.getElementById('transcriptome-sample-chart');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: 'Transcriptome Sample Number',  // 修改标题
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        return params.map(item =>
            `<span style="font-style: italic;">${item.name}</span>: ${item.value}`
        ).join('<br/>');
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Object.keys(rawData.value.summary_transcriptom || {}),
      axisLabel: {
        rotate: 27,
        fontStyle: 'italic'
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: Object.entries(rawData.value.summary_transcriptom || {}).map(([name, value]) => ({
        value,
        itemStyle: {
          color: speciesColorMap[name] // 使用物种对应的颜色
        }
      })),
      type: 'bar',
      barWidth: '50%'
    }]
  };
  myChart.setOption(option);
};

// 数据定义
const speciesData = [
  { organism: 'Brassica_carinata', sample_number: 118, base_pair: '8,925.3', sample_size: '286.4' },
  { organism: 'Brassica_juncea', sample_number: 303, base_pair: '26,525.8', sample_size: '908.7' },
  { organism: 'Brassica_napus', sample_number: 902, base_pair: '73,062.6', sample_size: '2,359.0' },
  { organism: 'Brassica_nigra', sample_number: 47, base_pair: '3,224.9', sample_size: '108.3' },
  { organism: 'Brassica_oleracea', sample_number: 578, base_pair: '46,187.2', sample_size: '1,572.7' },
  { organism: 'Brassica_rapa', sample_number: 1090, base_pair: '83,012.0', sample_size: '2,861.7' }
];

const summaryData = [
  { category: 'BioProjects', value: '178' },
  { category: 'BioSamples', value: '2,992' },
  { category: 'Bases', value: '23,773,984,899,331' },
  { category: 'Bytes', value: '8,576,812,504,186' },
  { category: 'Genomes', value: '38' },
  { category: 'Tissues', value: '31' }
];

// 导入图片
import B1 from "@/assets/img/summary/B1.png";
import B2 from "@/assets/img/summary/B2.png";
import B3 from "@/assets/img/summary/B3.png";
import B4 from "@/assets/img/summary/B4.png";
import B5 from "@/assets/img/summary/B5.png";
import B6 from "@/assets/img/summary/B6.png";

// Feature sections data
const featureSections = [
  {
    name: "Genome data statistics",
    image: B1,
    description: "We collected genome data from 38 published brassica species, including 3 Brassica carinata (10167_V1, Gomenzer, ZD_V1), 2 Brassica juncea (AU213, Tumida_V2), 18 Brassica napus (Darmor, Express617, Gangan, HTR001, Kale, Laurentian, Mendel, NY7, No2127, Quinta, Shengli, Tapidor, Westar, ZS11, ZS4_2, ZS9, ZY821, Zheyou7), 3 Brassica nigra (C2_V1, NI100_V2, Sangam_V1.1), 6 Brassica oleracea (D134, HDEM, JZS_V2, Korso, OX_heart, TO1000), and 6 Brassica rapa (Chiifu_V4, NHCC001, PC_fu, XQC, Z1_V2, ZYCX)."
  },
  {
    name: "Transcriptome data statistics",
    image: B2,
    description: "We used \"Brassica\" as key words from NCBI's SRA database, \"RNA, paired, Illumina, Avelen: 150-300\". A total of 3038 transcriptome samples from 178 transcriptome items were collected for the screening criteria. Including Brassica carinata 118, Brassica juncea 303, Brassica napus 902, Brassica nigra 47, Brassica oleracea 578, Brassica rapa 1090."
  },
  {
    name: "Statistics of Interspecific Homologous Genes",
    image: B3,
    description: "We used Arabidopsis thaliana (TAIR10), Brassica carinata (10167), Brassica juncea (Tumida_V2), Brassica napus (ZS11), Brassica nigra (NI100_V2), Brassica oleracea (JZS_V2) and Brassica rapa (Chiifu_V4) as reference genomes to homologate between species. A total of 1046324 homologous gene pairs were obtained, among which 23629 direct homologous genes were found in six species of Brassica L."
  },
  {
    name: "Transcriptome sample statistics",
    image: B4,
    description: "Of the 3,038 transcriptome data collected, 2,657 were general materials, 381 were processed materials. Brassica carinata: 104 ordinary/14 processed, Brassica juncea: 198/5, Brassica napus: 634/268, Brassica nigra: 54/0, Brassica oleracea: 530/69, and Brassica rapa: 1065/25 materials."
  },
  {
    name: "Transcription Factor Statistics",
    image: B5,
    description: "By collecting Arabidopsis transcription factor members in PlantTFDB, we identified 26781 Brassica transcription factor members across six species: Brassica carinata (4338), Brassica juncea (4429), Brassica napus (5172), Brassica nigra (2649), Brassica oleracea (2,719), and Brassica rapa (2,695)."
  },
  {
    name: "Alternative Splicing Statistics",
    image: B6,
    description: "We analyzed five alternative splicing events (A3SS, A5SS, MXE, RI, SE) across six Brassica species. Total 143688 genes with alternative splicing and 29527576 events were identified. Distribution: B. carinata (28221/3433272), B. juncea (28601/4326539), B. napus (35538/10745660), B. nigra (11689/526550), B. oleracea (19225/4617661), B. rapa (20382/5877889). Retained intron (RI) is the most common type, >40% in all species."
  }
];

onMounted(fetchData);
</script>


<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.data-section {
  margin-top: 20px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
}

.chart {
  width: 30%; /* 使用百分比分配空间 */
  min-width: 300px;
  height: 300px;
  margin: 0 auto;
}

.data-table {
  margin-top: 20px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

/* 图片展示区域样式 */
.images-section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
  padding: 2px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.summary-image {
  width: 90%;
  max-width: 1200px;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .image-container {
    padding: 2px;
  }

  .summary-image {
    width: 95%;
  }

  .images-section {
    gap: 20px;
  }
}

/* 优化背景配色 */
.container {
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
}

/* 优化输入框样式 */
:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-input__inner) {
  border-radius: 8px;
}

.chart-title {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.tables-container {
  display: flex;
  gap: 15px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.table-wrapper {
  flex: 1;
  min-width: 300px;
  margin-bottom: 10px;
}

.table-title {
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #333;
  font-weight: bold;
  font-size: 1rem;
}

:deep(.el-table td) {
  font-size: 1rem;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .table-wrapper {
    min-width: 100%;
  }
}

/* 删除图片相关样式 */
.images-section,
.image-container,
.summary-image {
  display: none;
}

.species-intro-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.species-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 25px; /* 增加水平内边距 */
  background: #fff;
  border-radius: 12px; /* 增大圆角 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.species-image {
  flex: 0 0 40%;
  max-width: 40%;
}

.species-image img {
  width: 100%;
  height: auto;
  object-fit: contain; /* 改为contain以保持图表完整性 */
  border-radius: 8px;
}

.species-content {
  flex: 1;
  padding: 10px 0;
}

.species-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
  text-align: center; /* 标题保持居中 */
}

.species-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #34495e;
  text-align: justify; /* 描述文字两端对齐 */
  text-justify: inter-word; /* 改善单词间距 */
  padding: 0 15px; /* 保持水平内边距 */
  hyphens: auto; /* 自动断字 */
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
}

/* 响应式调整 */
@media (max-width: 1400px) {
  .species-title {
    font-size: 1.6rem;
  }

  .species-description {
    font-size: 1.15rem;
  }
}

@media (max-width: 1200px) {
  .species-card {
    padding: 18px 20px;
  }

  .species-title {
    font-size: 1.5rem;
  }

  .species-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .species-card {
    flex-direction: column;
    padding: 15px;
  }

  .species-image {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 15px;
  }

  .species-title {
    font-size: 1.4rem;
  }

  .species-description {
    padding: 0 10px;
    text-align: justify; /* 确保移动端也保持两端对齐 */
  }
}

/* 统一卡片样式 */
.species-card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* 确保图表文字清晰 */
:deep(svg text) {
  font-size: 12px !important;
}

/* 优化图表容器 */
:deep(.echarts-container) {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

/* 表格样式调整 */
:deep(.el-table) {
  /* 表格字体全局设置 */
  font-size: 1rem; /* 稍微减小基础字体 */

  /* 所有单元格居中对齐 */
  .cell {
    text-align: center;
    padding: 8px 0; /* 减小单元格内边距 */
  }

  /* 表头样式 */
  th {
    font-size: 1.1rem; /* 稍微减小表头字体 */
    font-weight: bold;
    background-color: #f5f7fa;
    color: #333;

    .cell {
      text-align: center;
      padding: 10px 0; /* 减小表头内边距 */
    }
  }

  /* 表格内容 */
  td {
    .cell {
      text-align: center;
      font-size: 1rem;
    }
  }

  /* 斜体物种名称 */
  .species-name {
    font-style: italic;
    font-size: 1rem;
  }
}

/* 表格标题样式 */
.table-title {
  text-align: center;
  font-size: 1.2rem; /* 减小表格标题字体 */
  font-weight: bold;
  margin-bottom: 10px; /* 减小标题底部间距 */
  color: #333;
}

/* 响应式调整 */
@media (max-width: 768px) {
  :deep(.el-table) {
    font-size: 0.95rem;

    th {
      font-size: 1rem;
    }

    td .cell {
      font-size: 0.95rem;
    }
  }

  .table-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
}
</style>
