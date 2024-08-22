<template>
  <div class="help-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Help</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/more">More</el-breadcrumb-item>
          <el-breadcrumb-item>Help</el-breadcrumb-item>
        </el-breadcrumb>
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
          We hope our database is a useful source of information for researchers, educators, and the interested public. When using these data, please credit BrassicaEDB as your source. The current recommended citation format is as follows:
        </p>
        <blockquote>
          Chao H, Li T, Luo C, Huang H, Ruan Y, Li X, Niu Y, Fan Y, Sun W, Zhang K, Li J, Qu C, Lu K. BrassicaEDB: A Gene Expression Database for Brassica Crops. Int. J. Mol. Sci. 2020, 21, 5831.
          <a href="https://www.mdpi.com/1422-0067/21/16/5831" target="_blank">View Full-Text</a>
        </blockquote>
        <p>
          Permission is not required to use the data for non-profit purposes, although we hope that you will cite BrassicaEDB, as described above. If you plan to use the data in BrassicaEDB for any for-profit application, please contact us for permission.
        </p>

        <h3>2. How to use the BrassicaEDB?</h3>
        <h4>2.1 Search Data</h4>
        <p>
          There are three ways to utilize search function modules for gene in the database:
        </p>
        <ol>
          <li>
            Input query such as gene identifier (BnaA01g27090D) or gene description (Actin) to search the gene which users are interested in, then the searched gene will be shown in a new pop-up window. When users enter another query, the previous search results will be recorded as a list at the bottom of the gene search box.
          </li>
          <li>
            Users can upload the sequences to the "BLAST" module and click on the submit button. Then genes similar to the uploaded sequences will be presented. Thus users can click on gene ID to explore other function modules.
          </li>
          <li>
            The "Browse Genes" module contains all gene information. Users also can search gene ID by clicking on the magnifying glass.
          </li>
        </ol>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const gptQuery = ref('');

const askBrassicaGPT = () => {
  if (gptQuery.value.trim() === '') {
    this.$message.warning('Please enter a question to ask BrassicaGPT.');
    return;
  }
  // Here you can handle the GPT query logic, such as sending a request to the backend.
  console.log('BrassicaGPT Question:', gptQuery.value);
  gptQuery.value = ''; // Clear the input after asking
};
</script>

<style scoped>
.help-page {
  width: 90vw;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

.gpt-card {
  margin-bottom: 30px;
}

.help-card {
  padding: 20px;
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
