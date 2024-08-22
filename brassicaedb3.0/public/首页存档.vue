<template>
  <div class="home">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Home</el-breadcrumb-item>
        <el-breadcrumb-item>BrassicaEDB</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 介绍部分 -->
    <IntroText />

    <!-- 轮播图 -->
    <div class="carousel-container">
      <Carousel />
    </div>

    <!-- 搜索部分卡片式布局 -->
    <el-card shadow="hover" class="search-card">
      <SearchGene />
    </el-card>

    <!-- 统计部分 -->
    <Statistics />

    <!-- 图表部分 -->
    <div class="charts-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <StatisticsChart :title="'Summary (Species)'" :chartOptions="barChartOptions" />
        </el-col>
        <el-col :span="12">
          <StatisticsChart :title="'Summary (Genome Distribution)'" :chartOptions="pieChartOptions" />
        </el-col>
      </el-row>
    </div>

    <!-- 分析、工具、特性部分 -->
    <FeatureSection title="Brassica Features" :titleLink="'/genefeature'" :features="features" />
    <AnalysisSection title="BEDB Analysis" :titleLink="'/search'" :analysisItems="analysis" />
    <ToolSection title="BEDB Tools" :titleLink="'/tools'" :tools="tools" />


    <!-- 内容卡片 -->
    <div class="content-container text-center py-24 px-12">
      <el-row justify="center" type="flex">
        <el-col :span="6">
          <SectionCard title="Gene feature" :items="geneFeatureItems" />
        </el-col>
        <el-col :span="6">
          <SectionCard title="Search" :items="searchItems" />
        </el-col>
        <el-col :span="6">
          <SectionCard title="Tools" :items="toolsItems" />
        </el-col>
        <el-col :span="6">
          <SectionCard title="Download" :items="downloadItems" />
        </el-col>
      </el-row>
    </div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import IntroText from '@/components/home/IntroText.vue';
import Carousel from '@/components/home/Carousel.vue';
import SearchGene from '@/components/SearchGene.vue';
import Statistics from '@/components/home/Statistics.vue';
import StatisticsChart from '@/components/home/StatisticsChart.vue';
import AnalysisSection from '@/components/home/AnalysisSection.vue';
import ToolSection from '@/components/home/ToolSection.vue';
import FeatureSection from '@/components/home/FeatureSection.vue';
import SectionCard from '@/components/home/SectionCard.vue';


//引入genefeature的图片
import image1 from '@/assets/img/home/genefeature/B1.svg'; // 引入图片
import image2 from '@/assets/img/home/genefeature/B2.svg';
import image3 from '@/assets/img/home/genefeature/B3.svg';
import image4 from '@/assets/img/home/genefeature/B4.svg';
import image5 from '@/assets/img/home/genefeature/B5.svg';
import image6 from '@/assets/img/home/genefeature/B6.svg';

import imageCo from '@/assets/img/home/search/Co.svg'; // 引入图片
import imageGene from '@/assets/img/home/search/Gene.svg'; // 引入图片
import imageHom from '@/assets/img/home/search/Hom.svg'; // 引入图片
import imageTF from '@/assets/img/home/search/TF.svg'; // 引入图片
import imageTr from '@/assets/img/home/search/Transcript.svg'; // 引入图片

import imageBlast from '@/assets/img/home/tools/blast.png';
import imageGo from '@/assets/img/home/tools/go.png';
import imageJbrowse from '@/assets/img/home/tools/jbrowse.png';
import imageKegg from '@/assets/img/home/tools/kegg.png';
import imagePrimer from '../../assets/img/home/tools/primer.png';
import imageSeqfetch from '../../assets/img/home/tools/seqfetch.png';

const geneFeatureItems = [
  { name: 'Brassica carinata', path: '/genefeature/brassicacarinata' },
  { name: 'Brassica juncea', path: '/genefeature/juncea' },
  { name: 'Brassica napus', path: '/genefeature/napus' },
  { name: 'Brassica nigra', path: '/genefeature/nigra' },
  { name: 'Brassica oleracea', path: '/genefeature/oleracea' },
  { name: 'Brassica rapa', path: '/genefeature/rapa' }
];

