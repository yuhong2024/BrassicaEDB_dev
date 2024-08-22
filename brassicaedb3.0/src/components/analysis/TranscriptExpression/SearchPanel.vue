<template>
  <el-card class="search-card" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="selectedSpecies" placeholder="选择物种" style="width: 100%;">
          <el-option label="Species A" value="A"></el-option>
          <el-option label="Species B" value="B"></el-option>
          <el-option label="Species C" value="C"></el-option>
          <el-option label="Species D" value="D"></el-option>
          <el-option label="Species E" value="E"></el-option>
          <el-option label="Species F" value="F"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-input v-model="geneId" placeholder="请输入序列" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="searchGene" style="width: 100%;">搜索</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="example-row" style="margin-top: 20px;">
      <el-col :span="18">
        <span>示例序列:</span>
        <el-button @click="fillGeneId('BnaA01G0000900ZS')" type="text">BnaA01G0000900ZS</el-button>
      </el-col>
      <el-col :span="6">
        <el-upload
            class="upload-demo"
            drag
            action=""
            :auto-upload="false"
            :before-upload="handleFileUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">拖拽文件或点击上传</div>
          <div class="el-upload__tip">仅支持txt文件</div>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

const selectedSpecies = ref('');
const geneId = ref('');

const searchGene = () => {
  // 搜索逻辑
};

const fillGeneId = (exampleGeneId) => {
  geneId.value = exampleGeneId;
};

const handleFileUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    geneId.value = event.target.result.trim();
  };
  reader.readAsText(file);
  return false;
};
</script>

<style scoped>
.search-card {
  margin-bottom: 20px;
}

.example-row {
  margin-top: 10px;
}
</style>
