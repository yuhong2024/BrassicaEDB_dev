<template>
  <div class="search-panel">
    <h2>Quick Search</h2>
    <div class="search-inputs">
      <el-select v-model="selected" placeholder="Select Species">
        <el-option label="Sus scrofa" value="sus-scrofa"></el-option>
        <el-option label="Homo sapiens" value="homo-sapiens"></el-option>
      </el-select>
      <el-input v-model="input" placeholder="Please enter"></el-input>
      <el-button type="primary" icon="el-icon-search">Search</el-button>
    </div>
    <div class="examples">
      <span>e.g. </span>
      <el-link>IGF2</el-link>
      <el-link>ENSSSCG00000035293</el-link>
      <el-link>1:1469132-1596442</el-link>
      <el-link>GO:0008083</el-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
const input = ref('');
</script>

<style scoped>
.search-panel {
  background-color: #f8f9fa;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.search-panel h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.search-inputs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.examples {
  margin-top: 1rem;
}

.examples span {
  font-weight: bold;
}

.examples a {
  margin-right: 0.5rem;
  color: #42b983;
}
</style>
