<template>
  <div class="search-container">
    <h2>Gene ID Search</h2>

    <el-row :gutter="20" class="search-row">
      <!-- 隐藏选择框并默认物种 -->
      <el-col :span="6">
        <el-input v-model="selectedSpeciesLabel" disabled style="width: 100%;" />
      </el-col>

      <!-- 基因ID输入框 -->
      <el-col :span="12">
        <el-input v-model="geneId" placeholder="Please enter the ID sequence" style="width: 100%;" />
      </el-col>

      <!-- 搜索按钮 -->
      <el-col :span="6">
        <el-button type="primary" @click="searchGene" style="width: 100%;">Search</el-button>
      </el-col>
    </el-row>

    <!-- 示例基因ID -->
    <el-row class="example-genes" :gutter="20">
      <el-col :span="4">
        <span>Example Genes</span>
      </el-col>
      <el-col :span="20">
        <el-button @click="fillGeneId('BnaA01G0000100ZS')" type="text" class="example-id">BnaA01G0000100ZS</el-button>
        <el-button @click="fillGeneId('BnaA01G0000200ZS')" type="text" class="example-id">BnaA01G0000200ZS</el-button>
        <el-button @click="fillGeneId('BnaA01T0001900ZS')" type="text" class="example-id">BnaA01T0001900ZS</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 默认物种
const selectedSpecies = ref('F');
const selectedSpeciesLabel = ref('Brassica rapa'); // 默认显示的物种名称

const geneId = ref('');
const router = useRouter();

const searchGene = () => {
  if (!geneId.value) {
    ElMessage.warning('请输入基因ID');
    return;
  }

  // 跳转到搜索结果页面
  router.push({ name: 'SearchResult', params: { species: selectedSpecies.value, geneId: geneId.value } });
};

const fillGeneId = (exampleGeneId) => {
  geneId.value = exampleGeneId;
};
</script>

<style scoped>
.search-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 5px;
}

.search-row {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.example-genes {
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: #333;
  font-weight: bold; /* 加粗字体 */
  font-size: 1.0rem; /* 增大字体 */
}

.example-id {
  margin-right: 15px;
  padding: 0 8px;
  color: #333;
  font-weight: bold; /* 加粗字体 */
  font-size: 1.2rem; /* 增大字体 */
}
</style>
