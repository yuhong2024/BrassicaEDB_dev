<template>
  <div class="container">
    <!-- 引入 BNI.vue 组件 -->
    <BNI />


    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="chart-card bar-chart-card">
      <v-chart :option="horizontalBarChartOptions" class="v-chart" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchGene from "@/components/genefeature/search/Nigra.vue";
import BNI from "@/components/genefeature/Title/BNI.vue"; // 引入新的 BNI.vue 组件
import * as echarts from "echarts";

// 横向柱状图配置
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_nigra.C2_V1",
    "Brassica_nigra.NI100_V2",
    "Brassica_nigra.Sangam_V1.1",
    "Brassica_nigra.YZ12151"
  ];

  const values = [67021, 59852, 47953, 47953];

  horizontalBarChartOptions.value = {
    title: {
      text: "Number of Genes in Genome", // 图表标题
      left: "center",
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
            const colors = ["#4B8BBE", "#306998", "#FFE873", "#EE6666"];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [4, 4, 0, 0], // 圆角
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
    responsive: true,
  };
};

onMounted(drawBarChart);
</script>

<style scoped>
/* 主容器样式 */
.container {
  margin-top: 20px;
  width: 100%;
  max-width: 100%;
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

.search-container .el-input {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-container .el-button {
  border-radius: 8px;
  background-color: #42b983;
  border: none;
}

.search-container .el-button:hover {
  background-color: #38a070;
}

/* 横向柱状图样式 */
.bar-chart-card {
  margin-top: 20px;
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

  .el-card {
    padding: 15px;
  }
}
</style>
