<template>
  <div class="container">
    <!-- 引入的 BO.vue 替换面包屑导航栏和介绍部分 -->
    <BO />


    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="bar-chart-card">
      <v-chart :option="horizontalBarChartOptions" class="v-chart" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchGene from "@/components/genefeature/search/BO.vue";
import BO from "@/components/genefeature/Title/BO.vue"; // 引入 BO.vue 组件
import * as echarts from "echarts";

// 横向柱状图配置
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_oleracea.D134",
    "Brassica_oleracea.HDEM",
    "Brassica_oleracea.JZS_V2",
    "Brassica_oleracea.Korso",
    "Brassica_oleracea.OX_heart",
    "Brassica_oleracea.TO1000",
  ];

  const values = [43853, 61279, 59064, 60640, 62232, 59225];

  horizontalBarChartOptions.value = {
    title: {
      text: "Number of Genes in Genome", // 居中标题
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
        formatter: (value) => value, // 确保标签完整显示
      },
    },
    series: [
      {
        name: "Genome Count",
        type: "bar",
        data: values,
        barWidth: "60%",
        itemStyle: {
          color: function (params) {
            const colors = [
              "#43978F", // 深绿色
              "#9EC4BE", // 绿青色
              "#E56F5E", // 淡红色
              "#F19685", // 橙红色
              "#F6C957", // 黄色
              "#FFB77F", // 淡橙色
            ];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [4, 4, 0, 0], // 添加圆角
        },
        label: {
          show: true,
          position: "right",
          fontSize: 12,
          color: "#333",
        },
      },
    ],
    grid: {
      left: "12%", // 调整边距
      right: "8%",
      bottom: "15%",
      top: "20%",
      containLabel: true, // 确保标签正常显示
    },
  };
};

// 渲染图表
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
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-chart {
  width: 100%;
  height: 500px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .el-card {
    padding: 15px;
  }

  .v-chart {
    height: 400px; /* 小屏幕下缩小图表高度 */
  }
}
</style>
