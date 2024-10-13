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

const pageTitle = 'Tools';

const tools = [
  { title: 'Blast', description: 'A tool for comparing an input nucleotide or protein sequence to a database of sequences and identifying regions of similarity.', image: imageBlast, path: '/tools/blast' },
  { title: 'Jbrowse', description: 'A fast, embeddable genome browser built with JavaScript and HTML5.', image: imageJbrowse, path: '/tools/jbrowse' },
  { title: 'Primer', description: 'A tool for designing primers for PCR amplification.', image: imagePrimer, path: '/tools/primer' },
  { title: 'GO enrichment', description: 'A tool for analyzing GO enrichment.', image: imageGo, path: '/tools/co-expression' },
  { title: 'Seq-fetch', description: 'A tool for fetching sequences from a database.', image: imageSeqfetch, path: '/tools/seq-fetch' },
  { title: 'KEGG enrichment', description: 'A tool for analyzing KEGG pathway enrichment.', image: imageKegg, path: '/tools/kegg-enrichment' },
  { title: 'eFP-seq', description: 'A tool for visualizing RNA-seq data.', image: imageEfp, path: '/tools/efp-seq' },
  { title: 'HMMER', description: 'A tool for searching sequence databases for sequence homologs, and for making sequence alignments.', image: imageEfp, path: '/tools/hmmer' }
];
</script>

<style scoped>
/* Global page styles */
.tools-page {
  padding: 40px;
  background-color: #f8fafc; /* Light background for contrast */
}

/* Title styling */
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Card styling */
.tool-card {
  display: flex;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 220px;
  border-radius: 15px;
  border: none;
  background-color: #ffffff; /* White card for clarity */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin-bottom: 30px;
}

.tool-card:hover {
  transform: translateY(-10px); /* Lift effect on hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
}

/* Image styling */
.tool-image {
  width: 100%;
  height: auto;
  border-radius: 12px; /* Smooth round corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle image shadow */
}

/* Content styling */
.tool-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
}

/* Title styling */
.tool-title {
  font-size: 1.5rem;
  margin: 0 0 10px;
  color: #2c9c69;
  font-weight: bold;
}

/* Description styling */
.tool-description {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .tool-card {
    height: auto;
    padding: 15px;
  }
  .tool-title {
    font-size: 1.25rem;
  }
}
</style>
