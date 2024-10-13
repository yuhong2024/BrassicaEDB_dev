<template>
  <el-card class="introduction-card" shadow="hover">
    <div class="introduction">
      <div class="image-container">
        <img :src="speciesImage" alt="Species Image" class="species-image" />
      </div>
      <div class="info-container">
        <h2>{{ speciesName }}</h2>
        <div v-for="(text, index) in speciesDescription" :key="index">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  speciesName: String,
  speciesImage: String,
  speciesDescription: Array
});
</script>

<style scoped>
.introduction {
  display: flex;
  align-items: flex-start;
}

.image-container {
  flex: 0 0 30%;
  text-align: center;
}

.species-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.info-container {
  flex: 1;
  padding-left: 20px;
}

.introduction-card {
  margin-bottom: 20px;
  padding: 20px;
}
</style>
