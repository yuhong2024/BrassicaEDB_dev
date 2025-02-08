<script setup>
// Import species image
import speciesImage from '@/assets/img/home/search/AS.svg';



// Breadcrumbs Configuration
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Alternative Splicing', path: '/search/splicing' }
];
</script>

<template>
  <!-- Breadcrumb Navigation -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <h1>Alternative Splicing</h1>
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
        <img :src="speciesImage" alt="Alternative Splicing Image" class="species-image" />
      </div>
      <!-- Text Section -->
      <div class="info-container">
        <p>
          Alternative Splicing is an important process in gene expression regulation, which allows the same 
          gene to produce multiple different mRNA transcripts through different splicing methods, thus encoding 
          different proteins. This process greatly increases the complexity of the genome and the diversity of 
          proteins. After mRNA transcription, introns (introns) are removed and exons (exons) are connected to 
          form mature mRNA. Variable splicing is the process in which different mRNA variants are produced by 
          selecting different exons or introns.
        </p>
        <p>
          In plants, alternative splicing also plays an important role and, similar to animals, plays a key 
          role in regulating gene expression and function. Variable splicing in plants not only increases the 
          complexity of the genome, but also provides flexible regulatory mechanisms for plants under complex 
          environmental conditions, helping them adapt to various growth and development environments.
        </p>
        <p>
          We used <i>Brassica carinata</i> (10167), <i>Brassica juncea</i> (Tumida_V2), <i>Brassica napus</i> 
          (ZS11), <i>Brassica nigra</i> (NI100_V2), <i>Brassica oleracea</i> (JZS_V2) and <i>Brassica rapa</i> 
          (Chiifu_V4) as reference genomes. First, star and stringtie were used to predict new transcripts for 
          each species, and salon was used to calculate TPM for each transcript.
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
