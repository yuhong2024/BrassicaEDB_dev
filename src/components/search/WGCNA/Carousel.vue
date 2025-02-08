<template>
  <el-card class="single-image-card">
    <img :src="image1" alt="Single Image" class="image" />
  </el-card>
</template>

<script setup>
import {ref} from 'vue';

// 引用本地图片
import image1 from '@/assets/img/search/WGCNA/WGCNAdisplay.png';

</script>

<style scoped>
.single-image-card {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-shadow: none; /* 去除卡片阴影 */
  border-radius: 0;
  overflow: hidden; /* 防止图片超出 */
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 让图片填充整个容器 */
}
</style>
