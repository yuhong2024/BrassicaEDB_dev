<template>
  <!-- 页面整体容器 -->
  <div class="analysis-page">
    <!-- 标题 -->
    <h2 class="page-title">Analysis</h2>

    <!-- 分析项卡片布局 -->
    <div class="analysis-section">
      <el-row :gutter="20" justify="center">
        <!-- GO 组件 -->
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" class="analysis-card" @click="goToPage('go')">
            <div class="card-content">
              <!-- 图片 -->
              <img :src="imageGo" alt="Go Analysis" class="analysis-image" />
              <!-- 文字内容 -->
              <div class="card-text">
                <h3 class="analysis-title">GO Analysis</h3>
                <p class="analysis-description">Gene Ontology analysis description.</p>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- KEGG Enrichment 组件 -->
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" class="analysis-card" @click="goToPage('KEGGEnrichment')">
            <div class="card-content">
              <img :src="imageKegg" alt="KEGG Enrichment" class="analysis-image" />
              <div class="card-text">
                <h3 class="analysis-title">KEGG Enrichment</h3>
                <p class="analysis-description">KEGG pathway enrichment analysis.</p>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- DESeq2 组件 -->
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" class="analysis-card" @click="goToPage('deseq')">
            <div class="card-content">
              <img :src="imageDeseq" alt="DESeq2 Analysis" class="analysis-image" />
              <div class="card-text">
                <h3 class="analysis-title">DESeq2 Analysis</h3>
                <p class="analysis-description">Differential gene expression analysis.</p>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- WGCNA 组件 -->
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" class="analysis-card" @click="goToPage('wgcna')">
            <div class="card-content">
              <img :src="imageWgcna" alt="WGCNA Analysis" class="analysis-image" />
              <div class="card-text">
                <h3 class="analysis-title">WGCNA Analysis</h3>
                <p class="analysis-description">Weighted Gene Co-expression Network.</p>
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

// 引入图片资源
import imageGo from '@/assets/img/home/tools/go.png';
import imageKegg from '@/assets/img/home/tools/kegg.png';
import imageDeseq from '@/assets/img/home/tools/go.png';
import imageWgcna from '@/assets/img/home/tools/kegg.png';

// 路由跳转
const router = useRouter();
const goToPage = (path) => {
  router.push(`/analysis/${path}`);
};
</script>


<style scoped>
.analysis-page {
  padding: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.analysis-section {
  margin-top: 20px;
}

.analysis-card {
  transition: transform 0.3s ease;
}

.analysis-card:hover {
  transform: scale(1.05);
}

.analysis-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.card-text {
  padding: 15px;
  text-align: center;
}

.analysis-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.analysis-description {
  color: #7f8c8d;
  font-size: 14px;
}

.el-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.el-col {
  padding: 10px;
}
</style>





