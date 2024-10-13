<template>
  <div class="container">
    <!-- 直接写在当前页面的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>GO Enrichment</h1>
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

    <!-- Introduction Section -->
    <el-card class="intro-card" shadow="hover">
      <div class="intro-content">
        <img src="@/assets/img/home/tools/go.png" alt="GO Enrichment Image" class="intro-image" />
        <div class="intro-text">
          <h2>GO Enrichment</h2>
          <p>
            Analyze GO term enrichment in your gene list using this tool. Select either file upload or text input, choose parameters, and view your results directly.
            <a href="https://github.com/swu1019lab/GO" target="_blank">[Github]</a>
            <a href="https://pubmed.ncbi.nlm.nih.gov/39119895/" target="_blank">[Citation]</a>
          </p>
        </div>
      </div>
    </el-card>

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
                <el-option label="Species 1" value="s1"></el-option>
                <el-option label="Species 2" value="s2"></el-option>
                <el-option label="Species 3" value="s3"></el-option>
                <el-option label="Species 4" value="s4"></el-option>
                <el-option label="Species 5" value="s5"></el-option>
                <el-option label="Species 6" value="s6"></el-option>
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

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'GO Enrichment', path: '/tools/go-enrichment' }
];

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
    const response = await fetch('https://brassica.wangyuhong.cn/api/go/', {
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

/* 卡片式布局 */
.el-card {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Introduction 样式 */
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

/* 输入卡片样式 */
.input-card {
  margin-bottom: 20px;
  padding: 20px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); }

.upload-box { width: 100%; }

.submit-button { margin-top: 10px; width: 100%; }

/* 结果卡片样式 */ .result-section { margin-top: 20px; }

.result-card { padding: 20px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); }
</style>
