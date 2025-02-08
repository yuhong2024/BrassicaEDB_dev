<!-- src/components/ChartCarousel.vue -->
<template>
  <div>
    <BarChart :chartData="chartData" :chartLabels="chartLabels" />
    <el-card class="carousel-card" shadow="hover">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
          <img :src="item" alt="Carousel Image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import BarChart from '@/components/search/network/BarChart.vue';
import { defineProps } from 'vue';

const props = defineProps<{
  chartData: number[],
  chartLabels: string[],
  carouselImages: string[]
}>();
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
