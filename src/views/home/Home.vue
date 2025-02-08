<template>
  <div class="home">
        <!-- 介绍部分 -->
    <IntroText />

    <!-- 搜索部分卡片式布局 -->
    <el-card shadow="hover" class="search-card">
      <SearchGene />
    </el-card>

    <!-- 轮播图 -->
    <div class="carousel-container">
      <Carousel />
    </div>


    <el-card class="summary">
    <!-- 统计部分 -->
    <Statistics />
    </el-card>

    <!-- 图表部分 -->
    <div class="charts-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <StatisticsChart :title="'Transcriptome Sample'" :chartOptions="barChartOptions" />
        </el-col>
        <el-col :span="12">
          <StatisticsChart :title="'Genome Collection'" :chartOptions="pieChartOptions" />
        </el-col>
      </el-row>
    </div>

    <!-- DisplayCard 组件 -->
    <DisplayCard />

    <el-card class="about">
      <About />
    </el-card>

    <el-card class="news">
      <News />
    </el-card>


    <!-- 返回顶部按钮 -->
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DisplayCard from '@/components/home/DisplayCard.vue';
import IntroText from '@/components/home/IntroText.vue';
import Carousel from '@/components/home/Carousel.vue';
import SearchGene from '@/components/genefeature/SearchGene.vue';
import Statistics from '@/components/home/Statistics.vue';
import StatisticsChart from '@/components/home/StatisticsChart.vue';

//更新
import About from '@/components/home/About.vue';
import News from '@/components/home/News.vue';

// 用来存储柱状图和饼图的配置
const barChartOptions = ref({});
const pieChartOptions = ref({});



const speciesColorMap = {
  "Brassica carinata": "#5C7BD9",
  "Brassica juncea": "#9FE080",
  "Brassica napus": "#FFDC60",
  "Brassica nigra": "#FF7070",
  "Brassica oleracea": "#7ED3F4",
  "Brassica rapa": "#40B27D",
};





// 请求数据的函数
const fetchData = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/homeboard/');
    const data = response.data;

    // 处理柱状图的数据 (summary_transcriptom)
    const summaryData = data.summary_transcriptom;
    const barLabels = Object.keys(summaryData);
    const barValues = Object.values(summaryData);

    // 设置柱状图的配置
    barChartOptions.value = {
      tooltip: { trigger: 'axis',
        formatter: function (params) {
          // 遍历每个柱子的数据，设置为斜体
          return params.map(item => `<span style="font-style: italic;">${item.name}</span>: ${item.value}`).join('<br/>');
        },
        textStyle: {
          fontSize: 16, // 调整 tooltip 字体大小
        },
      },
      xAxis: {
        type: 'category',
        data: barLabels,
        axisLabel: {
          rotate: 27,  // 旋转标签，避免重叠
          textStyle: {
            fontSize: 16, // 调整 x 轴标签字体大小
            fontStyle: 'italic', // 设置字体为斜体
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize: 16, // 调整 y 轴标签字体大小
          },
        },
      },

      series: [{
        data: barValues.map((value, index) => ({
          value,
          itemStyle: {
            color: speciesColorMap[barLabels[index]], // 根据物种名称设置颜色
          },
        })),
        type: 'bar',
        barWidth: '50%',  // 设置柱子宽度
      }]
    };

    // 处理饼图的数据 (genome_pie)
    const genomeData = data.genome_pie;
    const pieData = Object.keys(genomeData).map(key => ({
      name: key,
      value: genomeData[key],
      itemStyle: {
        color: speciesColorMap[key], // 根据物种名称设置颜色
      },
    }));

    // 设置饼图的配置
    pieChartOptions.value = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `<span style="font-style: italic;">${params.name}</span>: ${params.value} (${params.percent}%)`;
        },
        textStyle: {
          fontSize: 16, // 调整 tooltip 字体大小
        },
      },
      legend: {
        show: false, // 隐藏图例
        type: 'plain', // 使用普通图例
        orient: 'horizontal', // 水平布局
        bottom: 0, // 放置在下方
        align: 'auto', // 自动对齐
        itemGap: 10, // 图例项之间的间距
        textStyle: {
          fontSize: 16, // 图例字体大小
        },
        formatter: function (name) {
          return name; // 可添加更多自定义逻辑
        },
        width: '98%', // 限制图例宽度
      },


      grid: {
        bottom: '10%', // 控制图例与饼图的距离
      },
      series: [
        {
          name: 'Genome Pie',
          type: 'pie',
          radius: '80%',
          startAngle: 30, // 设置饼图起始角度
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: '{name|{b}}', // 使用 rich 样式名
            rich: {
              name: {
                fontStyle: 'italic', // 设置斜体
                fontSize: 16, // 设置字体大小
              },
            },
            textStyle: {
              fontSize: 16, // 调整饼图标签字体大小
            },
          },
        },
      ],
    };


  } catch (error) {
    console.error("数据请求失败:", error);
    // 你可以添加一个状态来显示错误消息
  }
};

// 在组件挂载时自动获取数据
onMounted(() => {
  fetchData();
});
</script>


<style scoped>


/* 面包屑导航 */
.breadcrumb-container {
  padding: 16px 0;
  border-bottom: 2px solid #42b983; /* 使用主题色作为底边 */
  background-color: #ffffff;
}

.summary
{
  background: linear-gradient(135deg, #B4EDAB, #6ADC88); /* 渐变背景 */

}

/* 轮播图容器 */
.carousel-container {
  margin: 25px 0;
}


/* 搜索容器 */
.search-container {
  margin: 15px 0; /* 减少容器的上下外边距 */
}

/* 搜索卡片 */
.search-card {
  margin-bottom: 10px; /* 缩小卡片的底部间距 */
  padding: 15px; /* 缩小卡片内部的上下边距 */
  border-radius: 12px; /* 保持圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加柔和阴影效果 */
  background: linear-gradient(135deg, #42b983, #8fd3f4); /* 渐变背景 */
  transition: transform 0.3s ease; /* 悬停效果 */
}

.search-card:hover {
  transform: translateY(-3px); /* 调整悬停时的上移效果，使之更轻微 */
}

.dataline
{
  margin: 10px 0;
}

/* 图表容器 */
.charts-container {
  margin: 40px 0;
  text-align: center; /* 居中对齐 */
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 柔和阴影 */
}


</style>

