<template>
  <div class="detailed-description">
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  description: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.detailed-description {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.detailed-description p {
  font-size: 1rem;
  line-height: 1.5;
}
</style>
