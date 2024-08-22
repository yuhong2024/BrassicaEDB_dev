<template>
  <div class="tools-page">
    <h2 class="page-title">BEDB Tools</h2>
    <el-row :gutter="20">
      <el-col v-for="tool in tools" :key="tool.title" :span="8">
        <el-card shadow="hover" class="tool-card">
          <el-row>
            <el-col :span="8">
              <img :src="tool.image" alt="Tool Image" class="tool-image" />
            </el-col>
            <el-col :span="16" class="tool-content">
              <h3 class="tool-title">{{ tool.title }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import imageBlast from '@/assets/img/home/tools/blast.png';
import imageEfp from '@/assets/img/home/tools/efp.png';
import imageGo from '@/assets/img/home/tools/go.png';
import imageJbrowse from '@/assets/img/home/tools/jbrowse.png';
import imageKegg from '@/assets/img/home/tools/kegg.png';
import imagePrimer from '@/assets/img/home/tools/primer.png';
import imageSeqfetch from '@/assets/img/home/tools/seqfetch.png';

const tools = [
  { title: 'Blast', description: 'A tool for comparing an input nucleotide or protein sequence to a database of sequences and identifying regions of similarity.', image: imageBlast, path: '/tools/blast' },
  { title: 'Jbrowse', description: 'A fast, embeddable genome browser built with JavaScript and HTML5.', image: imageJbrowse, path: '/tools/jbrowse' },
  { title: 'Primer', description: 'A tool for designing primers for PCR amplification.', image: imagePrimer, path: '/tools/primer' },
  { title: 'eFP-seq', description: 'A tool for visualizing RNA-seq data.', image: imageEfp, path: '/tools/efp-seq' },
  { title: 'Co-expression', description: 'A tool for analyzing gene co-expression.', image: imageGo, path: '/tools/co-expression' },
  { title: 'Seq-fetch', description: 'A tool for fetching sequences from a database.', image: imageSeqfetch, path: '/tools/seq-fetch' },
  { title: 'KEGG enrichment', description: 'A tool for analyzing KEGG pathway enrichment.', image: imageKegg, path: '/tools/kegg-enrichment' }
];
</script>

<style scoped>
.tools-page {
  padding: 40px;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.tool-card {
  display: flex;
  padding: 20px;
  transition: transform 0.3s;
  height: 200px;
  border: 2px solid #ccc; /* 加粗边框 */
  margin-bottom: 20px; /* 增加上下间隔 */
}

.tool-card:hover {
  transform: translateY(-5px);
}

.tool-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.tool-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
}

.tool-title {
  font-size: 1.25rem;
  margin: 0 0 10px;
  color: #333;
}

.tool-description {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
