<template>
  <div class="container">
    <!-- 统一的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Homologous Gene</h1>
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

    <!-- Introduction Section -->
    <el-card class="intro-card">
      <div class="intro-content">
        <img src="@/assets/img/home/search/Hom.svg" alt="Brassica Image" class="intro-image" />

        <div class="intro-text">
          <h2>Homologous Gene</h2>
          <p>
            The transcriptome level provides Brassica researchers with a comprehensive and
            user-friendly interactive tool for gene expression profiling data, the Brassica
            Expression Database (BrassicaEDB). Using this database, researchers can quickly
            retrieve target gene expression level data, elucidate gene function, and advance
            Brassica breeding at the transcriptome level.
          </p>
        </div>
      </div>
    </el-card>

    <!-- Placeholder for further content -->
    <div class="default-state">
      <!-- Future content like search panel or results will go here -->
    </div>
  </div>
</template>

<script setup>
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Analysis', path: '/analysis' },
  { name: 'Homologous Gene', path: '/analysis/homologous-gene' }
];
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
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
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

/* Introduction 样式 */
.intro-card {
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image {
  width: 120px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
}

.intro-text h2 {
  margin: 0;
  font-size: 24px;
}

.intro-text p {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
}

/* 占位符内容样式 */
.default-state {
  margin-top: 20px;
}
</style>
