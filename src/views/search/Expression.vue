<template>
  <div class="transcript-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Transcript Expression</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Introduction 板块 -->
    <el-card class="intro-card">
      <div class="intro-content">
        <div class="intro-image-container">
          <img
              src="https://assets.entrepreneur.com/content/3x2/2000/20150825183914-dna-science-double-helix-.jpeg"
              alt="Brassica Image"
              class="intro-image"
          />
        </div>
        <div class="intro-text">
          <h2>Transcript Expression</h2>
          <p>
            The transcriptome level provides Brassica researchers with a comprehensive and
            user-friendly interactive tool for gene expression profiling data, the Brassica
            Expression Database (BrassicaEDB). Using this database, researchers can quickly
            retrieve target gene expression level data, elucidate gene function, and advance
            Brassica breeding at the transcriptome level.
          </p>
        </div>
      </div>
    </el-card>

    <!-- 基因表达量查询部分 -->
    <el-card class="search-card">
      <h2>Gene Expression Query</h2>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Gene ID">
          <el-input v-model="geneIdsInput" placeholder="Please enter Gene ID, use commas to separate multiple IDs"></el-input>
        </el-form-item>

        <!-- 快速选择 -->
        <el-form-item label="Quick Selection">
          <el-button-group>
            <el-button v-for="geneId in quickGeneIds" :key="geneId" @click="addGeneId(geneId)">
              {{ geneId }}
            </el-button>
          </el-button-group>
        </el-form-item>

        <!-- 物种选择 -->
        <el-form-item label="Species">
          <el-select v-model="species" placeholder="Select species">
            <el-option v-for="speciesOption in speciesOptions" :key="speciesOption" :label="speciesOption" :value="speciesOption"></el-option>
          </el-select>
        </el-form-item>

        <!-- 项目选择 -->
        <el-form-item label="Project">
          <el-select v-model="bioproject" placeholder="Select project">
            <el-option v-for="project in projects" :key="project" :label="project" :value="project"></el-option>
          </el-select>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitData">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 项目表格与数据表格 -->
    <el-card>
      <div v-if="showProjectTable">
        <h1>Project Table</h1>
        <ProjectTable />
      </div>

      <div v-else>
        <ExpressionTables
            countsFilePath="/src/assets/data/expression/counts.xlsx"
            fpkmFilePath="/src/assets/data/expression/fpkm.xlsx"
            tpmFilePath="/src/assets/data/expression/tpm.xlsx"
        />
      </div>
    </el-card>

    <!-- 图表展示 -->
    <el-card v-if="!showProjectTable" class="draw">
      <el-tabs type="card">
        <el-tab-pane label="Trend Chart">
          <div ref="trendChart" class="chart-container"></div>
        </el-tab-pane>
        <el-tab-pane label="Heatmap">
          <div ref="heatmapChart" class="chart-container"></div>
        </el-tab-pane>
        <el-tab-pane label="Boxplot">
          <div ref="boxplotChart" class="chart-container"></div>
        </el-tab-pane>
        <el-tab-pane label="Barplot">
          <div ref="barplotChart" class="chart-container"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';
import ProjectTable from "@/components/search/expression/ProjectTable.vue";
import ExpressionTables from '@/components/ExpressionTables.vue';

