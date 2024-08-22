<template>
  <div class="coexpression-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Co-expression Network</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/analysis">Analysis</el-breadcrumb-item>
          <el-breadcrumb-item>Co-expression</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Page Introduction -->
    <el-card class="intro-card">
      <h2>CO-expression Network</h2>
      <p>
        Explore the co-expression network across different species. Input a gene sequence, upload a file, and search for related networks. Results include visualizations and detailed data tables.
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
          <span>示例基因ID:</span>
          <el-button @click="fillGeneId('BnaA01G0000100ZS')" type="text">BnaA01G0000100ZS</el-button>
          <el-button @click="fillGeneId('BnaA01G0000500ZS')" type="text">BnaA01G0000500ZS</el-button>
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

    <!-- Default State: Bar Chart and Carousel -->
    <div v-if="!searchResult.length">
      <el-card class="chart-card" shadow="hover">
        <div ref="barChart" class="chart"></div>
      </el-card>
      <el-card class="carousel-card" shadow="hover">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
            <img :src="item" alt="Carousel Image" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>

    <!-- Search State: Network Graph and Results Table -->
    <div v-else>
      <el-card class="network-chart-card" shadow="hover">
        <div ref="chart" class="chart"></div>
        <el-button @click="downloadNetworkData" type="primary" style="margin-top: 10px;">下载网络图数据</el-button>
      </el-card>
      <el-card class="result-table-card" shadow="hover">
        <el-table :data="paginatedCoexpData" stripe>
          <el-table-column prop="HubGene" label="Hub Gene" width="180"></el-table-column>
          <el-table-column prop="TargetGene" label="Target Gene"></el-table-column>
        </el-table>
        <el-pagination
            v-if="total > pageSize"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="handlePageChange"
        />
        <el-button @click="downloadResultData" type="primary" style="margin-top: 10px;">下载表格数据</el-button>
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
const coexpData = reactive([]); // 全部CO-expression数据
const paginatedCoexpData = ref([]); // 分页显示的CO-expression数据
const searchResult = ref([]); // 搜索后的数据
const carouselImages = ref(['/src/assets/img/test/image2.jpg', '/src/assets/img/test/image3.jpg', '/src/assets/img/test/image4.jpg']);
const total = ref(0);
const pageSize = ref(10); // 每页10行
const chart = ref(null);
const barChart = ref(null);

// 加载CO-expression表格数据
const loadCoexpData = async () => {
  try {
    const response = await fetch('/src/assets/datatest/CO-expression_Network.txt');
    const data = await response.text();
    parseData(data);
  } catch (error) {
    console.error('读取CO-expression数据失败:', error);
  }
};

// 解析读取的数据
const parseData = (data) => {
  const lines = data.trim().split('\n');
  lines.forEach(line => {
    const [HubGene, TargetGene] = line.split('\t');
    coexpData.push({ HubGene, TargetGene });
  });
};

// 更新分页显示的数据
const updatePaginatedData = (page) => {
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedCoexpData.value = searchResult.value.slice(start, end);
};

// 搜索基因
const searchGene = () => {
  if (geneId.value) {
    const filteredData = coexpData.filter(row => row.HubGene === geneId.value);
    if (filteredData.length > 0) {
      searchResult.value = filteredData;
      total.value = filteredData.length;
      updatePaginatedData(1);
      drawNetworkChart(filteredData);
    } else {
      console.warn('未找到匹配数据');
      searchResult.value = []; // 重置搜索结果
      total.value = 0;
    }
  }
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
    title: { text: 'CO-expression Network', left: 'center' },
    legend: {
      data: [
        { name: 'Hub Gene', icon: 'circle', textStyle: { color: '#c23531' } },
        { name: 'Target Gene', icon: 'circle', textStyle: { color: '#61a0a8' } },
      ],
      bottom: 0,
      left: 'center',
      orient: 'horizontal',
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

// 处理分页
const handlePageChange = (page) => {
  updatePaginatedData(page);
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
  return false; // 阻止自动上传
};

// 加载统计图表数据
const loadChartData = () => {
  const myBarChart = echarts.init(barChart.value);
  const options = {
    xAxis: {
      type: 'category',
      data: ['Gene A', 'Gene B', 'Gene C', 'Gene D', 'Gene E']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290],
      type: 'bar'
    }]
  };
  myBarChart.setOption(options);
};

// 下载搜索结果数据
const downloadResultData = () => {
  const blob = new Blob([JSON.stringify(searchResult.value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${geneId.value}_result.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// 下载网络图数据
const downloadNetworkData = () => {
  const nodes = [{ name: geneId.value, symbolSize: 60 }];
  searchResult.value.forEach(row => {
    nodes.push({ name: row.TargetGene, symbolSize: 40 });
  });

  const data = { nodes };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${geneId.value}_network.json`;
  link.click();
  URL.revokeObjectURL(url);
};

onMounted(() => {
  loadCoexpData(); // 加载CO-expression数据
  loadChartData(); // 加载条形图数据
});
</script>

<style scoped>
.coexpression-page {
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
.chart-card,
.carousel-card {
  margin-bottom: 20px;
}

.chart {
  width: 100%;
  height: 500px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
