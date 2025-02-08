<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const geneId = ref(''); // 输入的 gene_id
const result = ref(null); // 保存请求结果
const errorMessage = ref(''); // 保存错误信息

// 自动填充示例基因
const fillExampleGeneId = () => {
  geneId.value = 'BnaA01G0001500ZS'; // 设置示例基因
};

// 请求函数
const fetchGeneData = async () => {
  if (!geneId.value) {
    errorMessage.value = '请输入 gene_id!';
    result.value = null;
    return;
  }

  try {
    errorMessage.value = ''; // 清空错误信息
    const response = await axios.get('https://brassicaedb.com/api/genefeaturesearch/', {
      params: { gene_id: geneId.value }
    });
    result.value = response.data; // 保存返回结果
  } catch (error) {
    console.error('请求出错:', error);
    errorMessage.value = '请求失败，请检查 gene_id 或稍后重试。';
    result.value = null;
  }
};
</script>

<template>
  <div style="padding: 20px;">
    <h1>Gene Feature Search</h1>

    <!-- 输入框 -->
    <div>
      <label for="geneId">输入 Gene ID：</label>
      <input
          v-model="geneId"
          type="text"
          id="geneId"
          placeholder="例如：BnaA01G0001500ZS"
          style="margin-right: 10px; padding: 5px;"
      />
      <button @click="fetchGeneData" style="padding: 5px 10px; margin-right: 10px;">提交</button>
      <button @click="fillExampleGeneId" style="padding: 5px 10px; background-color: #007bff; color: white;">填充示例</button>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage" style="color: red; margin-top: 10px;">
      {{ errorMessage }}
    </div>

    <!-- 返回结果 -->
    <div v-if="result" style="margin-top: 20px;">
      <h3>返回结果：</h3>
      <pre style="background: #f5f5f5; padding: 10px; border: 1px solid #ccc;">
        {{ result }}
      </pre>
    </div>
  </div>
</template>

<style scoped>
/* 添加样式以优化用户界面 */
input {
  width: 300px;
}
button {
  cursor: pointer;
  border: none;
  border-radius: 3px;
}
button:first-of-type {
  background-color: #4caf50;
  color: white;
}
button:first-of-type:hover {
  background-color: #45a049;
}
button:last-of-type {
  background-color: #007bff;
  color: white;
}
button:last-of-type:hover {
  background-color: #0056b3;
}
</style>
