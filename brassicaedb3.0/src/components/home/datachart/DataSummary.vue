<template>
  <div class="statistics-panel card">
    <h2>Data Summary (21 Species)</h2>
    <div class="statistics-cards">
      <el-card v-for="(item, index) in statistics" :key="index" class="statistics-card">
        <div class="card-content">
          <p>{{ item.name }}</p>
          <h3>{{ item.value }}</h3>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const statistics = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/data.json');
    const data = response.data;
    statistics.value = [
      { name: 'Sequences', value: data.sequences },
      { name: 'Projects', value: data.projects },
      { name: 'Literatures', value: data.literatures },
      { name: 'Tissues', value: data.tissues },
      { name: 'Variations', value: data.variations },
      { name: 'Genes', value: data.genes }
    ];
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
});
</script>

<style scoped>
.statistics-panel {
  padding: 2rem;
  background-color: #ffffff;
  text-align: center;
}

.statistics-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.statistics-card {
  width: 150px;
}

.card-content p {
  margin: 0;
  font-weight: bold;
}

.card-content h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #42b983;
}
</style>
