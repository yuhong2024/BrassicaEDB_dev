<template>
  <div class="gene-result-container">
    <h2>Gene ID Search Result</h2>

    <el-row :gutter="20" class="result-row">
      <el-col :span="24">
        <el-form label-width="120px" class="result-form">
          <el-form-item label="Gene ID">
            <el-input v-model="geneResult.gene_id" disabled />
          </el-form-item>
          <el-form-item label="Chr">
            <el-input v-model="geneResult.chr" disabled />
          </el-form-item>
          <el-form-item label="Start">
            <el-input v-model="geneResult.start" disabled />
          </el-form-item>
          <el-form-item label="End">
            <el-input v-model="geneResult.end" disabled />
          </el-form-item>
          <el-form-item label="Strand">
            <el-input v-model="geneResult.strand" disabled />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="geneResult.description" type="textarea" disabled />
          </el-form-item>
          <el-form-item label="Preferred name">
            <el-input v-model="geneResult.preferred_name" disabled />
          </el-form-item>
          <el-form-item label="GOs">
            <el-input v-model="geneResult.gos" disabled />
          </el-form-item>
          <el-form-item label="KEGG KO">
            <el-input v-model="geneResult.kegg_ko" disabled />
          </el-form-item>
          <el-form-item label="PFAMs">
            <el-input v-model="geneResult.pfams" disabled />
          </el-form-item>
          <el-form-item label="Damor v1.0">
            <el-input v-model="geneResult.damor_v1_0" disabled />
          </el-form-item>
          <el-form-item label="Westar v1.0">
            <el-input v-model="geneResult.westar_v1_0" disabled />
          </el-form-item>
          <el-form-item label="Kale">
            <el-input v-model="geneResult.kale" disabled />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>





    <!-- 下载按钮 -->
    <el-button type="primary" @click="downloadResults" style="width: 100%;">下载结果</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const geneResult = ref(route.params.searchResult); // 从路由参数中获取搜索结果

const downloadResults = () => {
  if (!geneResult.value) return;

  const dataStr = JSON.stringify(geneResult.value, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${geneResult.value.gene_id}_result.json`;
  link.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.gene-result-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa, #80deea); /* 背景渐变 */
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #004d40; /* 标题颜色 */
  margin-bottom: 20px;
}

.result-form {
  margin-top: 20px;
}

.el-button {
  margin-top: 20px;
  background-color: #00796b; /* 按钮背景色 */
  border-color: #00796b;
  color: #fff;
}

.el-button:hover {
  background-color: #004d40; /* 按钮悬停背景色 */
  border-color: #004d40;
}
</style>