const searchItems = [
  { name: 'Homologous gene', path: '/search/Homologous' },
  { name: 'Expression', path: '/search/Expression' },
  { name: 'Alternative splicing', path: '/search/splicing' },
  { name: 'Co-expression', path: '/search/expression' },
  { name: 'TF', path: '/search/TF' }
];

const toolsItems = [
  { name: 'Blast', path: '/tools/blast' },
  { name: 'Jbrowse', path: '/tools/jbrowse' },
  { name: 'Primer', path: '/tools/primer' },
  { name: 'eFP-seq', path: '/tools/efp-seq' },
  { name: 'Co-expression', path: '/tools/co-expression' },
  { name: 'Seq-fetch', path: '/tools/seq-fetch' },
  { name: 'KEGG enrichment', path: '/tools/kegg-enrichment' }
];

const downloadItems = [
  { name: 'Basic data', path: '/Download/Basicdata' },
  { name: 'Genomic data', path: '/Download/Genomicdata' }
];



const barChartOptions = ref({});
const pieChartOptions = ref({});
const fetchData = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/homeboard/');
    const data = response.data;

    // 更新柱状图配置
    barChartOptions.value = {

      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: Object.keys(data.biosample_bar),
        axisLabel: {
          interval: 0, // 保证显示所有标签
          rotate: 40,  // 旋转标签角度
          margin: 4  // 标签与轴线之间的距离
        }
      },
      yAxis: { type: 'value' },
      series: [{ data: Object.values(data.biosample_bar), type: 'bar' }]
    };

    // 更新饼图配置
    pieChartOptions.value = {

      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Genomes',
          type: 'pie',
          radius: '80%',
          data: Object.entries(data.genome_pie).map(([name, value]) => ({
            value,
            name
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
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



const features = [
  {
    name: 'Brassica carinata',
    description: 'A leafy green vegetable commonly grown in Ethiopia. It belongs to the cruciferous family and is related to mustard.',
    image: image1,
    path: '/genefeature/brassicacarinata'
  },
  {
    name: 'Brassica juncea',
    description: 'A common leafy vegetable belonging to the cruciferous family. It is native to Asia, especially China and India, and has a long history of cultivation.',
    image: image2,
    path: '/genefeature/juncea'
  },
  {
    name: 'Brassica napus',
    description: 'Oil crops mainly used in the production of edible oil. The plant is 60-120 cm tall, with broad leaves and yellow flowers.',
    image: image3,
    path: '/genefeature/napus'
  },
  {
    name: 'Brassica nigra',
    description: 'A plant belonging to the cruciferous family, also known as black mustard. Its seeds are often used to make mustard, a spicy condiment.',
    image: image4,
    path: '/genefeature/nigra'
  },
  {
    name: 'Brassica oleracea',
    description: 'A common leafy green vegetable, also known as cabbage or cabbage heart. The leaves of kale are round and usually form a tight spherical head.',
    image: image5,
    path: '/genefeature/oleracea'
  },
  {
    name: 'Brassica rapa',
    description: 'A common leafy vegetable belonging to the cruciferous family. It is especially popular in China and East Asia.',
    image: image6,
    path: '/genefeature/rapa'
  }
];

const tools = [
  { title: 'Blast', description: 'A tool for comparing an input nucleotide or protein sequence to a database of sequences and identifying regions of similarity.', image: imageBlast, path: '/tools/blast' },
  { title: 'Jbrowse', description: 'A fast, embeddable genome browser built with JavaScript and HTML5.', image: imageJbrowse, path: '/tools/jbrowse' },
  { title: 'Primer', description: 'A tool for designing primers for PCR amplification.', image: imagePrimer, path: '/tools/primer' },
  { title: 'Co-expression', description: 'A tool for analyzing gene co-expression.', image: imageGo, path: '/tools/co-expression' },
  { title: 'Seq-fetch', description: 'A tool for fetching sequences from a database.', image: imageSeqfetch, path: '/tools/seq-fetch' },
  { title: 'KEGG enrichment', description: 'A tool for analyzing KEGG pathway enrichment.', image: imageKegg, path: '/tools/kegg-enrichment' }
];

const analysis = [
  {
    name: 'Co-expression Network',
    description: 'Weighted gene co-expression network search (WGCNA) was used to construct a weighted network to reveal the complex relationships between genes and help understand how genes work together in the network.',
    image: imageCo,
    path: '/search/co-expression'
  },
  {
    name: 'TF Regulatory Network',
    description: 'The transcription factor regulatory network of six species of Brassica was identified and the transcription factor regulatory network of each species was predicted using the transcriptional expression data. The transcriptional factor regulatory network plays an important role in plants and has a key impact on plant growth and development, environmental response and adaptability.',
    image: imageTF,
    path: '/search/tf'
  },
  {
    name: 'Alternative Splicing',
    description: 'The search of five variable splicing events in six species of Brassica shows that alternative splicing in plants not only increases the complexity of the genome, but also provides flexible regulatory mechanisms for plants under complex environmental conditions, helping them adapt to various growth and development environments.',
    image: imageTr,
    path: '/search/alternative-splicing'
  },
  {
    name: 'Homologous Genes',
    description: 'In the six species of Brassica, homologous genes between species are of great significance for understanding gene function, genome evolution and genetic relationships among species.',
    image: imageHom,
    path: '/search/homologous-gene'
  },
  {
    name: 'Transcriptional Expression',
    description: 'Gene expression in transcriptome data of six species of Brassica, interpretation of the relationship between expressed genes and experimental conditions or biological phenomena, search of gene function and regulation.',
    image: imageGene,
    path: '/search/transcriptional-expression'
  }
];
</script>

<style scoped>
/* 面包屑导航 */
.breadcrumb-container {
  padding: 16px 0;
  border-bottom: 2px solid #42b983; /* 主题色作为底边 */
  background-color: #ffffff;
}

/* 轮播图容器 */
.carousel-container {
  margin:25px 0;
}

/* 搜索容器 */
.search-container {
  margin: 30px 0;
}

/* 搜索卡片 */
.search-card {
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 10px; /* 圆角处理 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  background: linear-gradient(135deg, #42b983, #8fd3f4); /* 使用渐变背景 */
}

/* 图表容器 */
.charts-container {
  margin: 2px 0;
}

/* 内容容器 */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
}

/* 全局间距设置 */
.py-24 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.px-12 {
  padding-left: 1rem;
  padding-right: 1rem;
}

/* 文本居中 */
.text-center {
  text-align: center;
}

/* 各部分容器 */
.analysis-section,
.tool-section,
.feature-section {
  background-color: #ffffff; /* 设置为白色背景，保持一致性 */
  padding: 25px;
  border-radius: 10px; /* 圆角处理 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  margin-bottom: 25px;
}

/* 卡片效果 */
.el-card {
  margin-bottom: 25px;
  border-radius: 10px; /* 圆角处理 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 平滑的动画过渡 */
}

.el-card:hover {
  transform: translateY(-8px); /* 卡片悬浮效果 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* 悬浮时的阴影效果 */
}

/* 图表部分优化 */
.charts-container .el-col {
  padding: 0 10px; /* 增加列间距 */
}

/* 主题色的调整 */
body {
  background-color: #f7f7f7;
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.el-menu {
  border-bottom: 2px solid #42b983; /* 使用主题色 */
}

.el-menu-item:hover,
.el-sub-menu__title:hover {
  color: #42b983 !important; /* 鼠标悬浮时的颜色 */
}

.statistics-wrapper {
  margin-bottom: 1px; /* 调整这个值来减少间隔 */
}





</style>


