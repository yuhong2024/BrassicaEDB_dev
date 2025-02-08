<template>
  <div class="result-page">
    <h2>Result</h2>



    <!-- 表格数据展示 -->
    <el-card class="data-card" v-if="chartData">
      <h3>TPM Data</h3>
      <el-tabs v-model="activeTableTab" type="border-card">
        <el-tab-pane label="TPM Data" name="tpm">
          <el-table :data="formattedTpmData" stripe border>
            <el-table-column prop="gene_id" label="Gene ID" width="150"></el-table-column>
            <el-table-column v-for="sample in samples" :key="sample" :prop="sample" :label="sample"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </el-card>

<!--    <el-table :data="tableData" stripe style="width: 100%">-->
<!--      <el-table-column prop="date" label="Date" width="180" />-->
<!--      <el-table-column prop="name" label="Name" width="180" />-->
<!--      <el-table-column prop="address" label="Address" />-->
<!--    </el-table>-->


    <!-- 图表数据展示 -->
    <el-card class="chart-card" v-if="chartData">
      <h3>Chart Result</h3>
      <el-tabs v-model="activeChartTab" type="card">



        <el-tab-pane label="Trend Chart" name="trend">
          <div ref="trendChart" class="chart-container"></div>
        </el-tab-pane>

        <el-tab-pane label="Heatmap" name="heatmap">
          <div ref="heatmapChart" class="chart-container"></div>
        </el-tab-pane>

        <el-tab-pane label="Boxplot" name="boxplot">
          <div ref="boxplotChart" class="chart-container"></div>
        </el-tab-pane>

        <el-tab-pane label="Barplot" name="barplot">
          <div ref="barplotChart" class="chart-container"></div>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  props: {
    geneIds: String,
    species: String,
    bioproject: String
  },
  data() {
    return {
      chartData: null,
      errorMessage: null,
      activeTableTab: 'counts', // 设置默认激活的表格 Tab
      activeChartTab: 'trend', // 设置默认激活的图表 Tab
      samples: [],
      formattedCountsData: [],
      formattedTpmData: [],
      formattedFpkmData: []
    };
  },
  watch: {
    geneIds: 'fetchChartData',
    species: 'fetchChartData',
    bioproject: 'fetchChartData'
  },
  methods: {
    async fetchChartData() {
      const formData = new FormData();
      const geneIdArray = this.geneIds.split(',').map(id => id.trim());
      geneIdArray.forEach(id => formData.append('gene_ids', id));
      formData.append('species', this.species);
      formData.append('bioproject', this.bioproject);

      try {
        const response = await axios.post('https://brassica.wangyuhong.cn/api/transcriptomdata/', formData);
        if (response.data.status === 'success') {
          this.chartData = response.data.data;
          this.processData();
        } else {
          this.errorMessage = '数据加载失败';
        }
      } catch (error) {
        this.errorMessage = `请求数据时出错: ${error.message}`;
      }
    },
    processData() {
      const firstGeneKey = Object.keys(this.chartData.counts_data)[0];
      this.samples = Object.keys(this.chartData.counts_data[firstGeneKey]);

      this.formattedCountsData = Object.keys(this.chartData.counts_data).map(gene_id => ({
        gene_id,
        ...this.chartData.counts_data[gene_id]
      }));

      this.formattedTpmData = Object.keys(this.chartData.tpm_data).map(gene_id => ({
        gene_id,
        ...this.chartData.tpm_data[gene_id]
      }));

      this.formattedFpkmData = Object.keys(this.chartData.fpkm_data).map(gene_id => ({
        gene_id,
        ...this.chartData.fpkm_data[gene_id]
      }));

      this.$nextTick(() => {
        this.initializeCharts();
      });
    },
    downloadJSON(tabName) {
      let dataToDownload;
      if (tabName === 'counts') dataToDownload = this.formattedCountsData;
      else if (tabName === 'tpm') dataToDownload = this.formattedTpmData;
      else if (tabName === 'fpkm') dataToDownload = this.formattedFpkmData;

      const dataStr = JSON.stringify(dataToDownload, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${tabName}_data.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    initializeCharts() {
      this.drawGeneTrend();
      this.drawHeatmap();
      this.drawBoxplot();
      this.drawBarplot();
    },

    drawGeneTrend() {
      if (!this.chartData.trendplot_data || !this.$refs.trendChart) return;

      const sampleNames = Object.values(this.chartData.trendplot_data)[0].map(item => item.name);
      const series = Object.keys(this.chartData.trendplot_data).map(geneId => ({
        name: geneId,
        type: 'line',
        data: this.chartData.trendplot_data[geneId].map(item => item.tpm),
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2 }
      }));

      const option = {
        title: { text: 'Gene Expression Trend Chart' },
        tooltip: { trigger: 'axis' },
        legend: { data: Object.keys(this.chartData.trendplot_data), bottom: 0, type: 'scroll' },
        grid: { top: '10%', left: '5%', right: '4%', bottom: '20%', containLabel: true },
        xAxis: { type: 'category', data: sampleNames, axisLabel: { rotate: 45, interval: 0 } },
        yAxis: { type: 'value', name: 'Expression Value (TPM)' },
        series
      };

      const chart = echarts.init(this.$refs.trendChart, null, { width: 1200, height: 500 });
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
    drawHeatmap() {
      if (!this.chartData.heatmap_data || !this.$refs.heatmapChart) return;

      const geneNames = Object.keys(this.chartData.heatmap_data);
      const sampleNames = this.chartData.heatmap_data[geneNames[0]].map(item => item.name);
      const heatmapArray = [];
      geneNames.forEach((gene, rowIndex) => {
        this.chartData.heatmap_data[gene].forEach((sample, colIndex) => {
          heatmapArray.push([colIndex, rowIndex, sample.log_tpm || 0]);
        });
      });

      const option = {
        title: { text: 'Gene Expression Heatmap' },
        xAxis: { type: 'category', data: sampleNames, axisLabel: { rotate: 45 } },
        yAxis: { type: 'category', data: geneNames },
        visualMap: { min: 0, max: 1, calculable: true, orient: 'vertical', left: 'right' },
        series: [{ type: 'heatmap', data: heatmapArray }]
      };

      const chart = echarts.init(this.$refs.heatmapChart, null, { width: 1300, height: 450 });
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
    drawBoxplot() {
      if (!this.chartData.boxplot_data || !this.$refs.boxplotChart) return;

      const geneIds = Object.keys(this.chartData.boxplot_data);
      const tissueNames = Array.from(new Set(this.chartData.boxplot_data[geneIds[0]].map(item => item.tissue)));

      const boxplotSeries = tissueNames.map(tissue => {
        const data = geneIds.map(geneId => {
          const tissueData = this.chartData.boxplot_data[geneId]
              .filter(item => item.tissue === tissue)
              .map(item => item.tpm);

          if (tissueData.length === 0) return null;

          tissueData.sort((a, b) => a - b);
          return [
            Math.min(...tissueData),
            tissueData[Math.floor(tissueData.length / 4)],
            tissueData[Math.floor(tissueData.length / 2)],
            tissueData[Math.floor((tissueData.length * 3) / 4)],
            Math.max(...tissueData)
          ];
        });

        return {
          name: tissue,
          type: 'boxplot',
          data,
          tooltip: {
            formatter: param => `${tissue} <br/> Gene ID: ${geneIds[param.dataIndex]} <br/> TPM: ${param.data}`
          }
        };
      });

      const option = {
        title: { text: 'Gene Expression Boxplot' },
        tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
        legend: { data: tissueNames, bottom: 20 },
        grid: { top: '10%', left: '5%', right: '5%', bottom: '25%', containLabel: true },
        xAxis: { type: 'category', data: geneIds, name: 'Gene ID', axisLabel: { rotate: 45 } },
        yAxis: { type: 'value', name: 'TPM' },
        series: boxplotSeries
      };

      const chart = echarts.init(this.$refs.boxplotChart, null, { width: 1200, height: 500 });
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
    drawBarplot() {
      if (!this.chartData.barplot_data || !this.$refs.barplotChart) return;

      const geneIds = Object.keys(this.chartData.barplot_data);
      const classifySet = new Set();

      const series = [];
      geneIds.forEach(geneId => {
        this.chartData.barplot_data[geneId].forEach(item => {
          if (!classifySet.has(item.classify)) {
            classifySet.add(item.classify);
            series.push({
              name: item.classify,
              type: 'bar',
              data: geneIds.map(id => {
                const match = this.chartData.barplot_data[id].find(dataItem => dataItem.classify === item.classify);
                return match ? match.tpm : 0;
              }),
              label: { show: true, position: 'top' }
            });
          }
        });
      });

      const option = {
        title: { text: 'Gene Expression Barplot' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: Array.from(classifySet), bottom: 20 },
        xAxis: { type: 'category', data: geneIds, name: 'Gene ID', axisLabel: { rotate: 45 } },
        yAxis: { type: 'value', name: 'TPM' },
        series,
        grid: { top: '10%', left: '5%', right: '5%', bottom: '20%', containLabel: true }
      };

      const chart = echarts.init(this.$refs.barplotChart, null, { width: 1200, height: 500 });
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
  },

  mounted() {
    this.fetchChartData();
  }
};
</script>

<style scoped>
.result-page {
  padding: 20px;
}

.data-card, .chart-card {
  margin-top: 10px;
}

.chart-container {
  width: 100%;
  height: 500px;
}
</style>
