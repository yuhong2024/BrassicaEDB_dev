<template>
  <div class="search-container">
    <h2>Gene ID Search</h2>

    <el-row :gutter="20" class="search-row">
      <!-- 物种选择框 -->
      <el-col :span="6">
        <el-select v-model="selectedSpecies" placeholder="Select Species" style="width: 100%;">
          <el-option label="Brassica carinata" value="A"></el-option>
          <el-option label="Brassica juncea" value="B"></el-option>
          <el-option label="Brassica napus" value="C"></el-option>
          <el-option label="Brassica nigra" value="D"></el-option>
          <el-option label="Brassica oleracea" value="E"></el-option>
          <el-option label="Brassica rapa" value="F"></el-option>
        </el-select>
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
        <span>Example Gene ID</span>
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

const selectedSpecies = ref('');
const geneId = ref('');
const router = useRouter();

const searchGene = () => {
  if (!selectedSpecies.value) {
    ElMessage.warning('请选择物种');
    return;
  }

  if (!geneId.value) {
    ElMessage.warning('请输入基因ID');
    return;
  }

  // 跳转到搜索结果页面
  router.push({ name: 'SearchResult', params: { geneId: geneId.value } });
};

const fillGeneId = (exampleGeneId) => {
  geneId.value = exampleGeneId;
};
</script>

<style scoped>
.search-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
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
}

.example-id {
  margin-right: 15px;
  padding: 0 8px;
}
</style>
