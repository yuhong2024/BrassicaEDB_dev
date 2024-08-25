<template>
  <div class="qprimer-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>qPrimer</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/tools">Tools</el-breadcrumb-item>
          <el-breadcrumb-item>qPrimer</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Introduction Section -->
    <el-card class="intro-card">
      <div class="intro-content">
        <img src="@/assets/img/tools/qprimer.png" alt="Primer Image" class="intro-image" />
        <div class="intro-text">
          <h2>qPrimer</h2>
          <p>
            The qPrimer package is a versatile Python toolset designed for the design, verification, annotation, and visualization of qPCR primers, aiding researchers in optimizing genetic analysis and PCR workflows​.
            &nbsp;
              <a href="https://github.com/swu1019lab/qPrimer" target="_blank"> [Github]</a>&nbsp;
              <a href="https://pubmed.ncbi.nlm.nih.gov/39119895/" target="_blank"> [Citation]</a>
            </p>

        </div>
      </div>
    </el-card>

    <!-- 上传表单卡片 -->
    <el-card class="upload-card">
      <el-form ref="uploadForm" :model="form" @submit.prevent="handleSubmit" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Sequence File (.fa):" prop="seq_file" :rules="fileRules">
              <el-upload
                  class="upload-box"
                  action=""
                  :before-upload="beforeUpload"
                  :on-change="handleFileChange('seq_file')"
                  :file-list="seqFileList"
                  :limit="1"
                  :auto-upload="false"
              >
                <el-button type="primary">Choose Sequence File</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="INI File (.ini):" prop="ini_file" :rules="fileRules">
              <el-upload
                  class="upload-box"
                  action=""
                  :before-upload="beforeUpload"
                  :on-change="handleFileChange('ini_file')"
                  :file-list="iniFileList"
                  :limit="1"
                  :auto-upload="false"
              >
                <el-button type="primary">Choose INI File</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" @click="validateAndSubmit" class="submit-button">Submit</el-button>

        <!-- 进度条 -->
        <el-progress
            v-if="uploadProgress > 0"
            :percentage="uploadProgress"
            status="active"
            :text-inside="true"
            :stroke-width="18"
            class="upload-progress"
        ></el-progress>
      </el-form>
    </el-card>

    <!-- 结果展示 -->
    <div v-if="htmlContent" class="result">
      <div class="result-header">
        <div class="left-section">
          <h2>Result</h2>
          <el-button type="success" @click="browseResult">Browse</el-button>
        </div>
        <div class="right-section">
          <el-button type="primary" @click="downloadResult">Download Result</el-button>
        </div>
      </div>
      <div v-html="htmlContent" class="result-content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 表单数据
const form = ref({
  seq_file: null,
  ini_file: null,
});

// 文件列表
const seqFileList = ref([]);
const iniFileList = ref([]);

// 上传进度
const uploadProgress = ref(0);

// 文件校验规则
const fileRules = [
  { required: true, message: 'Please upload a file', trigger: 'change' },
];

// 上传前验证文件大小
const beforeUpload = (file) => {
  const isLimitSize = file.size / 1024 < 50; // 50 KB 限制
  if (!isLimitSize) {
    ElMessage.error('File size exceeds the 50KB limit. Please upload a smaller file.');
  }
  return isLimitSize;
};

// 提交结果的 HTML 内容
const htmlContent = ref('');

// 处理文件变化
const handleFileChange = (type) => (file) => {
  form.value[type] = file.raw;
  if (type === 'seq_file') {
    seqFileList.value = [file];
  } else if (type === 'ini_file') {
    iniFileList.value = [file];
  }
};

// 表单验证并提交
const validateAndSubmit = () => {
  if (!form.value.seq_file || !form.value.ini_file) {
    ElMessage.error('Please select both sequence and INI files.');
    return;
  }

  handleSubmit();
};

// 提交表单数据
const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('seq_file', form.value.seq_file);
  formData.append('ini_file', form.value.ini_file);

  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://brassica.wangyuhong.cn/api/qprimer/designvisualize/', true);

  xhr.setRequestHeader('Accept', 'text/html');

  // 进度条处理
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      uploadProgress.value = Math.round((event.loaded * 100) / event.total);
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      htmlContent.value = xhr.responseText;
    } else {
      ElMessage.error('Error: ' + xhr.statusText);
    }
    uploadProgress.value = 0; // 上传完成后隐藏进度条
  };

  xhr.onerror = () => {
    ElMessage.error('Error: Network Error');
    uploadProgress.value = 0;
  };

  xhr.send(formData);
};

// 下载结果 HTML 文件
const downloadResult = () => {
  const blob = new Blob([htmlContent.value], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'qPrimer_result.html';
  link.click();
  URL.revokeObjectURL(url);
};

// 浏览结果
const browseResult = () => {
  const blob = new Blob([htmlContent.value], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  window.open(url, '_blank');
};
</script>

<style scoped>
.qprimer-page {
  max-width: 1200px; /* 页面宽度 */
  margin: 0 auto;
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

.upload-card {
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

.upload-progress {
  margin-top: 15px;
}

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

.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-section {
  margin-left: auto;
}

.result-content {
  max-height: 1200px;
  overflow-y: auto;
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
}
</style>
