<script setup>
// Import species image
import speciesImage from '@/assets/img/home/search/Hom.svg';


// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: ' Search', path: '/search' },
  { name: 'Homologous Gene', path: '/search/homologous' }
];
</script>

<template>
  <!-- Breadcrumb Navigation -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Homologous Gene</h1>
    </div>
    <div class="breadcrumb-right">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li
              class="breadcrumb-item"
              v-for="(item, index) in breadcrumbs"
              :key="index"
          >
            <router-link :to="item.path">{{ item.name }}</router-link>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  <!-- Introduction Section -->
  <div class="introduction-card">
    <div class="introduction">
      <!-- Image Section -->
      <div class="image-container">
        <img :src="speciesImage" alt="Homologous Gene Image" class="species-image" />
      </div>
      <!-- Text Section -->
      <div class="info-container">
        <p>
          Homologous genes are genes that have similar sequences and functions in different species, derived
          from their common ancestral genes. They can be traced back to a common ancestral gene, with distinct
          genes formed through species differentiation or gene duplication events during evolution. The study
          of homologous genes is of great significance for understanding gene function, genome evolution and
          genetic relationships among species. By comparing homologous genes in different species, scientists
          can infer the origin and evolution of these genes and reveal their function in the organism.
        </p>
        <p>
          We used blast to analyze the representative genomes of six species of <i>Brassica</i> L., including
          <i>Brassica carinata</i> (10167), <i>Brassica juncea</i> (Tumida_V2), <i>Brassica napus</i> (ZS11),
          <i>Brassica nigra</i> (NI100_V2), <i>Brassica oleracea</i> (JZS_V2), <i>Brassica rapa</i> (Chiifu_V4)
          and <i>Arabidopsis thaliana</i> (TAIR10) were compared in pairs. And screen out the best results
          between each gene pair.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Breadcrumb Navigation */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.7rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  margin: 0 8px;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* Card Layout */
.introduction-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

/* Introduction Section */
.introduction {
  display: flex;
  align-items: center;
  gap: 20px;
}

.image-container {
  flex: 0 0 150px;
}

.species-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.info-container {
  flex: 1;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .introduction {
    flex-direction: column;
    text-align: center;
  }

  .image-container {
    width: 120px;
    margin-bottom: 15px;
  }

  .info-container {
    text-align: left;
  }
}
</style>
