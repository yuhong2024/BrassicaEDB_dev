<template>
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
</template>

<script setup>
</script>

<style scoped>
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
</style>
