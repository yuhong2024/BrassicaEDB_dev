<template>
  <div class="statistics-info">
    <img :src="imageSrc" alt="Statistics Image" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.statistics-info {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  text-align: center;
}

.statistics-info img {
  width: 100%;
  max-width: 300px;
  height: auto;
}
</style>
