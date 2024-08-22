<template>
  <el-card class="module-card">
    <el-row>
      <el-col :span="4">
        <img :src="logo" alt="Logo" class="module-logo" />
      </el-col>
      <el-col :span="20">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const logo = require('../../../assets/img/test/logo.png'); // 确保路径正确
</script>

<style scoped>
.module-card {
  margin-bottom: 20px;
  padding: 20px;
}

.module-logo {
  width: 100%;
  height: auto;
}
</style>
