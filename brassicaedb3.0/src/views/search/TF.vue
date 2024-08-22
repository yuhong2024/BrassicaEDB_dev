<template>
  <div class="tf-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>TF Regulation</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/analysis">Analysis</el-breadcrumb-item>
          <el-breadcrumb-item>TF Regulation</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Page Introduction -->
    <el-card class="intro-card">
      <h2>Transcription Factor Regulation Network</h2>
      <p>
        Explore the TF regulation network across different species. Input a gene sequence, upload a file, and search for related TF networks. Results include visualizations and detailed data tables.
      </p>
    </el-card>

    <!-- Search Panel -->
    <el-card class="search-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="selectedSpecies" placeholder="选择物种" style="width: 100%;">
            <el-option label="Species A" value="A"></el-option>
            <el-option label="Species B" value="B"></el-option>
            <el-option label="Species C" value="C"></el-option>
            <el-option label="Species D" value="D"></el-option>
            <el-option label="Species E" value="E"></el-option>
            <el-option label="Species F" value="F"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input v-model="geneId" placeholder="请输入序列" style="width: 100%;"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="searchGene" style="width: 100%;">搜索</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="example-row" style="margin-top: 20px;">
        <el-col :span="18">
          <span>示例序列:</span>
          <el-button @click="fillGeneId('BnaA01G0000100ZS')" type="text">BnaA01G0000100ZS</el-button>
          <el-button @click="fillGeneId('BnaA01G0000200ZS')" type="text">BnaA01G0000200ZS</el-button>
        </el-col>
        <el-col :span="6">
          <el-upload
              class="upload-demo"
              drag
              action=""
              :auto-upload="false"
              :before-upload="handleFileUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖拽文件或点击上传</div>
            <div class="el-upload__tip">仅支持txt文件</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>

    <!-- Default State: TF Table and Carousel -->
    <div v-if="!isSearchPerformed">
      <el-card class="tf-table-card" shadow="hover">
        <el-table :data="paginatedTfData" stripe>
          <el-table-column prop="TF" label="TF" width="180"></el-table-column>
          <el-table-column prop="A" label="Species A"></el-table-column>
          <el-table-column prop="B" label="Species B"></el-table-column>
          <el-table-column prop="C" label="Species C"></el-table-column>
          <el-table-column prop="D" label="Species D"></el-table-column>
          <el-table-column prop="E" label="Species E"></el-table-column>
          <el-table-column prop="F" label="Species F"></el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="tfData.length"
            :page-size="pageSize"
            @current-change="handlePageChange"
        />
      </el-card>
      <el-card class="carousel-card" shadow="hover">
        <el-carousel height="250px" trigger="click" :autoplay="true">
          <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
            <img :src="item" alt="Carousel Image" style="width: 100%; height: 100%;" />
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>

    <!-- Search State: TF Network Graph and Results Table -->
    <div v-else>
      <el-card class="network-chart-card" shadow="hover">
        <div ref="chart" class="chart"></div>
        <el-button @click="downloadNetworkData" type="primary" icon="el-icon-download">下载网络数据</el-button>
      </el-card>
      <el-card class="result-table-card" shadow="hover">
        <el-table :data="paginatedResultData" stripe>
          <el-table-column prop="HubGene" label="Hub Gene" width="180"></el-table-column>
          <el-table-column prop="TargetGene" label="Target Gene"></el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="handleResultPageChange"
        />
        <el-button @click="downloadResultData" type="primary" icon="el-icon-download">下载结果数据</el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';

// 页面数据
const selectedSpecies = ref('');
const geneId = ref('');
const tfData = reactive([]); // 全部TF数据
const paginatedTfData = ref([]); // 分页显示的TF数据
const searchResult = reactive([]); // 搜索后的数据
const paginatedResultData = ref([]); // 分页显示的搜索结果
const carouselImages = ref(['/src/assets/img/test/logo.jpg', '/src/assets/img/test/tf2.png', '/src/assets/img/test/tf.jpg']);
const total = ref(0);
const pageSize = ref(10); // 每页10行
const chart = ref(null);
const isSearchPerformed = ref(false); // 搜索状态标志

