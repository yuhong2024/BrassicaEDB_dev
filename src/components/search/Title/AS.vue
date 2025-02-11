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
      <h1>Gene Alternative Splicing</h1>
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
  <div class="introduction-card">
    <div class="introduction">
      <!-- Image Section -->
      <div class="image-container">
        <img :src="speciesImage" alt="Alternative Splicing Image" class="species-image" />
      </div>
      <!-- Text Section -->
      <div class="info-container">
        <p>
          Alternative Splicing is an important process in gene expression regulation, which allows the same gene to produce multiple different mRNA transcripts through different splicing methods, thus encoding different proteins. In plants, alternative splicing not only increases the complexity of the genome, but also provides flexible regulatory mechanisms for plants under complex environmental conditions, helping them adapt to various growth and development environments. There are five types of alternative splicing : Alternative3' splice site (A3SS), Alternative5' splice site (A5SS), Mutuallyexclusive exons (MXE), Retainedintron (RI), Skippedexon (SE)
        </p>
        <p>
          We used <i>Brassica carinata</i> (10167), <i>Brassica juncea</i> (Tumida V2), <i>Brassica napus</i> (ZS11), <i>Brassica nigra</i> (NI100 V2), <i>Brassica oleracea</i> (JZS V2) and <i>Brassica rapa</i> (Chiifu V4) were used as reference genomes. First, star and stringtie were used to predict new transcripts for each species, and salon was used to calculate TPM for each transcript.
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

/* Introduction Section */
.introduction-card {
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  margin: 15px 0;
}

.introduction {
  display: flex;
  gap: 20px;
}

.image-container {
  flex: 0 0 200px;
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

i {
  font-style: italic;
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .introduction {
    flex-direction: column;
  }

  .image-container {
    width: 160px;
    margin: 0 auto 15px;
  }

  .info-container p {
    font-size: 1.1rem;
    line-height: 1.5;
  }
}
</style>
