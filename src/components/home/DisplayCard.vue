<template>
  <div class="display-card-container">
    <el-card v-for="(section, index) in sections" :key="index" class="section-card">
      <h2>
        <router-link :to="section.titleLink" class="section-title">{{ section.title }}</router-link>
      </h2>
      <div class="section-items">
        <el-card v-for="(item, itemIndex) in section.items" :key="itemIndex" class="item-card" shadow="never">
          <div class="item-content">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="text-content">
              <h3>
                <router-link :to="item.path" class="item-title">{{ item.name }}</router-link>
              </h3>
              <p>
                {{ item.description }}
                <router-link :to="item.path" class="browse-link">
                  <el-icon><ArrowRight /></el-icon>Browse
                </router-link>
              </p>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';

// 引入图片资源
import image1 from '@/assets/img/home/genefeature/B1.svg';
import image2 from '@/assets/img/home/genefeature/B2.svg';
import image3 from '@/assets/img/home/genefeature/B3.svg';
import image4 from '@/assets/img/home/genefeature/B4.svg';
import image5 from '@/assets/img/home/genefeature/B5.svg';
import image6 from '@/assets/img/home/genefeature/B6.svg';

import imageCo from '@/assets/img/home/search/Co.svg';
import imageGene from '@/assets/img/home/search/Gene.svg';
import imageHom from '@/assets/img/home/search/Hom.svg';
import imageTF from '@/assets/img/home/search/TF.svg';
import imageTr from '@/assets/img/home/search/Transcript.svg';

import imageBlast from '@/assets/img/home/tools/blast.png';
import imageGo from '@/assets/img/home/tools/go.png';
import imageJbrowse from '@/assets/img/home/tools/jbrowse.png';
import imageKegg from '@/assets/img/home/tools/kegg.png';
import imagePrimer from '@/assets/img/home/tools/primer.png';
import imageSeqfetch from '@/assets/img/home/tools/seqfetch.png';


import imageGD from '@/assets/img/home/analysis/Genetic_differences_between_species.svg';
import imageICE from '@/assets/img/home/analysis/Interspecies_co-expression.svg';
import imageRNP from '@/assets/img/home/analysis/Regulatory_network_prediction.svg';






