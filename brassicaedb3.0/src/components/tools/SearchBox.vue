<template>
  <el-card class="search-box-card" shadow="never">
    <div class="search-box">
      <h3>Search Homology</h3>
      <el-row :gutter="10" align="middle">
        <el-col :span="12">
          <el-input v-model="geneId" placeholder="Enter Gene ID" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleSearch">Search</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const geneId = ref('');
const router = useRouter();

const handleSearch = () => {
  if (geneId.value) {
    router.push({ name: 'Tools', query: { geneId: geneId.value } });
  }
};
</script>

<style scoped>
.search-box-card {
  margin-bottom: 20px;
}

.search-box h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.el-input,
.el-button {
  width: 100%;
}
</style>
