<template>
  <div class="container">
    <!-- 引入的 BC.vue 组件替换面包屑导航栏 -->
    <BC />


    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="chart-card bar-chart-card">
      <div ref="chartRef" class="v-chart"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import SearchGene from "@/components/genefeature/search/BJ.vue";
import BC from "@/components/genefeature/Title/BJ.vue";
import * as echarts from "echarts";

const chartRef = ref(null); // 引用图表 DOM
let chartInstance = null;

// 数据配置
const categories = [
  "Brassica_juncea.AU213",
  "Brassica_juncea.Tumida_V2",
];
const values = [99904, 100829];

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);
  const option = {
    title: {
      text: "Number of Genes in Genome",
      left: "center",
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
      },
      top: 10,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "value",
      nameLocation: "center",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#666",
      },
      axisLabel: {
        fontSize: 12,
        color: "#666",
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#ddd",
        },
      },
    },
    yAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        fontSize: 14,
        color: "#333",
      },
    },
    series: [
      {
        name: "Genome Count",
        type: "bar",
        data: values,
        barWidth: "50%",
        itemStyle: {
          color: function (params) {
            const colors = ["#4B8BBE", "#306998"];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: true,
          position: "right",
          color: "#333",
          fontSize: 12,
        },
      },
    ],
    grid: {
      left: "10%",
      right: "5%",
      bottom: "15%",
      top: "20%",
      containLabel: true,
    },
  };
  chartInstance.setOption(option);

  // 监听窗口大小变化，实现响应式
  window.addEventListener("resize", resizeChart);
};

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 挂载时初始化图表
onMounted(() => {
  nextTick(initChart);
});

// 卸载时清理事件监听
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
/* 主容器样式 */
.container {
  margin-top: 20px;
  width: 100%;
  max-width: 100%;
  padding: 0px;
  box-sizing: border-box;
}

/* 搜索卡片样式 */
.search-card {
  max-width: 100%;
  padding: 5px;
  background: linear-gradient(135deg, #eef2f6, #f8fbff);
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}


.search-card:hover {
  transform: translateY(-5px);
}

/* 横向柱状图样式 */
.bar-chart-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-chart {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .v-chart {
    height: 400px;
  }
  .search-card {
    padding: 15px;
  }
}
</style>
