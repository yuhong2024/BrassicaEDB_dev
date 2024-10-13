<template>
  <div class="container">
    <h2>数据上传和下载</h2>

    <!-- 上传板块 -->
    <div class="section">
      <h3>文件上传</h3>
      <input type="file" @change="handleFileUpload" />
      <button @click="uploadFile">上传文件</button>
    </div>

    <!-- 下载板块 -->
    <div class="section">
      <h3>文件下载</h3>
      <button @click="downloadFile">下载 .fa 文件</button>
    </div>

    <!-- 显示文件内容 -->
    <div class="section">
      <h3>文件内容</h3>
      <pre v-if="fileContent">{{ fileContent }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

const selectedFile = ref<File | null>(null)
const fileContent = ref<string>('')

// 处理文件选择
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

// 上传文件到后端
const uploadFile = async () => {
  if (!selectedFile.value) {
    alert('请先选择一个文件')
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const response = await axios.post('https://brassica.wangyuhong.cn/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    alert('文件上传成功')
  } catch (error) {
    console.error('文件上传失败:', error)
    alert('文件上传失败')
  }
}

// 下载文件并显示内容
const downloadFile = async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/download/test.fa/', {
      responseType: 'blob',
    })

    const file = new Blob([response.data], { type: 'text/plain' })
    const reader = new FileReader()
    reader.onload = () => {
      fileContent.value = reader.result as string
    }
    reader.readAsText(file)

    const url = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'test.fa')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('下载文件失败:', error)
    alert('下载文件失败')
  }
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

.section {
  margin-top: 20px;
}

input[type="file"] {
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

pre {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
