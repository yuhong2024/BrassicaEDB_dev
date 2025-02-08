<template>
  <div class="container">
    <!-- 页面标题 -->
    <div class="links-page">
      <LinksTitle />
    </div>

    <!-- BrassicaSearch Title -->
    <div class="search-title">
      <h1>BrassicaSearch</h1>
    </div>

    <!-- 搜索框 -->
    <div class="search-container">
      <el-input
          v-model="searchQuery"
          placeholder="Search websites..."
          clearable
          prefix-icon="el-icon-search"
          class="large-search-box"
      />
    </div>

    <!-- 链接展示区域 -->
    <el-row :gutter="20" class="links-grid">
      <el-col :span="8" v-for="(link, index) in filteredLinks" :key="index">
        <!-- 链接包裹整个卡片 -->
        <a :href="link.url" target="_blank" class="link-anchor">
          <el-card shadow="hover" class="link-card">
            <div class="card-content">
              <!-- 图标或替代图标 -->
              <div class="icon-container">
                <img
                    :src="link.favicon"
                    :alt="link.title"
                    class="link-favicon"
                    @error="handleImageError(index)"
                />
                <!-- 替代 Element 图标 -->
                <el-icon v-if="!link.favicon" class="fallback-icon">
                  <Document />
                </el-icon>
              </div>
              <!-- 链接信息 -->
              <div class="link-info">
                <h3>{{ link.title }}</h3>
                <p>{{ link.description }}</p>
              </div>
            </div>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Document } from "@element-plus/icons-vue";
import LinksTitle from "@/components/More/Title/links.vue";

// 网站链接数据
const links = ref([
  {
    title: 'BrassicaEDB v1.0',
    url: 'https://brassica.biodb.org/',
    description: 'BrassicaEDB - A Gene Expression Database for Brassica Crops',
    favicon: 'https://brassica.biodb.org/favicon.ico'
  },

  {
    "title": "QPrimerDB",
    "url": "https://qprimerdb.biodb.org/",
    "description": "A resource for designing quality primers for biological research.",
    "favicon": "https://qprimerdb.biodb.org/favicon.ico"
  },

  {
    title: 'iAnimal Database',
    url: 'https://ianimal.pro/index',
    description: 'Explore animal genetic resources and their information.',
    favicon: 'https://ianimal.pro/favicon.ico'
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


]);

// 默认图标（占位图）
const defaultFavicon = null;

// 搜索功能
const searchQuery = ref("");
const filteredLinks = computed(() =>
    links.value.filter(
        (link) =>
            link.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            link.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

// 图片加载错误时替换为 null（用于显示图标）
const handleImageError = (index) => {
  links.value[index].favicon = null;
};
</script>

<style scoped>
/* 容器样式 */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to bottom right, #e0f8e0, #b2f2b2); /* 渐变绿色背景 */
  box-sizing: border-box;
}

.links-page {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0px;
  box-sizing: border-box;
}

/* 页面标题 */
.search-title {
  text-align: center;
  margin: 30px 0 20px;
}

.search-title h1 {
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
}

/* 搜索框 */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.large-search-box {
  width: 80%;
  max-width: 600px;
  height: 50px;
  font-size: 16px;
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 链接展示 */
.links-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.link-card {
  margin: 10px 0;
  border-radius: 12px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* 链接外部样式 */
.link-anchor {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* 卡片内容 */
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* 图标样式 */
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-bottom: 10px;
}

.link-favicon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.fallback-icon {
  font-size: 60px;
  color: #409eff;
}

/* 链接信息 */
.link-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.link-info p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #666;
}
</style>
