<template>
  <div class="coexpression-seqfetch-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Co-Expression Seq-Fetch</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/tools">Tools</el-breadcrumb-item>
          <el-breadcrumb-item>Co-Expression Seq-Fetch</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Introduction Section -->
    <el-card class="intro-card">
      <div class="intro-content">
        <img src="@/assets/img/test/t.jpg" alt="Co-Expression Image" class="intro-image" />
        <div class="intro-text">
          <h2>Co-Expression Seq-Fetch</h2>
          <p>
            A tool for analyzing gene co-expression. This feature allows researchers to explore gene interaction networks and gain insights into gene function.
          </p>
        </div>
      </div>
    </el-card>

    <!-- Placeholder for further content -->
    <div class="default-state">
      <!-- Future content like search panel or results will go here -->
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.coexpression-seqfetch-page {
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

.default-state {
  margin-top: 20px;
  /* Placeholder for future content */
}
</style>
