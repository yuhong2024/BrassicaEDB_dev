<template>
  <div class="search-container">
    <h2>Gene ID Search</h2>

    <el-row :gutter="20" class="search-row">
      <!-- 物种选择框 -->
      <el-col :span="6">
        <el-select v-model="selectedSpecies" placeholder="Select Species" style="width: 100%;">
          <el-option label="Brassica carinata  " value="A"></el-option>
          <el-option label="Brassica juncea    " value="B"></el-option>
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
        <el-button type="primary" @click="searchGene" style="width: 100%;">搜索</el-button>
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

    <!-- 搜索结果表单 -->
    <el-form v-if="searchResult" label-width="120px" class="result-form">
      <el-form-item label="Gene ID">
        <el-input v-model="searchResult.gene_id" disabled />
      </el-form-item>
      <el-form-item label="Chr">
        <el-input v-model="searchResult.chr" disabled />
      </el-form-item>
      <el-form-item label="Start">
        <el-input v-model="searchResult.start" disabled />
      </el-form-item>
      <el-form-item label="End">
        <el-input v-model="searchResult.end" disabled />
      </el-form-item>
      <el-form-item label="Strand">
        <el-input v-model="searchResult.strand" disabled />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="searchResult.description" type="textarea" disabled />
      </el-form-item>
      <el-form-item label="Preferred name">
        <el-input v-model="searchResult.preferred_name" disabled />
      </el-form-item>
      <el-form-item label="GOs">
        <el-input v-model="searchResult.gos" disabled />
      </el-form-item>
      <el-form-item label="KEGG KO">
        <el-input v-model="searchResult.kegg_ko" disabled />
      </el-form-item>
      <el-form-item label="PFAMs">
        <el-input v-model="searchResult.pfams" disabled />
      </el-form-item>
      <el-form-item label="Damor v1.0">
        <el-input v-model="searchResult.damor_v1_0" disabled />
      </el-form-item>
      <el-form-item label="Westar v1.0">
        <el-input v-model="searchResult.westar_v1_0" disabled />
      </el-form-item>
      <el-form-item label="Kale">
        <el-input v-model="searchResult.kale" disabled />
      </el-form-item>
    </el-form>

    <!-- 下载按钮 -->
    <el-button type="primary" @click="downloadResults" v-if="searchResult" style="width: 100%;">下载结果</el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const props = defineProps({
  species: {
    type: String,
    default: '' // 默认不传入物种，提示用户选择物种
  }
});

const emit = defineEmits(['search-complete']);

const selectedSpecies = ref(props.species);
const geneId = ref('');
const searchResult = ref(null);

// 监视 searchResult 变化，通知父组件
watch(searchResult, (newResult) => {
  emit('search-complete', !!newResult);
});

const searchGene = async () => {
  if (!selectedSpecies.value) {
    ElMessage.warning('请选择物种');
    return;
  }

  if (!geneId.value) {
    ElMessage.warning('请输入基因ID');
    return;
  }

  try {
    const response = await axios.get(
        `https://brassica.wangyuhong.cn/api/genefeaturesearch/?search=${geneId.value}`
    );

    if (response.data && response.data.length > 0) {
      searchResult.value = response.data[0];
    } else {
      ElMessage.error('未找到匹配的基因ID');
      searchResult.value = null;
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);
    ElMessage.error('读取基因数据失败');
  }
};

const fillGeneId = (exampleGeneId) => {
  geneId.value = exampleGeneId;
};

const downloadResults = () => {
  if (!searchResult.value) return;

  const dataStr = JSON.stringify(searchResult.value, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${geneId.value}_result.json`;
  link.click();
  URL.revokeObjectURL(url);
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

.result-form {
  margin-top: 20px;
}

.el-button {
  margin-top: 20px;
}
</style>
