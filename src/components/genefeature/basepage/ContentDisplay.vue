<template>
  <div class="content-display">
    <img :src="imageSrc" alt="Content Image" />
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
.content-display {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  text-align: center;
}

.content-display img {
  width: 100%;
  max-width: 300px;
  height: auto;
}
</style>
