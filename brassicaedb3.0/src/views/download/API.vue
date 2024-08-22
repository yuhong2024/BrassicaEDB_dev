<template>
  <div class="container">
    <h2>查询</h2>
    <button @click="fetchApiInfo">查看API</button>

    <div class="result-section" v-if="apiData">
      <h3>返回的信息</h3>
      <pre>{{ apiData }}</pre>
    </div>

    <!-- 新增的可视化展示按钮 -->
    <div class="section">
      <button @click="navigateToVisualization">可视化展示</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

// 定义变量来存储 API 返回的数据
const apiData = ref<string>('')

// 定义函数来获取 API 信息
const fetchApiInfo = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/')
    apiData.value = JSON.stringify(response.data, null, 2) // 将数据格式化为 JSON 字符串
  } catch (error) {
    console.error('API 请求失败:', error)
    apiData.value = `请求失败: ${error.message}`
  }
}

// 新增的导航函数，用于跳转到指定的页面
const navigateToVisualization = () => {
  window.location.href = '../../api/swagger/'
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.result-section {
  margin-top: 20px;
}

pre {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
