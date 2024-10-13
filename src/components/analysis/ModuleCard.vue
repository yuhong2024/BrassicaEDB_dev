<template>
  <div class="module-card">
    <el-card shadow="hover" class="card">
      <el-carousel height="400px" trigger="click">
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <img :src="image" alt="Module Image" class="module-image" />
        </el-carousel-item>
      </el-carousel>
      <div class="module-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <p>{{ descriptionCN }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  descriptionCN: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.module-card {
  margin-bottom: 20px;
}

.card {
  display: flex;
  flex-direction: row;
  padding: 20px;
  transition: transform 0.3s;
}

.module-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.module-content {
  padding-left: 20px;
  flex: 1;
}

.module-content h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.module-content p {
  font-size: 1rem;
  margin: 5px 0;
}
</style>
