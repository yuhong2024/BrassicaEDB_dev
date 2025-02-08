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
import SearchGene from "@/components/genefeature/search/BC.vue";
import BC from "@/components/genefeature/Title/BC.vue";
import * as echarts from "echarts";

const chartRef = ref(null); // 引用图表 DOM
let chartInstance = null;

// 数据和图表配置
const categories = [
  "Brassica_carinata.10167_V1",
  "Brassica_carinata.Gomenzer",
  "Brassica_carinata.ZD_V1",
];
const values = [102123, 133235, 97149];

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);
  const option = {
    title: {
      text: "Number of Genes in Genome",
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
      },
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
        lineStyle: { type: "dashed", color: "#ddd" },
      },
    },
    yAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        fontSize: 14,
        color: "#333",
        formatter: (value) =>
            value.length > 20 ? `${value.slice(0, 20)}...` : value, // 长标签截断
      },
    },
    series: [
      {
        name: "Genome Count",
        type: "bar",
        data: values,
        barWidth: "50%",
        itemStyle: {
          color: (params) => {
            const colors = ["#4B8BBE", "#306998", "#FFE873"];
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

  // 添加窗口大小变化监听，实现响应式
  window.addEventListener("resize", resizeChart);
};

// 图表自适应
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 页面挂载时初始化图表
onMounted(() => {
  nextTick(initChart);
});

// 页面卸载时清理事件监听器
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
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 卡片式布局 */
.el-card {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 250px;
}

/* 搜索板块样式 */
.search-card {
  padding: 20px;
}

.search-card {
  max-width: 100%;
  padding: 5px;
  background: linear-gradient(135deg, #eef2f6, #f8fbff);
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}


.search-card .el-button {
  border-radius: 8px;
  background-color: #42b983;
  border: none;
  color: white;
}

.search-card .el-button:hover {
  background-color: #38a070;
}

/* 图表卡片样式 */
.bar-chart-card {
  padding: 20px;
}

/* 图表的样式 */
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

  .el-card {
    padding: 15px;
  }
}
</style>
