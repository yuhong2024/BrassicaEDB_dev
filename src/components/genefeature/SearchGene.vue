<template>
  <div class="search-container">
    <h2>Gene ID Search</h2>

    <el-row :gutter="20" class="search-row">
      <!-- 基因ID输入框 -->
      <el-col :span="18" >
        <el-input v-model="geneId" placeholder="Please enter the ID sequence" style="width: 100%;height: 50px" :loading="loading" />
      </el-col>


      <!-- 搜索按钮 -->
      <el-col :span="6">
        <el-button type="primary" @click="searchGene" style="width: 100%;height: 50px" :loading="loading">Search</el-button>
      </el-col>
    </el-row>

    <!-- 示例基因ID -->
    <el-row class="example-genes" :gutter="20">
      <el-col :span="4">
        <span class="example-title">Example Genes</span>
      </el-col>
      <el-col :span="20">
        <div class="gene-grid">
          <el-button @click="fillGeneId('BjuVB08G30170')" type="text" class="example-id">BjuVB08G30170</el-button>
          <el-button @click="fillGeneId('Bca101B8G015920')" type="text" class="example-id">Bca101B8G015920</el-button>
          <el-button @click="fillGeneId('BraA03g028350.4C')" type="text" class="example-id">BraA03g028350.4C</el-button>
          <el-button @click="fillGeneId('BolC07g001570.2J')" type="text" class="example-id">BolC07g001570.2J</el-button>
          <el-button @click="fillGeneId('BniB03g030690.2N')" type="text" class="example-id">BniB03g030690.2N</el-button>
          <el-button @click="fillGeneId('BnaA07G0118700ZS')" type="text" class="example-id">BnaA07G0118700ZS</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const selectedSpecies = ref('');
const geneId = ref('');
const router = useRouter();
const loading = ref(false);

const searchGene = async () => {
  if (!geneId.value) {
    ElMessage.warning('Please enter a Gene ID');
    return;
  }

  loading.value = true;
  try {
    const response = await axios.get(`https://brassicaedb.com/api/genefeaturesearch/?gene_id=${geneId.value}`);

    if (response.data && response.data.genefeature && response.data.genefeature.length > 0) {
      // 有结果时才跳转
      router.push({ name: 'SearchResult', params: { geneId: geneId.value } });
    } else {
      ElMessage.error('Error: Gene not found. Please check and try again.');
      geneId.value = ''; // 清空输入框
    }
  } catch (error) {
    ElMessage.error('Error: Gene not found. Please check and try again.');
    geneId.value = ''; // 清空输入框
  } finally {
    loading.value = false;
  }
};

const fillGeneId = (exampleGeneId) => {
  geneId.value = exampleGeneId;
};
</script>

<style scoped>
.search-container {
  max-width: 100%;
  margin: 0 auto;
  padding:1px;

}

.search-container h2 {
  margin-bottom: 10px; /* 调整标题与下面行之间的间距 */
  font-size: 1.5rem; /* 适当调整标题字体大小（可选） */
  color: #333; /* 标题颜色 */
}

.search-row {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding:1px;


}

.example-genes {
  margin: 10px 0;
  font-size: 10 rem; /* 适当调整标题字体大小（可选） */
}

.example-title {
  font-size: 14px;
  color: #333;
  font-weight: 400;
}

.gene-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
}

.example-id {
  color: #333;
  padding: 2px 5px;
  font-size: 18px;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  font-weight: 500;
}

.example-id:hover {
  color: #FFFFFF !important;
  background-color: #409EFF;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  transform: scale(1.05);
}

/* 覆盖 element-plus 的默认样式 */
:deep(.el-button--text) {
  color: #333;
  font-weight: 500;
  font-size: 18px;
}

:deep(.el-button--text:hover) {
  color: #FFFFFF !important;
  font-weight: 600;
  font-size: 18px;
}

/* 添加加载状态的样式 */
:deep(.el-input.is-loading .el-input__wrapper) {
  background-color: #f5f7fa;
}
</style>
