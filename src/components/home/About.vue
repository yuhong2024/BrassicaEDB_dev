<script setup>
</script>

<template>
  <el-card class="about-card">
    <!-- BEDB 数据库介绍 -->
    <h2>About BrassicaEDB</h2>
    <p>
      BrassciaEDB is a comprehensive, multi-omics database designed for Brassica crops. It integrates advanced gene
      expression data with multi-omics visualization tools to empower researchers in exploring the functional
      roles of genes in Brassica species.
    </p>
    <p>
      BrassicaEDB aims to provide a robust platform for data mining, hypothesis generation, and omics-based research,
      enabling seamless access to various types of omics data for Brassica crops.
    </p>

    <!-- 论文引用部分 -->
    <h3>Publication</h3>
    <p>
      Chao H, Li T, Luo C, Huang H, Ruan Y, Li X, Niu Y, Fan Y, Sun W, Zhang K, Li J, Qu C, Lu K.
      <i>BrassicaEDB: A Gene Expression Database for Brassica Crops.</i>
      <b>Int. J. Mol. Sci.</b> 2020, 21, 5831.
      <a href="https://www.mdpi.com/1422-0067/21/16/5831" target="_blank">View Full-Text</a>
    </p>

    <!-- 照片展示部分 -->
    <h3>Gallery</h3>
    <div class="image-gallery">
      <img src="@/assets/img/home/display/image1.png" alt="BEDB Image 1" class="gallery-image" />
      <!-- 如果有更多图片，可以依次加入 -->
    </div>
  </el-card>


</template>

<style scoped>
.about-card {
  margin: 20px auto;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #f9f9f9;
}
.about-card h2,
.about-card h3 {
  margin-bottom: 15px;
  color: #333;
}
.about-card p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #555;
}
.about-card a {
  color: #409eff;
  text-decoration: none;
}
.about-card a:hover {
  text-decoration: underline;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}
.gallery-image {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* 水平居中 */
  display: block; /* 确保图片是块级元素，支持 margin */
}

</style>
