<template>
  <el-card class="search-gene-card" shadow="hover">
    <div class="search-gene">
      <el-row :gutter="20">
        <!-- 物种选择框 -->
        <el-col :span="6">
          <el-select v-model="selectedSpecies" placeholder="选择物种">
            <el-option v-for="(species, index) in speciesOptions" :key="index" :label="species" :value="species"></el-option>
          </el-select>
        </el-col>

        <!-- 基因ID输入框 -->
        <el-col :span="12">
          <el-input v-model="geneId" placeholder="输入基因ID" />
        </el-col>

        <!-- 搜索按钮 -->
        <el-col :span="6">
          <el-button type="primary" @click="searchGene">搜索</el-button>
        </el-col>
      </el-row>

      <!-- 搜索结果展示 -->
      <el-table v-if="searchResults.length" :data="searchResults" style="margin-top: 20px;">
        <el-table-column v-for="(value, key) in searchResults[0]" :key="key" :prop="key" :label="key" />
      </el-table>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const speciesOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
const selectedSpecies = ref('');
const geneId = ref('');
const searchResults = ref([]);

const searchGene = async () => {
  if (!selectedSpecies.value || !geneId.value) {
    alert('请先选择物种并输入基因ID');
    return;
  }

  try {
    const response = await axios.get(`https://brassica.wangyuhong.cn/api/gossearch/1/?species=${selectedSpecies.value}&gene_id=${geneId.value}`);
    searchResults.value = [response.data]; // 假设API返回的数据是一个数组
  } catch (error) {
    console.error('Error fetching gene information:', error);
    alert('搜索失败，请稍后重试');
  }
};
</script>

<style scoped>
.search-gene {
  margin-bottom: 20px;
}

.search-gene-card {
  margin-bottom: 20px;
  padding: 20px;
}
</style>
