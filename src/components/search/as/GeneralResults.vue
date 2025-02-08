<template>
  <div>
    <el-tabs v-model="activeResultTab" @tab-click="handleTabClick">
      <el-tab-pane
          v-for="(endpoint, index) in endpoints"
          :key="index"
          :label="endpoint.title"
          :name="endpoint.title"
      >
        <el-card>
          <h3>{{ endpoint.title }}</h3>
          <!-- 数据表格 -->
          <el-table :data="results[index]?.table || []" border style="width: 100%">
            <el-table-column prop="gene_id" label="Gene ID" />
            <el-table-column prop="chromosome" label="Chromosome" />
            <el-table-column prop="strand" label="Strand" />
            <el-table-column prop="long_exon_start" label="Long Exon Start" />
            <el-table-column prop="long_exon_end" label="Long Exon End" />
            <el-table-column prop="short_exon_start" label="Short Exon Start" />
            <el-table-column prop="short_exon_end" label="Short Exon End" />
            <el-table-column prop="flanking_exon_start" label="Flanking Exon Start" />
            <el-table-column prop="flanking_exon_end" label="Flanking Exon End" />
          </el-table>

          <!-- 箱线图部分 -->
          <div class="charts">
            <el-card>
              <h4>
                Tissue PSI Distribution
                <el-button
                    size="mini"
                    type="primary"
                    @click="downloadChart(index, 'tissue')"
                    class="download-button"
                >
                  Download
                </el-button>
              </h4>
              <div :id="'tissueChart-' + index" class="chart"></div>
            </el-card>
            <el-card>
              <h4>
                Treatment PSI Distribution
                <el-button
                    size="mini"
                    type="primary"
                    @click="downloadChart(index, 'treatment')"
                    class="download-button"
                >
                  Download
                </el-button>
              </h4>
              <div :id="'treatmentChart-' + index" class="chart"></div>
            </el-card>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  props: {
    geneId: String,
    species: String,
  },
  data() {
    return {
      activeResultTab: "A3SS Result",
      endpoints: [
        { title: "A3SS Result", url: "https://brasaicaedb.com/api/as/a3ss/" },
        { title: "MXE Result", url: "https://brassicaedb.com/api/as/mxe/" },
        { title: "SE Result", url: "https://brassicaedb.com/api/as/se/" },
        { title: "A5SS Result", url: "https://brassicaedb.com/api/as/a5ss/" },
        { title: "RI Result", url: "https://brassicaedb.com/api/as/ri/" },
      ],
      results: [],
    };
  },
  watch: {
    geneId: "fetchResults",
    species: "fetchResults",
  },
  methods: {
    async fetchResults() {
      if (!this.geneId || !this.species) return;
      try {
        this.results = await Promise.all(
            this.endpoints.map(async (endpoint) => {
              const response = await axios.get(endpoint.url, {
                params: { gene_id: this.geneId, species: this.species },
              });
              return this.processApiResponse(response.data);
            })
        );
        this.$nextTick(() => {
          this.renderCharts();
        });
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    },
    processApiResponse(data) {
      return {
        table: data.A3SS_data || [],
        tissue: data.grouped?.Tissue || [],
        treatment: data.grouped?.Treatment || [],
      };
    },
    renderCharts() {
      this.results.forEach((result, index) => {
        const tissueChart = echarts.init(document.getElementById(`tissueChart-${index}`));
        const treatmentChart = echarts.init(document.getElementById(`treatmentChart-${index}`));

        const tissueData = this.formatChartData(result.tissue);
        const treatmentData = this.formatChartData(result.treatment);

        tissueChart.setOption(this.getChartOption(tissueData, "Tissue"));
        treatmentChart.setOption(this.getChartOption(treatmentData, "Treatment"));

        window.addEventListener("resize", () => {
          tissueChart.resize();
          treatmentChart.resize();
        });
      });
    },
    formatChartData(data) {
      const categories = Array.from(new Set(data.map((item) => item.classify)));
      const boxData = categories.map((category) => {
        const filtered = data.filter((item) => item.classify === category);
        const values = filtered.map((item) => item.inclusion_level).sort((a, b) => a - b);
        return values.length
            ? [
              Math.min(...values),
              values[Math.floor(values.length / 4)],
              values[Math.floor(values.length / 2)],
              values[Math.floor((values.length * 3) / 4)],
              Math.max(...values),
            ]
            : null;
      });

      const scatterData = data.map((item) => [item.inclusion_level, item.classify]);
      return { categories, boxData, scatterData };
    },
    getChartOption(data, title) {
      return {
        title: { text: `${title} PSI Distribution`, left: "center" },
        xAxis: {
          type: "category",
          data: data.categories,
          name: "Classify",
        },
        yAxis: { type: "value", name: "PSI Level" },
        series: [
          {
            name: "Boxplot",
            type: "boxplot",
            data: data.boxData,
          },
          {
            name: "Scatter",
            type: "scatter",
            data: data.scatterData,
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            if (params.seriesType === "boxplot") {
              return `Category: ${params.name}<br>Min: ${params.data[0]}<br>Q1: ${params.data[1]}<br>Median: ${params.data[2]}<br>Q3: ${params.data[3]}<br>Max: ${params.data[4]}`;
            }
            return `Category: ${params.name}<br>Value: ${params.data[0]}`;
          },
        },
        grid: { top: "15%", bottom: "25%", left: "10%", right: "10%" },
      };
    },
    downloadChart(index, type) {
      const chartId = `${type}Chart-${index}`;
      const chartInstance = echarts.getInstanceByDom(document.getElementById(chartId));
      const image = chartInstance.getDataURL({
        type: "png",
        backgroundColor: "#fff",
      });

      const link = document.createElement("a");
      link.href = image;
      link.download = `${type}_Chart_${index}.png`;
      link.click();
    },
    handleTabClick() {
      this.$nextTick(() => {
        this.renderCharts();
      });
    },
  },
  mounted() {
    this.fetchResults();
  },
};
</script>

<style scoped>
.chart {
  width: 1000px;
  height: 400px;
  margin: 0 auto;
}
.download-button {
  float: right;
  margin-left: 10px;
}
</style>
