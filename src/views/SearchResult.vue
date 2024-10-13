<template>
  <div class="search-result-container">
    <h2 class="page-title">Gene ID Search Results</h2>

    <!-- Part 1: 基因基础信息 -->
    <el-card v-if="searchResult" class="result-card" shadow="hover">
      <div class="card-header">Part 1: Basic Gene Information</div>

      <!-- 第一行: Gene ID, Chromosome, Start Position -->
      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="Gene ID">
            <el-input v-model="searchResult.gene_id" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Chromosome">
            <el-input v-model="searchResult.chr" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Preferred Name">
            <el-input v-model="searchResult.preferred_name" disabled />
          </el-form-item>
        </el-col>



      </el-row>

      <!-- 第二行: End Position, Strand, Description -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="Start Position">
            <el-input v-model="searchResult.start" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="End Position">
            <el-input v-model="searchResult.end" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Strand">
            <el-input v-model="searchResult.stand" disabled />
          </el-form-item>
        </el-col>

      </el-row>

      <!-- 第三行: Preferred Name, GOs, KEGG KO -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="GOs">
            <el-input v-model="searchResult.gos" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="KEGG KO">
            <el-input v-model="searchResult.kegg_ko" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="PFAMs">
            <el-input v-model="searchResult.pfams" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第四行: Description-->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Description">
            <el-input v-model="searchResult.description" disabled type="textarea" :rows="3" />
          </el-form-item>
        </el-col>
      </el-row>




    </el-card>


    <!-- Part 2: 版本信息 -->
    <el-card v-if="searchResult" class="result-card" shadow="hover">
      <div class="card-header">Part 2: Other genome</div>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Damor v1.0">
            <el-input v-model="searchResult.damor_v1_0" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Westar v1.0">
            <el-input v-model="searchResult.westar_v1_0" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Kale&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
            <el-input v-model="searchResult.kale" disabled />
          </el-form-item>
        </el-col>
      </el-row>


    </el-card>

    <!-- 下载按钮 -->
    <el-button v-if="searchResult" type="primary" @click="downloadResults" style="width: 100%; margin-top: 20px;">
      Download Results
    </el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const geneId = route.params.geneId || '';  // 从路由参数获取 geneId
const searchResult = ref(null);  // 存储搜索结果

// 页面挂载时加载数据
onMounted(async () => {
  if (geneId) {
    try {
      const response = await axios.get(`https://brassica.wangyuhong.cn/api/genefeaturesearch/?search=${geneId}`);
      if (response.data && response.data.length > 0) {
        searchResult.value = response.data[0];
      } else {
        console.warn('No matching Gene ID found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    console.warn('No Gene ID provided.');
  }
});

// 下载结果为 JSON 文件
const downloadResults = () => {
  if (searchResult.value) {
    const dataStr = JSON.stringify(searchResult.value, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${geneId}_result.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
};
</script>

<style scoped>
.search-result-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(120deg, #a6c1ee, #fbc2eb);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.result-card {
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
}

.card-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #409EFF;
}

.el-form-item label {
  font-weight: bold;
  color: #42b983;
}

.el-form-item input, .el-form-item textarea {
  font-size: 14px;
  color: #333;
}

.el-button {
  background-color: #42b983;
  color: white;
}

.el-button:hover {
  background-color: #36a96b;
}
</style>
