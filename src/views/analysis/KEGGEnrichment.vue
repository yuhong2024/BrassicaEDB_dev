<template>
  <div class="container">
    <kegg />
    <!-- Input Section -->
    <el-card class="input-card">
      <el-form ref="goForm" :model="form" @submit.prevent="handleSubmit" label-position="top">
        <el-row>
          <el-radio-group v-model="inputMethod">
            <el-radio-button label="File Upload">File Upload</el-radio-button>
            <el-radio-button label="Text Input">Text Input</el-radio-button>
          </el-radio-group>
        </el-row>

        <el-row v-if="inputMethod === 'File Upload'" :gutter="20" class="input-section">
          <el-col :span="12">
            <el-form-item label="Upload File (.txt)" prop="file">
              <el-upload
                  class="upload-box"
                  action=""
                  :before-upload="beforeUpload"
                  :on-change="handleFileChange"
                  :file-list="fileList"
                  :limit="1"
                  :auto-upload="false"
              >
                <el-button type="primary">Choose File</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-else :gutter="20" class="input-section">
          <el-col :span="24">
            <el-form-item label="Paste Gene List" prop="inputText">
              <el-input type="textarea" v-model="form.inputText" rows="8" placeholder="Paste your gene list here..."></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Additional Parameters -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Select Species" prop="species">
              <el-select v-model="form.species" placeholder="Select species">
                <el-option label="Brassica carinata" value="brassica_carinata"></el-option>
                <el-option label="Brassica juncea" value="brassica_juncea"></el-option>
                <el-option label="Brassica napus" value="brassica_napus"></el-option>
                <el-option label="Brassica nigra" value="brassica_nigra"></el-option>
                <el-option label="Brassica oleracea" value="brassica_oleracea"></el-option>
                <el-option label="Brassica rapa" value="brassica_rapa"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" @click="validateAndSubmit" class="submit-button">Submit</el-button>
        <el-progress v-if="loading" :percentage="progress" status="active"></el-progress>
      </el-form>
    </el-card>

    <!-- Result Display -->
    <div v-if="downloadUrl" class="result-section">
      <el-card class="result-card">
        <h3>Results</h3>
        <el-button type="primary" @click="downloadResult">Download Result</el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import kegg from "@/components/Tools/Title/kegg.vue";


const inputMethod = ref('File Upload');
const form = ref({
  file: null,
  inputText: '',
  species: '',
});
const fileList = ref([]);
const loading = ref(false);
const progress = ref(0);
const downloadUrl = ref('');

// Handle File Change
const handleFileChange = (file) => {
  form.value.file = file.raw;
  fileList.value = [file];
};

// Before Upload Validation
const beforeUpload = (file) => {
  const isTxt = file.type === 'text/plain';
  const isLt500KB = file.size / 1024 < 500;
  if (!isTxt || !isLt500KB) {
    ElMessage.error('File must be a .txt and less than 500KB.');
    return false;
  }
  return true;
};

// Submit Form
const validateAndSubmit = () => {
  if (inputMethod.value === 'File Upload' && !form.value.file) {
    ElMessage.error('Please upload a file.');
    return;
  }
  if (inputMethod.value === 'Text Input' && !form.value.inputText) {
    ElMessage.error('Please enter text data.');
    return;
  }
  if (!form.value.species) {
    ElMessage.error('Please select a species.');
    return;
  }
  handleSubmit();
};

// Handle Submit
const handleSubmit = async () => {
  loading.value = true;
  const formData = new FormData();
  if (inputMethod.value === 'File Upload') {
    formData.append('study_file', form.value.file);
  } else {
    formData.append('study_text', form.value.inputText);
  }
  formData.append('species', form.value.species);

  try {
    const response = await fetch('https://brassica.wangyuhong.cn/api/kegg/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      downloadUrl.value = await response.blob().then(blob => URL.createObjectURL(blob));
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    ElMessage.error('Error: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// Download Result
const downloadResult = () => {
  const link = document.createElement('a');
  link.href = downloadUrl.value;
  link.download = 'result.zip';
  link.click();
};
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
/* 输入卡片样式 */
.input-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.upload-box {
  width: 100%;
}

.submit-button {
  margin-top: 10px;
  width: 100%;
}
/* 结果卡片样式 */
.result-section {
  margin-top: 20px;
}
.result-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
