<template>
  <el-card class="carousel-card" shadow="hover">
    <el-carousel height="250px" trigger="click" :autoplay="true">
      <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
        <img :src="item" alt="Carousel Image" style="width: 100%; height: 100%;" />
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup>
const carouselImages = [
  require('@/assets/img/test/t.jpg'),
  require('@/assets/img/test/tf.jpg'),
  require('@/assets/img/test/statistics-pie.png')
];
</script>

<style scoped>
.carousel-card {
  margin-top: 20px;
}
</style>
