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

    <!-- 统计部分 -->
    <Statistics />

    <!-- 图表部分 -->
    <div class="charts-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <StatisticsChart :title="'Summary (Genome Distribution)'" :chartOptions="barChartOptions" />
        </el-col>
        <el-col :span="12">
          <StatisticsChart :title="'Summary (Species)'" :chartOptions="pieChartOptions" />
        </el-col>
      </el-row>
    </div>

    <!-- 新的 DisplayCard 组件 -->
    <DisplayCard />

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
import SearchGene from '@/components/SearchGene.vue';
import Statistics from '@/components/home/Statistics.vue';
import StatisticsChart from '@/components/home/StatisticsChart.vue';

const barChartOptions = ref({});
const pieChartOptions = ref({});

const fetchData = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/homeboard/');
    const data = response.data;

    // 柱状图配置
    barChartOptions.value = {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: Object.keys(data.biosample_bar),
        axisLabel: {
          interval: 0,  // 显示所有标签
          rotate: 40,   // 标签旋转角度
          margin: 4     // 标签与轴线的距离
        }
      },
      yAxis: { type: 'value' },
      color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'],
      series: [{
        data: Object.values(data.biosample_bar),
        type: 'bar',
        itemStyle: {
          color: function(params) {
            return barChartOptions.value.color[params.dataIndex % barChartOptions.value.color.length];
          }
        },
        barWidth: '50%'
      }]
    };

    // 饼图配置
    pieChartOptions.value = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(50, 50, 50, 0.7)',
        textStyle: { color: '#fff' }
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: { color: '#333', fontSize: 14 }
      },
      series: [
        {
          name: 'Genomes',
          type: 'pie',
          radius: ['40%', '70%'], // 内外半径
          center: ['50%', '60%'], // 调整饼图位置
          avoidLabelOverlap: false,
          label: { show: false, position: 'center' },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              formatter: '{b}\n{d}%'
            },
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: { show: false },
          data: Object.entries(data.genome_pie).map(([name, value]) => ({ value, name })),
          itemStyle: {
            normal: {
              color: function(params) {
                const colorList = [
                  '#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'
                ];
                return colorList[params.dataIndex % colorList.length];
              },
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
/* 面包屑导航 */
.breadcrumb-container {
  padding: 16px 0;
  border-bottom: 2px solid #42b983; /* 使用主题色作为底边 */
  background-color: #ffffff;
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





/* 图表容器 */
.charts-container {
  margin: 40px 0;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 柔和阴影 */
}


</style>
