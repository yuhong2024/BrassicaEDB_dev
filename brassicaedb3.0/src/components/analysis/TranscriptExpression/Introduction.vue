<template>
  <el-card class="intro-card">
    <el-row :gutter="20">
      <el-col :span="6">
        <img :src="require('@/assets/img/test/t.jpg')" alt="Transcript Image" class="intro-image">
      </el-col>
      <el-col :span="18">
        <h2>Transcript Expression</h2>
        <p>
          The transcriptome level provides Brassica researchers with a comprehensive and user-friendly interactive tool for gene expression profiling data, the Brassica Expression Database (BrassicaEDB). Using this database, researchers can quickly retrieve target gene expression level data, elucidate gene function, and advance Brassica breeding at the transcriptome level.
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
</script>

<style scoped>
.intro-card {
  margin-bottom: 20px;
}

.intro-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
