<template>
  <div class="container">
    <!-- 直接写在当前页面的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Seq Fetch</h1>
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
        <img src="@/assets/img/home/tools/seqfetch.png" alt="Seq Fetch Image" class="intro-image" />
        <div class="intro-text">
          <h2>Seq Fetch</h2>
          <p>
            Use Seq Fetch to retrieve nucleotide sequences based on gene IDs. Upload a text file or enter gene IDs manually. Adjust parameters as needed and fetch your sequences.
          </p>
        </div>
      </div>
    </el-card>

    <!-- Form Section -->
    <el-card class="form-card">
      <el-row :gutter="20">
        <!-- Left Side: Species Select and Promoter Length -->
        <el-col :span="12">
          <el-form-item label="下拉式选择物种" prop="species">
            <el-select v-model="form.species" placeholder="Select a species">
              <el-option label="Species 1" value="s1"></el-option>
              <el-option label="Species 2" value="s2"></el-option>
              <el-option label="Species 3" value="s3"></el-option>
              <el-option label="Species 4" value="s4"></el-option>
              <el-option label="Species 5" value="s5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输入启动子长度" prop="promoter_length">
            <el-input v-model="form.promoter_length" placeholder="1500"></el-input>
          </el-form-item>
        </el-col>

        <!-- Right Side: Output Prefix and Example -->
        <el-col :span="12">
          <el-form-item label="结果输出名称" prop="out_prefix">
            <el-input v-model="form.out_prefix" placeholder="e.g., 1500bp"></el-input>
          </el-form-item>
          <el-button type="info" @click="loadExample">Example</el-button>
        </el-col>
      </el-row>

      <!-- Gene ID Input or File Upload -->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="基因ID输入或提交文件" prop="input_text">
            <el-input
                v-model="form.input_text"
                type="textarea"
                placeholder="BnaA01G0354500ZS, BnaA01G0357800ZS, BnaA01G0231100ZS, ..."
                :rows="6"
            ></el-input>
          </el-form-item>
          <el-upload
              class="upload-box"
              action=""
              :before-upload="beforeUpload"
              :on-change="handleFileChange"
              :file-list="fileList"
              :limit="1"
              :auto-upload="false"
          >
            <el-button type="primary">Upload File</el-button>
          </el-upload>
        </el-col>
      </el-row>

      <!-- Submit Button -->
      <el-button type="primary" @click="handleSubmit" class="submit-button">Submit</el-button>
    </el-card>

    <!-- DNA Type Buttons -->
    <div class="dna-buttons">
      <el-button class="dna-button" type="default" @click="setDNAType('gDNA')">gDNA</el-button>
      <el-button class="dna-button" type="default" @click="setDNAType('cds')">CDS</el-button>
      <el-button class="dna-button" type="default" @click="setDNAType('pep')">PEP</el-button>
      <el-button class="dna-button" type="default" @click="setDNAType('promoter')">Promoter</el-button>
    </div>

    <!-- Results Section -->
    <div v-if="downloadUrl" class="result">
      <el-card>
        <div class="result-header">
          <h2>Result</h2>
          <el-button type="success" @click="downloadFile">Download Result</el-button>
        </div>
        <p>File is ready for download.</p>
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
  { name: 'Seq Fetch', path: '/tools/seqfetch' }
];

// Form data
const form = ref({
  input_file: null,
  input_text: '',
  species: '',
  promoter_length: '1500',
  out_prefix: '1500bp',
});

const fileList = ref([]);
const dnaType = ref('gDNA');
const downloadUrl = ref('');

// File upload validation
const beforeUpload = (file) => {
  const isTxt = file.type === 'text/plain';
  if (!isTxt) {
    ElMessage.error('File must be in .txt format');
  }
  return isTxt;
};

// Handle file change
const handleFileChange = (file) => {
  form.value.input_file = file.raw;
  fileList.value = [file];
};

// Handle form submission
const handleSubmit = async () => {
  if (!form.value.input_text && !form.value.input_file) {
    ElMessage.error('Please provide a sequence file or input gene IDs.');
    return;
  }
  if (!form.value.species) {
    ElMessage.error('Please select a species.');
    return;
  }

  const formData = new FormData();
  if (form.value.input_file) {
    formData.append('input_file', form.value.input_file);
  }
  formData.append('input_text', form.value.input_text);
  formData.append('species', form.value.species);
  formData.append('promoter_length', form.value.promoter_length);
  formData.append('out_prefix', form.value.out_prefix);

  const response = await fetch('https://brassica.wangyuhong.cn/api/seqfetch/', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const blob = await response.blob();
    downloadUrl.value = window.URL.createObjectURL(blob);
  } else {
    ElMessage.error('Failed to fetch sequences. Please try again.');
  }
};

// DNA Type Selection
const setDNAType = (type) => {
  dnaType.value = type;
  ElMessage.info(`DNA Type set to ${type}`);
};

// Download result
const downloadFile = () => {
  const link = document.createElement('a');
  link.href = downloadUrl.value;
  link.download = 'seqfetch_result.zip';
  link.click();
  URL.revokeObjectURL(downloadUrl.value); // Clean up URL
};

// Load example data
const loadExample = () => {
  const examples = [
    'BnaA01G0354500ZS',
    'BnaA01G0357800ZS',
    'BnaA01G0231100ZS',
  ];
  form.value.input_text = examples.join('\n');
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
.form-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.upload-box {
  width: 100%;
}

.submit-button {
  margin-top: 20px;
  width: 100%;
}

/* DNA 按钮样式 */
.dna-buttons {
  text-align: center;
  margin-top: 20px;
}

.dna-button {
  width: 120px;
  height: 50px;
  font-size: 18px;
  margin: 0 10px;
}

/* 结果卡片样式 */
.result {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
