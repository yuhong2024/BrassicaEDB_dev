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










  {
    title: 'BEDB Search',
    titleLink: '/search',
    items: [
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

      {
        name: 'eFP Module ',
        description: 'Gene expression patterns of six species of Brassica.',
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
        name: 'Co-expression',
        description: 'A tool for analyzing gene co-expression.',
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
]);














</script>

<style scoped>
.display-card-container {
  margin-bottom: 25px;
}

/* 为每个板块增加卡片式布局 */
.section-card {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.section-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.section-title {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 20px;
  display: block;
}

.section-title:hover {
  color: #42b983;
}

.section-items {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
}

.item-card {
  flex: 1 1 calc(30% - 15px);
  max-width: calc(30% - 15px);
  padding: 15px;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
}

.text-content {
  flex-grow: 1;
  text-align: left;
}

.text-content h3 {
  font-size: 1.1rem;
  margin: 0 0 10px;
}

.item-title {
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

.item-title:hover {
  color: #42b983;
}

.text-content p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.browse-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.browse-link:hover {
  color: #333;
}
</style>
