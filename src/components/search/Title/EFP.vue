<script setup>
// Import species image
import speciesImage from '@/assets/img/home/search/efp.svg';


// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'eFP', path: '/search/efp' }
];
</script>

<template>
  <!-- Breadcrumb Navigation -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Gene eFP-seq</h1>
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
        <img :src="speciesImage" alt="eFP Image" class="species-image" />
      </div>

      <!-- Text Section -->
      <div class="info-container">
        <p>
          eFP-seq (Express-Fusion Protein sequencing) is a highly effective gene expression analysis technique for studying gene regulation, protein function, and cell biological processes by capturing and quantification of Fusion protein expression. The combination of RNA-seq and eFP-seq allows the researchers to simultaneously obtain the level of gene transcription and the specific dynamics of the fusion protein within the cell.
        </p>
        <p>
          We conducted transcriptome sequencing and analysis on 103 different tissue periods of Brassica napus, and showed the expression levels of each gene obtained at different periods in the corresponding images.
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
  padding: 10px 20px;
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
}

.info-container p {
  font-size: 1.10rem;
  line-height: 1.4;
  color: #333;
  margin-bottom: 15px;
  text-align: justify;
  letter-spacing: 0.2px;
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
