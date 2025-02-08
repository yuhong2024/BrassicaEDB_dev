<template>
  <div class="container">
    <!-- 引入的 BR.vue 组件替换面包屑导航栏与介绍部分 -->
    <BR />
    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="chart-card bar-chart-card">
      <v-chart :option="horizontalBarChartOptions" class="v-chart" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import BR from "@/components/genefeature/Title/BR.vue"; // 引入新的 BR.vue 组件
import * as echarts from "echarts";

// 横向柱状图配置
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_rapa.Chiifu.V4",
    "Brassica_rapa.NHCC001",
    "Brassica_rapa.PC_fu",
    "Brassica_rapa.XQC",
    "Brassica_rapa.Z1_V2",
    "Brassica_rapa.ZYCX"
  ];

  const values = [47531, 48158, 52511, 47570, 56073, 45363];

  horizontalBarChartOptions.value = {
    title: {
      text: "Number of Genes in Genome", // 标题居中
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
        fontSize: 14,
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
            const colors = ["#43978F", "#9EC4BE", "#ABDOF1", "#DCE9F4", "#E56F5E", "#F19685"];
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
      left: "15%",
      right: "10%",
      bottom: "10%",
      top: "20%",
      containLabel: true,
    },
    responsive: true, // 响应式支持
  };
};

onMounted(drawBarChart);
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
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-chart {
  width: 100%;
  height: 500px;
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
