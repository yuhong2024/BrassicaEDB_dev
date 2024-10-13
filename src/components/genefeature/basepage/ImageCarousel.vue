<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in items" :key="index">
      <el-card>
        <img :src="item.src" :alt="item.alt" class="carousel-image">
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref } from 'vue';

// 引用本地图片
import image1 from '@/assets/img/home/display/image1.png';
import image2 from '@/assets/img/home/display/image2.png';
import image3 from '../../../assets/img/test/image3.jpg';
import image4 from '../../../assets/img/test/image4.jpg';

const items = ref([
  { src: image1, alt: 'Image 1' },
  { src: image2, alt: 'Image 2' },
  { src: image3, alt: 'Image 3' },
  { src: image4, alt: 'Image 4' }
]);
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
</style>
