<template>
  <div class="links-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Links</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/more">More</el-breadcrumb-item>
          <el-breadcrumb-item>Links</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- BrassicaSearch Title -->
    <div class="search-title">
      <h1>BrassicaSearch</h1>
    </div>

    <!-- Large Search Box -->
    <div class="search-container">
      <el-input
          v-model="searchQuery"
          placeholder="Search websites..."
          clearable
          prefix-icon="el-icon-search"
          class="large-search-box"
      />
    </div>

    <!-- Links Display -->
    <el-row :gutter="20" class="links-grid">
      <el-col :span="8" v-for="(link, index) in filteredLinks" :key="index">
        <el-card shadow="hover" class="link-card">
          <a :href="link.url" target="_blank">
            <img
                :src="link.favicon"
                :alt="link.title"
                class="link-favicon"
                @error="handleImageError(index)"
            />
          </a>
          <div class="link-info">
            <h3>{{ link.title }}</h3>
            <p><a :href="link.url" target="_blank">{{ link.url }}</a></p>
            <p>{{ link.description }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 网站链接数据
const links = ref([
  {
    title: 'BnIR Database',
    url: 'https://yanglab.hzau.edu.cn/BnIR',
    description: 'A comprehensive database for Brassica napus integrated regulation.',
    favicon: 'https://yanglab.hzau.edu.cn/favicon.ico'
  },
  {
    title: 'iAnimal Database',
    url: 'https://ianimal.pro/index',
    description: 'Explore animal genetic resources and their information.',
    favicon: 'https://ianimal.pro/favicon.ico'
  },
  {
    title: 'QPrimerDB',
    url: 'https://qprimerdb.biodb.org/',
    description: 'A resource for designing quality primers for biological research.',
    favicon: 'https://qprimerdb.biodb.org/favicon.ico'
  },
  {
    title: 'iPlant',
    url: 'http://www.iplant.cn/',
    description: 'Integrated plant database with comprehensive gene function search.',
    favicon: 'http://www.iplant.cn/favicon.ico'
  },
  {
    title: 'Bnapus Database',
    url: 'http://cbi.hzau.edu.cn/bnapus/',
    description: 'Database focusing on Brassica napus research and genomic data.',
    favicon: 'http://cbi.hzau.edu.cn/favicon.ico'
  },
  {
    title: 'Bioinfo Toolkits',
    url: 'https://sgs.bioinfotoolkits.net/home',
    description: 'A collection of bioinformatics tools for data search.',
    favicon: 'https://sgs.bioinfotoolkits.net/favicon.ico'
  },
  {
    title: 'Millet Database',
    url: 'https://db.cngb.org/millet/',
    description: 'Comprehensive millet genome and variation resources.',
    favicon: 'https://db.cngb.org/favicon.ico'
  },
  {
    title: 'SWISS-MODEL',
    url: 'https://swissmodel.expasy.org/',
    description: 'A fully automated protein structure homology-modelling server.',
    favicon: 'https://swissmodel.expasy.org/favicon.ico'
  },
  {
    title: 'TAIR',
    url: 'https://www.arabidopsis.org/',
    description: 'The Arabidopsis Information Resource for plant research.',
    favicon: 'https://www.arabidopsis.org/favicon.ico'
  },
  {
    title: 'IGV',
    url: 'https://igv.org/',
    description: 'The Integrative Genomics Viewer (IGV) for interactive genomics visualization.',
    favicon: 'https://igv.org/favicon.ico'
  },
  {
    title: 'JBrowse 2',
    url: 'https://jbrowse.org/jb2/demos/',
    description: 'A modern genome browser built with React and JavaScript.',
    favicon: 'https://jbrowse.org/favicon.ico'
  },
  {
    title: 'Gramene',
    url: 'https://www.gramene.org/',
    description: 'A curated resource for comparative genomics in crops and model plants.',
    favicon: 'https://www.gramene.org/favicon.ico'
  },
  {
    title: 'PlantTFDB',
    url: 'https://planttfdb.gao-lab.org/',
    description: 'A comprehensive database of transcription factors in plants.',
    favicon: 'https://planttfdb.gao-lab.org/favicon.ico'
  }
]);

// 默认图标
const defaultFavicon = '/src/assets/img/default-favicon.png';

// 搜索功能
const searchQuery = ref('');
const filteredLinks = computed(() => {
  return links.value.filter(link =>
      link.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 图片加载错误时使用默认图标
const handleImageError = (index) => {
  links.value[index].favicon = defaultFavicon;
};
</script>

<style scoped>
.links-page {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

/* Search Title */
.search-title {
  margin: 40px 0 20px;
}

.search-title h1 {
  font-size: 48px;
  font-weight: 400;
  color: #333;
}

/* Large Search Box */
.search-container {
  margin-bottom: 40px;
}

.large-search-box {
  width: 80%;
  max-width: 600px;
  height: 50px;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Links Grid */
.links-grid {
  display: flex;
  flex-wrap: wrap;
}

.link-card {
  margin-bottom: 20px;
  text-align: center;
}

.link-favicon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: 15px;
}

.link-info h3 {
  margin: 0;
  font-size: 18px;
}

.link-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.link-info a {
  color: #409EFF;
  text-decoration: none;
}

.link-info a:hover {
  text-decoration: underline;
}
</style>
