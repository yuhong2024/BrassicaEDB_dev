<template>
  <div class="transcript-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Transcript Expression</h1>
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
        <div class="intro-image-container">
          <img
              src="https://assets.entrepreneur.com/content/3x2/2000/20150825183914-dna-science-double-helix-.jpeg"
              alt="Brassica Image"
              class="intro-image"
          />
        </div>
        <div class="intro-text">
          <h2>Transcript Expression</h2>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Brassica', path: '/brassica' },
        { name: 'Transcript Expression', path: '/transcript-expression' }
      ]
    };
  }
};
</script>

<style scoped>
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


.intro-card,
.search-card {
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image-container {
  flex: 0 0 150px;
  margin-right: 20px;
}

.intro-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.intro-text {
  flex: 1;
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

</style>
