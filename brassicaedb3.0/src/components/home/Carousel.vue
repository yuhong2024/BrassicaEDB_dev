<template>
  <el-carousel :interval="4000" arrow="always" type="card" height="400px">
    <el-carousel-item v-for="(item, index) in items" :key="index">
      <el-card shadow="hover" class="carousel-card">
        <img :src="item.src" :alt="item.alt" class="carousel-image" />
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref } from 'vue';

// 引用本地图片
import image1 from '@/assets/img/home/display/image1.png';
import image2 from '@/assets/img/home/display/image2.png';
import image3 from '@/assets/img/home/display/image3.jpg';
import image4 from '@/assets/img/home/display/image4.png';



const items = ref([
  { src: image1, alt: 'Image 1' },
  { src: image2, alt: 'Image 2' },
  { src: image3, alt: 'Image 3' },
  { src: image4, alt: 'Image 4' }
]);
</script>

<style scoped>
.carousel-card {
  padding: 0;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden; /* 确保图片不会溢出 */
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片适应卡片大小 */
  display: block;
}
</style>
