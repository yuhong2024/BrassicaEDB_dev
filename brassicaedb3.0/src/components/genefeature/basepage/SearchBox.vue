<template>
  <el-card class="quick-search-card" shadow="never">
    <div class="quick-search">
      <h3>Quick Search</h3>
      <el-row :gutter="10" align="middle">
        <el-col :span="8">
          <el-select v-model="selectedSpecies" placeholder="Select Species">
            <el-option
                v-for="item in speciesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-input v-model="searchQuery" placeholder="Please enter" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleSearch">Search</el-button>
        </el-col>
      </el-row>
      <div class="example-text">
        <p><strong>e.g.</strong> IGF2 ENSSSCG00000035293 1:1469132-1596442 GO:0008083</p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

const selectedSpecies = ref('');
const searchQuery = ref('');

const speciesOptions = [
  { value: 'species1', label: 'Species 1' },
  { value: 'species2', label: 'Species 2' },
  { value: 'species3', label: 'Species 3' }
];

const handleSearch = () => {
  console.log(`Searching for: ${searchQuery.value} in ${selectedSpecies.value}`);
};
</script>

<style scoped>
.quick-search-card {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  width: 100%; /* 缩小整体宽度 */
  margin: 0 auto; /* 居中显示 */
}

.quick-search h3 {
  margin-bottom: 10px;
  font-size: 1.2rem; /* 缩小字体大小 */
  color: #333;
}

.el-row {
  margin-bottom: 5px; /* 减少行间距 */
}

.el-col {
  display: flex;
  align-items: center;
}

.el-select,
.el-input,
.el-button {
  width: 100%;
}

.example-text p {
  color: #3abca7;
  font-size: 0.8rem; /* 缩小字体大小 */
  margin-top: 10px; /* 减少顶部间距 */
}
</style>
