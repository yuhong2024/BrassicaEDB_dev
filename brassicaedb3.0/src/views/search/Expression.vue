<template>
  <div class="transcript-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Transcript Expression</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/analysis">Analysis</el-breadcrumb-item>
          <el-breadcrumb-item>Transcript Expression</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Introduction 板块 -->
    <el-card class="intro-card">
      <div class="intro-content">
        <img src="https://img.zcool.cn/community/01beb65ab5ae4da80120be145644c3.jpg@1280w_1l_2o_100sh.jpg" alt="Brassica Image" class="intro-image" />
        <div class="intro-text">
          <h2>Transcript Expression</h2>
          <p>
            The transcriptome level provides Brassica researchers with a comprehensive and
            user-friendly interactive tool for gene expression profiling data, the Brassica
            Expression Database (BrassicaEDB). Using this database, researchers can quickly
            retrieve target gene expression level data, elucidate gene function, and advance
            Brassica breeding at the transcriptome level.
          </p>
        </div>
      </div>
    </el-card>

    <!-- Carousel Section -->
    <el-card class="carousel-card">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(img, index) in carouselImages" :key="index">
          <img :src="img" alt="Carousel Image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
// 使用网络图片进行测试
const carouselImages = [
  "https://img.zcool.cn/community/01beb65ab5ae4da80120be145644c3.jpg@1280w_1l_2o_100sh.jpg",
  "https://img.zcool.cn/community/01beb65ab5ae4da80120be145644c3.jpg@1280w_1l_2o_100sh.jpg",
  "https://img.zcool.cn/community/01beb65ab5ae4da80120be145644c3.jpg@1280w_1l_2o_100sh.jpg"
];
</script>

<style scoped>
.transcript-page {
  padding: 20px;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

.intro-card {
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image {
  width: 120px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
}

.intro-text h2 {
  margin: 0;
  font-size: 24px;
}

.intro-text p {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
}

.carousel-card {
  margin-top: 20px;
}

.carousel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
