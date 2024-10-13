<template>
  <div class="container">
    <!-- 统一的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>qPrimer</h1>
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

    <!-- Sequence Input Section -->
    <el-card class="input-card">
      <h3>Sequence Input</h3>
      <el-form ref="uploadForm" :model="form" label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Paste Sequence Text:" prop="seq_text">
              <el-input
                  v-model="form.seq_text"
                  type="textarea"
                  placeholder="Paste sequence here..."
                  rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider>OR</el-divider>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Upload Sequence File (.fa):" prop="seq_file">
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
        </el-row>
      </el-form>
    </el-card>

    <!-- Parameter Settings Section -->
    <el-card class="parameter-card">
      <h3>Parameter Settings</h3>
      <el-form :model="params" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="min GC%">
              <el-input v-model="params.primer_min_gc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="max GC%">
              <el-input v-model="params.primer_max_gc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="opt GC%">
              <el-input v-model="params.primer_opt_gc_percent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="opt Tm">
              <el-input v-model="params.primer_opt_tm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="min Tm">
              <el-input v-model="params.primer_min_tm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="max Tm">
              <el-input v-model="params.primer_max_tm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="min product size">
              <el-input v-model="params.primer_product_size_range_min"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="max product size">
              <el-input v-model="params.primer_product_size_range_max"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- Submit Button and Progress Bar -->
    <el-card class="submit-card">
      <el-button type="primary" @click="validateAndSubmit" class="submit-button">Submit</el-button>
      <el-progress
          v-if="uploadProgress > 0"
          :percentage="uploadProgress"
          status="active"
          :text-inside="true"
          :stroke-width="18"
          class="upload-progress"
      ></el-progress>
    </el-card>

    <!-- Results Section -->
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
const breadcrumbs = [
  {name: 'Home', path: '/'},
  {name: 'Tools', path: '/tools'},
  {name: 'qPrimer', path: '/tools/qprimer'}
];

// 表单数据和方法代码同之前一样
import {ref} from 'vue';
import {ElMessage} from 'element-plus';

// 表单数据
const form = ref({
  seq_text: '',  // 用于粘贴序列
  seq_file: null,
  ini_file: null,
});

// 文件列表
const seqFileList = ref([]);
const iniFileList = ref([]);

// 上传进度
const uploadProgress = ref(0);

// 参数设置
const params = ref({
  primer_task: 'generic',
  primer_num_return: 10,
  primer_pick_left_primer: 1,
  primer_pick_right_primer: 1,
  primer_min_gc: 40,
  primer_max_gc: 60,
  primer_opt_gc_percent: 50,
  primer_opt_size: 22,
  primer_min_size: 18,
  primer_max_size: 28,
  primer_opt_tm: 60,
  primer_min_tm: 58,
  primer_max_tm: 64,
  primer_pair_max_diff_tm: 3,
  primer_product_size_range_min: 80,
  primer_product_size_range_max: 300,
  primer_thermodynamic_oligo_alignment: 1,
  PRIMER_SECONDARY_STRUCTURE_ALIGNMENT: 1,
  primer_annealing_temp: 50,
  PRIMER_MAX_POLY_X: 5,
  PRIMER_MAX_SELF_ANY: 4,
  PRIMER_MAX_SELF_END: 3,
  PRIMER_PAIR_MAX_COMPL_ANY: 4,
  PRIMER_PAIR_MAX_COMPL_END: 3,
  PRIMER_MAX_END_STABILITY: 9,
});


// 上传前验证文件大小
const beforeUpload = (file) => {
  const isLimitSize = file.size / 1024 < 50; // 50 KB 限制
  if (!isLimitSize) {
    ElMessage.error('File size exceeds the 50KB limit. Please upload a smaller file.');
  }
  return isLimitSize;
};

// 处理文件变化
const handleFileChange = (type) => (file) => {
  form.value[type] = file.raw;
  if (type === 'seq_file') {
    seqFileList.value = [file];
    form.value.seq_text = ''; // 清空文本框，避免混淆
  } else if (type === 'ini_file') {
    iniFileList.value = [file];
  }
};

// 表单验证并提交
const validateAndSubmit = () => {
  if (!form.value.seq_text && !form.value.seq_file) {
    ElMessage.error('Please provide either a sequence text or upload a sequence file.');
    return;
  }

  handleSubmit();
};

// 提交表单数据
const handleSubmit = async () => {
  const formData = new FormData();

  if (form.value.seq_file) {
    formData.append('seq_file', form.value.seq_file);
  } else {
    formData.append('seq_text', form.value.seq_text);
  }

  if (form.value.ini_file) {
    formData.append('ini_file', form.value.ini_file);
  } else {
    formData.append('params', JSON.stringify(params.value));
  }

  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://brassica.wangyuhong.cn/api/qprimer/designvisualize/', true);

  xhr.setRequestHeader('Accept', 'text/html');

  console.log(xhr.responseText);
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

  console.log(formData)

  xhr.send(formData);
};

// 提交结果的 HTML 内容
const htmlContent = ref('');

// 下载结果 HTML 文件
const downloadResult = () => {
  const blob = new Blob([htmlContent.value], {type: 'text/html'});
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'qPrimer_result.html';
  link.click();
  URL.revokeObjectURL(url);
};

// 浏览结果
const browseResult = () => {
  const blob = new Blob([htmlContent.value], {type: 'text/html'});
  const url = window.URL.createObjectURL(blob);
  window.open(url, '_blank');
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

/* Introduction 样式 */
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

/* 输入和参数卡片样式 */
.input-card,
.parameter-card,
.submit-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 上传框样式 */
.upload-box {
  width: 100%;
}

/* 提交按钮样式 */
.submit-button {
  margin-top: 10px;
  width: 100%;
}

/* 上传进度条样式 */
.upload-progress {
  margin-top: 15px;
}

/* 结果显示样式 */
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