// 加载TF表格数据
const loadTfData = async () => {
  try {
    const response = await fetch('/src/assets/tf_data.json');
    const data = await response.json();
    tfData.push(...data);
    updatePaginatedData(1);
  } catch (error) {
    console.error('读取TF数据失败:', error);
  }
};

// 读取本地txt文件数据
const loadData = async () => {
  try {
    const response = await fetch('/src/assets/datatest/TF_Regulation_Network.txt');
    const data = await response.text();
    parseData(data);
  } catch (error) {
    console.error('读取数据失败:', error);
  }
};

// 解析读取的数据
const parseData = (data) => {
  const lines = data.trim().split('\n');
  lines.forEach(line => {
    const [HubGene, TargetGene] = line.split('\t');
    searchResult.push({ HubGene, TargetGene });
  });
};

// 更新分页显示的数据
const updatePaginatedData = (page) => {
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedTfData.value = tfData.slice(start, end);
};

// 搜索基因
const searchGene = () => {
  const filteredData = searchResult.filter(row => row.HubGene === geneId.value);
  if (filteredData.length > 0) {
    total.value = filteredData.length;
    isSearchPerformed.value = true;
    updatePaginatedResultData(1); // 初始化分页显示
    drawNetworkChart(filteredData); // 使用过滤后的数据生成网络图
  } else {
    alert('未找到匹配的基因ID');
  }
};

// 更新分页显示的搜索结果
const updatePaginatedResultData = (page) => {
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedResultData.value = searchResult.slice(start, end);
};

// 生成网络图
const drawNetworkChart = (filteredData) => {
  const myChart = echarts.init(chart.value);
  const nodes = [
    { name: geneId.value, symbolSize: 60, itemStyle: { color: '#c23531' } }
  ];
  const links = [];

  filteredData.forEach(row => {
    nodes.push({ name: row.TargetGene, symbolSize: 40, itemStyle: { color: '#61a0a8' } });
    links.push({ source: geneId.value, target: row.TargetGene });
  });

  const options = {
    title: { text: 'TF Regulation Network', left: 'center' },
    legend: {
      data: [
        { name: 'TF', icon: 'rect', itemStyle: { color: '#c23531' } },
        { name: 'Target', icon: 'rect', itemStyle: { color: '#61a0a8' } }
      ],
      top: 'top',
      left: 'left',
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        force: { repulsion: 1000 },
        data: nodes,
        links: links,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  };

  myChart.setOption(options);
};

// 下载网络数据
const downloadNetworkData = () => {
  const dataStr = JSON.stringify({ geneId: geneId.value, data: searchResult }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${geneId.value}_network_data.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// 下载结果数据
const downloadResultData = () => {
  const dataStr = JSON.stringify({ geneId: geneId.value, data: searchResult }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${geneId.value}_result_data.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// 处理分页
const handlePageChange = (page) => {
  updatePaginatedData(page);
};

const handleResultPageChange = (page) => {
  updatePaginatedResultData(page);
};

// 示例基因ID点击填充
const fillGeneId = (exampleGeneId) => {
  geneId.value = exampleGeneId;
};

// 文件上传处理
const handleFileUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    geneId.value = event.target.result.trim();
  };
  reader.readAsText(file);
  return false; // 防止自动上传
};

onMounted(() => {
  loadTfData(); // 加载默认TF表格数据
  loadData();   // 加载本地txt数据
});
</script>

<style scoped>
.tf-page {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

.intro-card,
.search-card,
.network-chart-card,
.result-table-card,
.tf-table-card {
  margin-bottom: 20px;
}

.chart {
  width: 100%;
  height: 500px;
}

.example-row {
  margin-top: 10px;
}

.carousel-card {
  margin-top: 20px;
}
</style>
