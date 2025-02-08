<template>
  <!-- 页面整体容器 -->
  <div class="container">
    <!-- 标题 -->
    <h1 class="page-title">BEDB Tools</h1>

    <!-- 工具卡片布局 -->
    <div class="tools-section">
      <el-row :gutter="20" justify="center">
        <el-col
            v-for="tool in tools"
            :key="tool.title"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
        >
          <el-card shadow="hover" class="tool-card" @click="goToPage(tool.path)">
            <div class="card-content">
              <!-- 图片 -->
              <img :src="tool.image" alt="Tool Image" class="tool-image" />
              <!-- 文字内容 -->
              <div class="card-text">
                <h3 class="tool-title">{{ tool.title }}</h3>
                <p>{{ tool.description }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 路由跳转函数
const router = useRouter();
const goToPage = (route) => {
  router.push(route);
};

// 图片导入
import imageBlast from '@/assets/img/home/tools/blast.png';
import imageGo from '@/assets/img/home/tools/go.png';
import imageJbrowse from '@/assets/img/home/tools/jbrowse.png';
import imageKegg from '@/assets/img/home/tools/kegg.png';
import imagePrimer from '@/assets/img/home/tools/primer.png';
import imageSeqfetch from '@/assets/img/home/tools/seqfetch.png';

// 工具数据
const tools = [
  {
    title: 'Blast',
    description: 'A tool for comparing an input nucleotide or protein sequence.',
    image: imageBlast,
    path: '/tools/blast',
  },
  {
    title: 'Jbrowse',
    description: 'A fast, embeddable genome browser built with JavaScript and HTML5.',
    image: imageJbrowse,
    path: '/tools/jbrowse',
  },
  {
    title: 'Primer',
    description: 'A tool for designing primers for PCR amplification.',
    image: imagePrimer,
    path: '/tools/qprimer',
  },
  {
    title: 'GO enrichment',
    description: 'A tool for analyzing GO enrichment.',
    image: imageGo,
    path: '/tools/go',
  },
  {
    title: 'Seq-fetch',
    description: 'A tool for fetching sequences from a database.',
    image: imageSeqfetch,
    path: '/tools/seqfetch',
  },
  {
    title: 'KEGG enrichment',
    description: 'A tool for analyzing KEGG pathway enrichment.',
    image: imageKegg,
    path: '/tools/kegg',
  },
];
</script>

<style scoped>
/* 页面背景样式 */
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); /* 渐变背景色 */
  box-sizing: border-box;
  border-radius: 12px;
}

/* 页面标题 */
.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
  font-weight: bold;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
}

/* 卡片外观 */
.tool-card {
  display: flex;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 12px;
  height: 180px;
  cursor: pointer;
  margin-bottom: 20px;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* 卡片内容 */
.card-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
}

/* 图片样式 */
.tool-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  transition: transform 0.3s;
}

.tool-card:hover .tool-image {
  transform: scale(1.1);
}

/* 卡片文字内容 */
.card-text {
  text-align: left;
}

.tool-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.card-text p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}
</style>
