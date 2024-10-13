<template>
  <div class="container">
    <!-- 统一的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Links</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
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
        <el-card shadow="hover" class="link-card animated-card">
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

// 面包屑导航数据
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'More', path: '/more' },
  { name: 'Links', path: '/links' }
];

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
    title: 'PlantTFDB',
    url: 'https://planttfdb.gao-lab.org/',
    description: 'A comprehensive database of transcription factors in plants.',
    favicon: 'https://planttfdb.gao-lab.org/favicon.ico'
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
    url: 'https://igv.org/',
    description: 'A curated resource for comparative genomics in crops and model plants.',
    favicon: 'https://www.gramene.org/favicon.ico'
  },


  {
    title: 'Bnapus Database',
    url: 'http://cbi.hzau.edu.cn/bnapus/',
    description: 'Database focusing on Brassica napus research and genomic data.',
    favicon: 'http://cbi.hzau.edu.cn/favicon.ico'
  }



  // 其他链接...
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
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f7f9fc;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* Search Title */
.search-title {
  margin: 40px 0 20px;
  text-align: center;
}

.search-title h1 {
  font-size: 42px;
  font-weight: 500;
  color: #333;
  letter-spacing: 0.05rem;
}

/* Large Search Box */
.search-container {
  margin-bottom: 40px;
  text-align: center;
}

.large-search-box {
  width: 80%;
  max-width: 700px;
  height: 50px;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.large-search-box:focus-within {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Links Grid */
.links-grid {
  display: flex;
  flex-wrap: wrap;
}

.link-card {
  margin-bottom: 30px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.link-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.animated-card {
  animation: fadeInUp 0.5s ease both;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.link-favicon {
  width: 70px;
  height: 70px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.link-card:hover .link-favicon {
  transform: rotate(360deg);
}

.link-info h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.link-info p {
  margin: 5px 0;
  font-size: 15px;
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