// 定义 sections 数据
const sections = ref([
  {
    title: 'Brassica Features',
    titleLink: '/genefeature',
    items: [
      {
        name: 'Brassica carinata',
        description: 'BBCC (2n=34), An ancient crop, which has remarkable ability to resist stress.',
        image: image1,
        path: '/genefeature/brassicacarinata',
      },
      {
        name: 'Brassica juncea',
        description: 'AABB (2n=36), Type specimens were collected from Asia, an specialty vegetable of China.',
        image: image2,
        path: '/genefeature/juncea',
      },
      {
        name: 'Brassica napus',
        description: 'AACC (2n=38), An important oil crop, origined from Brassica rapa and Brassica oleracea about 7500 years ago.',
        image: image3,
        path: '/genefeature/napus',
      },
      {
        name: 'Brassica nigra',
        description: 'BB (2n=16), Cultivated for its dark brown to black seeds, often used as a spice.' ,
        image: image4,
        path: '/genefeature/nigra',
      },
      {
        name: 'Brassica oleracea',
        description: 'CC (2n=18), Which is named because it can make blue indigo dye.',
        image: image5,
        path: '/genefeature/oleracea',
      },
      {
        name: 'Brassica rapa',
        description: 'AA (2n=20), Originating in northern China, it was introduced to Japan, Europe in the 19th century.',
        image: image6,
        path: '/genefeature/rapa',
      },
    ],
  },








  {
    title: 'BEDB Search',
    titleLink: '/search',
    items: [
      {
        name: 'Gene Feature',
        description: 'Gene expression in transcriptome data of six species of Brassica.',
        image: image4,
        path: '/genefeature',
      },


      {

        name: 'Co-expression Network',
        description: 'Analysis of coexpression networks in six species of Brassica.',
        image: imageCo,
        path: '/search/co-expression',
      },
      {
        name: 'TF Regulatory Network',
        description: 'Transcription factor regulatory network of six species of Brassica ',
        image: imageTF,
        path: '/search/tf',
      },
      {
        name: 'Alternative Splicing',
        description: 'The analysis of five variable splicing events in six species of Brassica.',
        image: imageTr,
        path: '/search/alternative-splicing',
      },
      {
        name: 'Homologous Genes',
        description: 'Interspecific homologous gene in six species species of Brassica.',
        image: imageHom,
        path: '/search/homologous-gene',
      },


      {
        name: 'Transcriptional Expression',
        description: 'Gene expression in transcriptome data of six species of Brassica.',
        image: imageGene,
        path: '/search/transcriptional-expression',
      },





    ],
  },



  {
    title: 'BEDB Tools',
    titleLink: '/tools',
    items: [
      {
        name: 'Blast',
        description: 'A tool for comparing an input nucleotide or protein sequence to a database of sequences and identifying regions of similarity.',
        image: imageBlast,
        path: '/tools/blast',
      },
      {
        name: 'Jbrowse',
        description: 'A fast, embeddable genome browser built with JavaScript and HTML5.',
        image: imageJbrowse,
        path: '/tools/jbrowse',
      },
      {
        name: 'Primer',
        description: 'A tool for designing primers for PCR amplification.',
        image: imagePrimer,
        path: '/tools/primer',
      },
      {
        name: 'Go enrichment',
        description: 'A tool for analyzing Go .',
        image: imageGo,
        path: '/tools/co-expression',
      },
      {
        name: 'Seq-fetch',
        description: 'A tool for fetching sequences from a database.',
        image: imageSeqfetch,
        path: '/tools/seq-fetch',
      },
      {
        name: 'KEGG enrichment',
        description: 'A tool for analyzing KEGG pathway enrichment.',
        image: imageKegg,
        path: '/tools/kegg-enrichment',
      },
    ],
  },


  {
    title: 'BEDB Analysis',
    titleLink: '/analysis',
    items: [
      {
        name: 'Regulatory network prediction',
        description: 'Transcriptome expression data were submitted to identify transcription factors and target genes, and to predict regulatory networks.',
        image: imageGD,
        path: '/search/co-expression',
      },
      {
        name: 'Genetic differences between species',
        description: 'The differentially expressed genes of Orthologous gene were analyzed by the submitted transcriptome expression data. ',
        image: imageICE,
        path: '/search/tf',
      },
      {
        name: 'Interspecies co-expression',
        description: 'The transcriptome expression data submitted were used to analyze the co-expression regulatory network of Orthologous gene between species.',
        image: imageRNP,
        path: '/search/alternative-splicing',
      },


    ],
  },
]);


</script>


<style scoped>
.display-card-container {
  margin-bottom: 30px;
}

/* 居中标题并去掉下划线 */
.section-title {
  font-size: 2rem;
  color: #333;
  text-align: center; /* 标题居中 */
  margin-bottom: 20px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  text-decoration: none; /* 去掉下划线 */
  transition: color 0.3s ease;
}

.section-title:hover {
  color: #42b983; /* 悬停时的颜色变化 */
}

/* 卡片容器样式 */
.section-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

/* 单个卡片的样式 */
.item-card {
  flex: 1 1 calc(30% - 20px);
  max-width: calc(30% - 20px);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 调整内容布局，确保图片和文本居中对齐 */
.item-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 图片样式 */
.item-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  background-color: #eef1f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 文本内容对齐 */
.text-content {
  flex-grow: 1;
  text-align: left;
}

.text-content h3 {
  font-size: 1.4rem;
  margin: 0 0 10px;
  color: #333;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}

/* 卡片标题样式 */
.item-title {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  display: block;
  transition: color 0.3s ease;
}

.item-title:hover {
  color: #42b983;
}

/* 描述文字样式 */
.text-content p {
  font-size: 1rem;
  color: #777;
  line-height: 1.6;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}

/* 链接样式 */
.browse-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.browse-link:hover {
  color: #333;
}
</style>
