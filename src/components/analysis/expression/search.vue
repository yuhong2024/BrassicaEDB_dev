<template>
  <div class="transcript-page">
    <!-- 面包屑导航 -->
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

    <!-- Introduction 板块 -->
    <el-card class="intro-card">
      <div class="intro-content">
        <img
            src="https://assets.entrepreneur.com/content/3x2/2000/20150825183914-dna-science-double-helix-.jpeg"
            alt="Brassica Image"
            class="intro-image"
        />
        <div class="intro-text">
          <h2>Transcript Expression</h2>
          <p>
            The transcriptome level provides Brassica researchers with a comprehensive and
            user-friendly interactive tool for gene expression profiling data, the Brassica
            Expression Database (BrassicaEDB). Using this database, researchers can quickly
            retrieve target gene expression level data, elucidate gene function, and advance
            Brassica breeding at the transcriptome level.
          </p>
        </div>
      </div>
    </el-card>

    <!-- 搜索功能块（卡片式布局） -->
    <el-card class="search-card">
      <h3>基因表达搜索</h3>
      <el-form :model="form" label-width="100px">
        <!-- 输入基因ID -->
        <el-form-item label="输入基因ID">
          <el-input
              type="textarea"
              v-model="form.geneIds"
              rows="6"
              placeholder="每行一个基因ID"
              resize="none"
          ></el-input>
        </el-form-item>

        <!-- 选择物种 -->
        <el-form-item label="选择物种">
          <el-select v-model="form.species" placeholder="选择物种">
            <el-option label="Species" value="test"></el-option>
            <el-option label="Species A" value="species_a"></el-option>
            <el-option label="Species B" value="species_b"></el-option>
          </el-select>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="emitSearch">
            Search
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 如果有返回文件显示下载按钮 -->
      <div v-if="downloadLink" class="download-section">
        <el-divider></el-divider>
        <h4>Result</h4>
        <el-button type="success" icon="el-icon-download" @click="downloadFile">
          Download
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        species: 'test', // 默认选择为 'test'
        geneIds: `BnaA01G0000100ZS\nBnaA01G0000200ZS\nBnaA01G0000300ZS\nBnaA01G0000400ZS\nBnaA01G0000500ZS\nBnaA01G0000600ZS`, // 默认的基因ID
      },
      downloadLink: null, // 存储返回的下载链接
    };
  },
  methods: {
    // 调用API之前的准备工作 (暂时忽略，使用本地数据读取)
    async fetchTranscriptome() {
      try {
        const geneIdsArray = this.form.geneIds.split('\n').map((id) => id.trim()).filter((id) => id);

        const formData = {
          species: this.form.species,
          gene_ids: geneIdsArray,
        };

        // 配置POST请求
        const config = {
          method: 'post',
          url: 'https://brassica.wangyuhong.cn/api/transcriptome/',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // 设置响应类型为 blob 以便处理文件
          data: formData,
        };

        // 发送请求并获取压缩包文件
        const response = await axios(config);

        // 创建下载链接并显示下载按钮
        const blob = new Blob([response.data], { type: 'application/zip' });
        this.downloadLink = URL.createObjectURL(blob);
      } catch (error) {
        console.error(error);
        alert('请求失败，请检查API和输入数据');
      }
    },

    // 触发父组件的搜索事件
    emitSearch() {
      this.$emit('search'); // 向父组件发出 'search' 事件
    },

    // 文件下载方法
    downloadFile() {
      const link = document.createElement('a');
      link.href = this.downloadLink;
      link.setAttribute('download', 'transcriptome_data.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>






<style scoped>
.transcript-page {
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

.intro-card,
.search-card {
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

.carousel-card {
  margin-top: 20px;
}

.carousel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.search-card {
  padding: 20px;
}

.download-section {
  margin-top: 20px;
  text-align: center;
}
</style>
