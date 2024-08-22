<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader :title="pageTitle" :breadcrumbs="breadcrumbs" />

    <!-- Analysis Sections -->
    <el-row :gutter="20">
      <el-col v-for="analysisItem in analysisItems" :key="analysisItem.name" :span="24">
        <el-card shadow="hover" class="analysis-card">
          <el-row>
            <el-col :span="8">
              <el-carousel :interval="5000" height="250px" arrow="always">
                <el-carousel-item v-for="(image, index) in analysisItem.images" :key="index">
                  <img :src="image" alt="Analysis Image" class="analysis-image" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="16" class="analysis-content">
              <h3 class="analysis-title">{{ analysisItem.name }}</h3>
              <p>{{ analysisItem.description }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';

const pageTitle = 'Analysis';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Analysis', path: '/search' },
];

import CoImage from '@/assets/img/analysis/Co.svg';
import GeneImage from '@/assets/img/analysis/Gene.svg';
import HomImage from '@/assets/img/analysis/Hom.svg';
import TFImage from '@/assets/img/analysis/TF.svg';
import TranscriptImage from '@/assets/img/analysis/Transcript.svg';

const analysisItems = [
  {
    name: 'Co-expression Network Module',
    images: [CoImage, CoImage, CoImage],
    description: 'Weighted Gene Co-expression Network Analysis (WGCNA) is a systems biology method for identifying co-expression relationships and modules between genes. This approach is often used to reveal underlying structures in gene expression data and to identify gene modules associated with specific phenotypes. The strength of WGCNA is its ability to process high-dimensional data and to reveal complex relationships between genes by building weighted networks. It also helps organize large-scale genetic data into actionable modules, further search and verification can help researchers deeply understand the relationship between genes and phenotypes, researchers find patterns in complex genomic data, understand biological mechanisms, and provide valuable clues for subsequent experimental research.'
  },
  {
    name: 'TF Regulatory Network Module',
    images: [TFImage, TFImage, TFImage],
    description: 'Transcription factors are proteins that can bind to specific sequences of DNA to regulate the transcriptional activity of genes. They usually do this by binding to DNA, interacting with other transcription factors or core transcription mechanisms. Transcription factor regulatory networks are concerned with how transcription factors regulate the transcription process of genes, thereby affecting the function and properties of cells. These networks are composed of transcription factors, target genes and their interactions, which can regulate gene expression in cells under different environmental conditions. The transcriptional factor regulatory network plays an equally important role in plant growth and development, environmental adaptation and evolution, and its research is of great significance for improving crop performance, coping with environmental changes and promoting sustainable agricultural development.'
  },
  {
    name: 'Alternative Splicing Module',
    images: [GeneImage, GeneImage, GeneImage],
    description: 'Alternative Splicing is an important process in gene expression regulation, which allows the same gene to produce multiple different mRNA transcripts through different splicing methods, thus encoding different proteins. This process greatly increases the complexity of the genome and the diversity of proteins. After mRNA transcription, introns (introns) are removed and exons (exons) are connected to form mature mRNA. Variable splicing is the process in which different mRNA variants are produced by selecting different exons or introns. In plants, alternative splicing also plays an important role and, similar to animals, plays a key role in regulating gene expression and function. Variable splicing in plants not only increases the complexity of the genome, but also provides flexible regulatory mechanisms for plants under complex environmental conditions, helping them adapt to various growth and development environments.'
  },
  {
    name: 'Homologous Genes Module',
    images: [HomImage, HomImage, HomImage],
    description: 'Homologous genes are genes that have similar sequences and functions in different species, derived from their common ancestral genes. They can be traced back to a common ancestral gene, with distinct genes formed through species differentiation or gene duplication events during evolution. The study of homologous genes is of great significance for understanding gene function, genome evolution and genetic relationships among species. By comparing homologous genes in different species, scientists can infer the origin and evolution of these genes and reveal their function in the organism.'
  },
  {
    name: 'Transcriptional Expression Module',
    images: [TranscriptImage, TranscriptImage, TranscriptImage],
    description: 'Rna-seq (RNA sequencing) is a high-throughput sequencing technique for studying gene transcription expression, identifying changes in gene expression, and exploring the complexity of the transcriptome. RNA-seq provides comprehensive transcriptome data, including the expression of known genes and the discovery of new transcripts. It has been widely used in gene function research, disease mechanism exploration and drug research and development. With RNA-seq, you can obtain the amount of gene expression under different conditions and explain the relationship between the expressed gene and experimental conditions or biological phenomena, which is very important for understanding gene function and regulation.'
  }
];

</script>

<style scoped>
.container {
  width: 90vw;
  max-width: 1200px; /* 控制最大宽度 */
  margin: 0 auto;    /* 居中显示 */
}

.analysis-card {
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
}

.analysis-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保图片在卡片内完整显示 */
  object-position: center; /* 图片居中 */
}

.analysis-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
}

.analysis-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.analysis-content p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}
</style>