export default {
  components: {ProjectTable, ExpressionTables},
  data() {
    return {
      geneIdsInput: '',
      species: 'Brassica napus',
      bioproject: 'PRJNA601012',
      trendplotData: null,
      heatmapData: null,
      boxplotData: null,
      barplotData: null,
      quickGeneIds: [
        'BnaA01G0000100ZS', 'BnaA01G0000200ZS', 'BnaA01G0000300ZS',
        'BnaA01G0000400ZS', 'BnaA01G0000500ZS', 'BnaA01G0000600ZS'
      ],
      speciesOptions: [
        'Brassica carinata', 'Brassica juncea', 'Brassica napus',
        'Brassica nigra', 'Brassica oleracea', 'Brassica rapa'
      ],
      projects: [
        'PRJNA749083', 'PRJNA637700', 'PRJNA880456', 'PRJNA777001',
        'PRJNA821348', 'PRJNA836775', 'PRJNA685002', 'PRJNA876031',
        'PRJNA945384', 'PRJNA896133', 'PRJNA846709', 'PRJNA601012'
      ],
      showProjectTable: true,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Analysis', path: '/analysis' },
        { name: 'Transcript Expression', path: '/transcript-expression' },
      ]
    };
  },
  methods: {
    addGeneId(geneId) {
      if (!this.geneIdsInput.includes(geneId)) {
        this.geneIdsInput += this.geneIdsInput.length > 0 ? `, ${geneId}` : geneId;
      }
    },
    async submitData() {
      this.showProjectTable = false; // 隐藏项目表格
      const formData = new FormData();
      const geneIds = this.geneIdsInput.split(',').map(id => id.trim());
      geneIds.forEach(id => formData.append('gene_ids', id));
      formData.append('species', this.species);
      formData.append('bioproject', this.bioproject);

      try {
        const jsonRes = await axios.post('https://brassica.wangyuhong.cn/api/transcriptomdata/', formData);
        const data = jsonRes.data.data;

        this.trendplotData = data.trendplot_data;
        this.heatmapData = data.heatmap_data;
        this.boxplotData = data.boxplot_data;
        this.barplotData = data.barplot_data;

        this.$nextTick(() => {
          this.drawGeneTrend();
          this.drawHeatmap();
          this.drawBoxplot();
          this.drawBarplot();
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    drawGeneTrend() {
      const trendData = this.trendplotData;
      if (!trendData || !this.$refs.trendChart) return;
      const sampleNames = Object.values(trendData)[0].map(item => item.name);
      const series = Object.keys(trendData).map(geneId => ({
        name: geneId,
        type: 'line',
        data: trendData[geneId].map(item => item.tpm),
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {width: 2}
      }));
      const option = {
        title: {text: 'Gene Expression Trend Chart'},
        tooltip: {trigger: 'axis'},
        legend: {data: Object.keys(trendData), bottom: 0, type: 'scroll'},
        grid: {top: '10%', left: '5%', right: '4%', bottom: '20%', containLabel: true},
        xAxis: {type: 'category', data: sampleNames, axisLabel: {rotate: 45, interval: 0}},
        yAxis: {type: 'value', name: 'Expression Value (TPM)'},
        series,
      };
      const chart = echarts.init(this.$refs.trendChart, null, {width: 1000, height: 500});
      chart.setOption(option);
      window.addEventListener('resize', () => {
        chart.resize();  // 动态调整图表大小
      });

    },
    drawHeatmap() {
      const heatmapData = this.heatmapData;
      if (!heatmapData || !this.$refs.heatmapChart) return;
      const geneNames = Object.keys(heatmapData);
      const sampleNames = heatmapData[geneNames[0]].map(item => item.name);
      const heatmapArray = [];
      geneNames.forEach((gene, rowIndex) => {
        heatmapData[gene].forEach((sample, colIndex) => {
          heatmapArray.push([colIndex, rowIndex, sample.log_tpm || 0]);
        });
      });
      const option = {
        title: {text: 'Gene Expression Heatmap'},
        xAxis: {type: 'category', data: sampleNames, axisLabel: {rotate: 45}},
        yAxis: {type: 'category', data: geneNames},
        visualMap: {min: 0, max: 1, calculable: true, orient: 'vertical', left: 'right'},
        series: [{type: 'heatmap', data: heatmapArray}],
      };
      const chart = echarts.init(this.$refs.heatmapChart, null, {width: 900, height: 500});
      chart.setOption(option);
      window.addEventListener('resize', () => {
        chart.resize();  // 动态调整图表大小
      });
    },
    drawBoxplot() {
      const boxplotData = this.boxplotData;
      if (!boxplotData || !this.$refs.boxplotChart)
        return;
      const geneIds = Object.keys(boxplotData);
      const tissueNames = boxplotData[geneIds[0]].map(item => item.tissue);
      const series = geneIds.map(geneId => {
        const data = tissueNames.map(tissue => {
          const tissueData = boxplotData[geneId].filter(item => item.tissue === tissue).map(item => item.tpm);
          tissueData.sort((a, b) => a - b);
          return [
            Math.min(...tissueData),
            tissueData[Math.floor(tissueData.length / 4)],
            tissueData[Math.floor(tissueData.length / 2)],
            tissueData[Math.floor((tissueData.length * 3) / 4)],
            Math.max(...tissueData),
          ];
        });
        return {name: geneId, type: 'boxplot', data};
      });
      const option = {
        title: {text: 'Gene Expression Boxplot'},
        legend: {data: geneIds, bottom: 20},
            grid: {
              top: '10%',
              left: '5%',
              right: '5%',
              bottom: '25%', // 增加底部间距
              containLabel: true},
        xAxis: {type: 'category', data: tissueNames},
        yAxis: {type: 'value', name: 'TPM'},
        series,
      };
      const chart = echarts.init(this.$refs.boxplotChart, null, {width: 900, height: 500});
      chart.setOption(option);
      window.addEventListener('resize', () => {
        chart.resize();  // 动态调整图表大小
      });
    },
    drawBarplot() {
      const barplotData = this.barplotData;
      if (!barplotData || !this.$refs.barplotChart) return;
      const geneIds = Object.keys(barplotData);
      const classifyNames = barplotData[geneIds[0]].map(item => item.classify);
      const series = geneIds.map(geneId => ({
        name: geneId,
        type: 'bar',
        data: barplotData[geneId].map(item => item.tpm),
        label: {show: true, position: 'top'},
      }));
      const option = {
        title: {text: 'Gene Expression Barplot'},
        xAxis: {type: 'category', data: classifyNames},
        yAxis: {type: 'value', name: 'TPM'},
        legend: {data: geneIds, bottom: 20},
        series,
      };
      const chart = echarts.init(this.$refs.barplotChart, null, {width: 1000, height: 500});
      chart.setOption(option);
      window.addEventListener('resize', () => {
        chart.resize();  // 动态调整图表大小
      });
    },
  },
};
</script>




<style scoped>
.transcript-page {
  padding: 20px;
}


.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
  align-items: center;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}


.intro-card,
.search-card {
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image-container {
  flex: 0 0 150px;
  margin-right: 20px;
}

.intro-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.intro-text {
  flex: 1;
}


.el-form-item {
  margin-bottom: 20px;
}



.chart-container {
  width: 100%; /* 设置宽度为80%，居中显示 */
  margin: 0 auto; /* 通过auto margin使其水平居中 */
  height: 100%; /* 设置高度 */
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直和水平居中 */

}

@media screen and (max-width: 768px) {
  .chart-container {
    height: 400px;
  }
}

@media screen and (max-width: 480px) {
  .chart-container {
    height: 300px;
  }
}


@media screen and (max-width: 768px) {
  .chart-container {
    height: 400px; /* 针对小屏幕的优化 */
  }
}

@media screen and (max-width: 480px) {
  .chart-container {
    height: 300px; /* 针对更小屏幕的优化 */
  }
}


.chart-section {
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
