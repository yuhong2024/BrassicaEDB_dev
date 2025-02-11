<script lang="ts" setup>
// 引入 Homo.vue 组件
import Homo from '@/components/search/Title/Homo.vue';
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 表单数据和状态
const form = ref({
  geneId: '',
  file: null,
  fileName: ''
});

const apiResult = ref([]); // API 结果数据
const showResult = ref(false); // 控制结果表格显示

// 填充示例ID
function fillExampleIds() {
  form.value.geneId = 'BnaA09G0693800ZS\nBnaA09G0715200ZS\nBnaC05G0010600ZS';
}

// 处理文件上传
function beforeFileUpload(file) {
  form.value.file = file;
  form.value.fileName = file.name;
  return false; // 阻止自动上传
}

// 格式化 Gene ID 输入
function formatGeneId() {
  return form.value.geneId.split('\n').filter(id => id.trim() !== '').join(',');
}

// 请求 API 数据
async function fetchHomologousData() {
  showResult.value = false;
  apiResult.value = [];

  const formData = new FormData();
  if (form.value.file) {
    formData.append('file', form.value.file);
  } else {
    formData.append('gene_id', formatGeneId());
  }

  try {
    const response = await axios.post(
        'https://brassica.wangyuhong.cn/api/homologous/filter/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    apiResult.value = response.data;
    showResult.value = true;
  } catch (error) {
    console.error('Request error:', error);
    ElMessage.error('Request failed. Please check input or try again.');
  }
}
</script>

<template>
  <div class="container">
  <!-- 引入 Homo.vue 组件 -->
  <Homo />

  <!-- Input Form Section -->
  <el-card class="el-card form-card">
    <h2 class="form-title">Homologous Gene Search</h2>
    <el-form :model="form" label-width="120px" class="form-content">
      <el-form-item label="Gene ID">
        <el-input
            v-model="form.geneId"
            type="textarea"
            placeholder="Enter gene IDs, each on a new line"
            :autosize="{ minRows: 5, maxRows: 5 }"
            clearable
            class="gene-id-input"
        ></el-input>
        <el-button @click="fillExampleIds" type="primary" plain class="fill-example-button">
          Fill Example ID
        </el-button>
      </el-form-item>
      <el-form-item label="Or Upload File">
        <el-upload action="" :before-upload="beforeFileUpload" :show-file-list="false">
          <el-button type="primary">Upload File</el-button>
        </el-upload>
        <span v-if="form.fileName" class="file-name">{{ form.fileName }}</span>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="fetchHomologousData" class="submit-button">Submit</el-button>
      </el-form-item>

    </el-form>
  </el-card>

  <!-- Result Table Section -->
  <el-card class="el-card result-card" v-if="showResult && apiResult.length">
    <h3 class="result-title">Search Results:</h3>
    <el-table :data="apiResult" style="width: 100%">
      <el-table-column prop="arabidopsis_thaliana" label="Arabidopsis thaliana"></el-table-column>
      <el-table-column prop="brassica_carinata" label="Brassica carinata"></el-table-column>
      <el-table-column prop="brassica_juncea" label="Brassica juncea"></el-table-column>
      <el-table-column prop="brassica_napus" label="Brassica napus"></el-table-column>
      <el-table-column prop="brassica_nigra" label="Brassica nigra"></el-table-column>
      <el-table-column prop="brassica_oleracea" label="Brassica oleracea"></el-table-column>
      <el-table-column prop="brassica_rapa" label="Brassica rapa"></el-table-column>
    </el-table>
  </el-card>
  </div>
</template>

<style scoped>
/* 基础样式 */
.container {
  margin-top: 30px;
  width: 100%;
}

.el-card {
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
}

.form-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gene-id-input {
  width: 100%;
  font-size: 16px;
}

.fill-example-button {
  margin-top: 10px;
}

.file-name {
  font-size: 0.9rem;
  color: #666;
}

.submit-button {
  width: 30%;
  margin-left: 0;
}

.result-card {
  min-height: 250px;
}
</style>
