<template>
  <el-card class="input-card">
    <!-- 标题 -->
    <h2 class="input-title">TF Network</h2>

    <!-- Species 输入框 -->
    <el-form :model="form" label-width="120px" class="form-container">
      <el-form-item label="Species">
        <el-select
            v-model="form.species"
            placeholder="Select Species"
            @change="updateExampleGene"
            style="width: 100%;"
        >
          <el-option
              v-for="(example, species) in speciesExamples"
              :key="species"
              :label="species"
              :value="species"
          />
        </el-select>
      </el-form-item>

      <!-- Gene ID 输入框 -->
      <el-form-item label="Gene ID">
        <el-input
            v-model="form.geneId"
            placeholder="Enter Gene ID"
            style="width: 100%;"
        />
      </el-form-item>

      <!-- 按钮 -->
      <div class="button-row">
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
        <el-button type="text" @click="fillExampleGene">Example</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// 表单数据
const form = ref({
  species: "",
  geneId: "",
});

// 示例基因数据
const speciesExamples = {
  "Brassica juncea": "BjuVA01G00010",
  "Brassica carinata": "BcaVA01G00010",
  "Brassica napus": "BnaVA01G00010",
  "Brassica nigra": "BnpVA01G00010",
  "Brassica rapa": "BraVA01G00010",
  "Brassica oleracea": "BojVA01G00010",
};

// Emits 定义
const emits = defineEmits(["submit"]); // 定义一个 submit 事件

// 填充示例基因ID
const fillExampleGene = () => {
  if (form.value.species && speciesExamples[form.value.species]) {
    form.value.geneId = speciesExamples[form.value.species];
  } else {
    form.value.geneId = "Please select a species first";
  }
};

// 提交表单
const handleSubmit = () => {
  emits("submit", form.value); // 向父组件提交表单数据
};

// 更新示例基因ID
const updateExampleGene = () => {
  fillExampleGene();
};
</script>

<style scoped>
.input-card {
  width: 99%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
