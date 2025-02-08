<template>
  <div class="container">
    <!-- 引入的 BNP.vue 组件替换面包屑导航栏和介绍部分 -->
    <BNP />



    <!-- 横向柱状图 -->
    <el-card shadow="hover" class="bar-chart-card">
      <v-chart :option="horizontalBarChartOptions" class="v-chart" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import BNP from '@/components/genefeature/Title/BNP.vue'; // 引入 BNP.vue 组件
import * as echarts from 'echarts';

// 横向柱状图配置
const horizontalBarChartOptions = ref(null);

const drawBarChart = () => {
  const categories = [
    "Brassica_napus.Darmor", "Brassica_napus.Express617", "Brassica_napus.Gangan",
    "Brassica_napus.HTR001", "Brassica_napus.Kale", "Brassica_napus.Laurentian",
    "Brassica_napus.Mendel", "Brassica_napus.No2127", "Brassica_napus.NY7",
    "Brassica_napus.Quinta", "Brassica_napus.Shengli", "Brassica_napus.Westar",
    "Brassica_napus.Zheyou7", "Brassica_napus.ZS11", "Brassica_napus.ZS4_2",
    "Brassica_napus.ZS9", "Brassica_napus.ZY821"
  ];

  const values = [
    101040, 99481, 96843, 105435, 106075, 101471, 107468, 95385,
    104179, 95492, 94586, 97514, 96209, 100919, 103429, 102501, 86469
  ];

  horizontalBarChartOptions.value = {
    title: {
      text: "Number of Genes in Genome",
      left: "center",
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    xAxis: {
      type: "value",
      nameLocation: "center",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#666"
      },
      axisLabel: { fontSize: 12, color: "#666" },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed", color: "#ddd" }
      }
    },
    yAxis: {
      type: "category",
      data: categories,
      axisLabel: { fontSize: 12, color: "#333" }
    },
    series: [
      {
        name: "Count",
        type: "bar",
        data: values,
        barWidth: "50%",
        itemStyle: {
          color: function (params) {
            const colors = ["#43978F", "#9EC4BE", "#ABD0F1", "#E56F5E", "#F6C957", "#FBE8D5"];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ],
    grid: {
      left: "10%",
      right: "5%",
      bottom: "15%",
      top: "20%",
      containLabel: true
    }
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

  .v-chart {
    height: 400px;
  }
}
</style>
