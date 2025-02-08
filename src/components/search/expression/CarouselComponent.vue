<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <img :src="image" class="carousel-image" alt="Carousel Image" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
const images = [
  'https://live.staticflickr.com/1725/41488285985_4dee05560d_b.jpg',
  'https://live.staticflickr.com/1725/41488285985_4dee05560d_b.jpg',
  'https://live.staticflickr.com/1725/41488285985_4dee05560d_b.jpg'
];
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.el-carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}
</style>
