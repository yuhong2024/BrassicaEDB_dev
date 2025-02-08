<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // 引入 useRoute 以获取路由参数

const route = useRoute(); // 获取当前路由实例
const geneId = ref(''); // 保存 gene_id
const result = ref(null); // 保存结果数据

onMounted(() => {
  geneId.value = route.query.gene_id as string; // 从路由查询参数中获取 gene_id
  result.value = JSON.parse(route.query.result as string); // 从路由查询参数中获取并解析结果
});
</script>

<template>
  <div style="padding: 20px;">
    <h1>Feature Result</h1>

    <!-- 显示 gene_id -->
    <div>
      <h3>Gene ID:</h3>
      <p>{{ geneId }}</p>
    </div>

    <!-- 显示结果 -->
    <div>
      <h3>Result:</h3>
      <pre style="background: #f5f5f5; padding: 10px; border: 1px solid #ccc;">
        {{ result }}
      </pre>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
