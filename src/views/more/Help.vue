<template>
  <div class="container">
    <!-- 统一的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Help</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- BrassicaGPT Card -->
    <el-card class="gpt-card" shadow="hover">
      <h2>BrassicaGPT</h2>
      <p>Interact with BrassicaGPT for quick help and guidance.</p>
      <el-input
          v-model="gptQuery"
          placeholder="Type your question here..."
          clearable
          style="margin-bottom: 10px;"
      />
      <el-button type="primary" @click="askBrassicaGPT">Ask BrassicaGPT</el-button>
    </el-card>

    <!-- Help Guide -->
    <el-card class="help-card" shadow="hover">
      <h2>BrassicaEDB Help</h2>
      <div class="help-content">
        <h3>1. How to cite the BrassicaEDB?</h3>
        <p>
          When using BrassicaEDB, please credit it as your source. The recommended citation format is:
        </p>
        <blockquote>
          Chao H, Li T, Luo C, et al. BrassicaEDB: A Gene Expression Database for Brassica Crops. Int. J. Mol. Sci. 2020, 21, 5831.
          <a href="https://www.mdpi.com/1422-0067/21/16/5831" target="_blank">View Full-Text</a>
        </blockquote>
        <p>
          For non-profit use, no permission is required, but citation is appreciated. For for-profit uses, please contact us.
        </p>

        <h3>2. How to use the BrassicaEDB?</h3>
        <h4>2.1 Search Data</h4>
        <p>There are three ways to search for gene data:</p>
        <ol>
          <li>Input gene ID or description to search. Results will show in a pop-up window.</li>
          <li>Upload sequences to the "BLAST" module to find similar genes.</li>
          <li>Use the "Browse Genes" module for detailed information.</li>
        </ol>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 面包屑导航数据
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'More', path: '/more' },
  { name: 'Help', path: '/help' }
];

const gptQuery = ref('');

// BrassicaGPT 查询函数
const askBrassicaGPT = () => {
  if (gptQuery.value.trim() === '') {
    this.$message.warning('Please enter a question to ask BrassicaGPT.');
    return;
  }
  console.log('BrassicaGPT Question:', gptQuery.value);
  gptQuery.value = ''; // 清空输入框
};
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* 卡片样式 */
.gpt-card,
.help-card {
  margin-bottom: 20px;
}

.help-content h3,
.help-content h4 {
  margin-top: 20px;
}

.help-content p,
.help-content blockquote {
  margin-top: 10px;
  margin-bottom: 10px;
}

.help-content blockquote {
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 5px solid #ccc;
}
</style>
