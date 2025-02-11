<script setup>
// Import species image
import speciesImage from '@/assets/img/home/search/Pan.svg';


// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: ' Search', path: '/search' },
  { name: 'Pantranme', path: '/search/pantranme' }
];
</script>

<template>
  <!-- Breadcrumb Navigation -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Gene Pantranscriptome</h1>
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
          Pan-transcriptome refers to the collection of all transcripts produced by all individuals or tissues of a species under different conditions, including the core transcriptome and the variable transcriptome. A core transcriptome is a transcript that is universally expressed in all individuals or tissues and is usually associated with basic biological functions. A variable transcriptome is a transcript that is expressed only in a particular individual, tissue, or condition, reflecting the specificity of the individual or tissue. The regulation of the expression of core transcripts and variable transcripts between different species can be studied from the aspect of species evolution, comparing the transcriptome of different species and revealing the evolutionary mechanism.
    </p>

    <p>
      We collected all the published genomes of Brassica napus, Brassica oleracea and Brassica rapa, conducted pairby-pair comparison of each genome of these three species through blast, and sorted out the best comparison results. The core genes and variable genes of these three species were analyzed.
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
