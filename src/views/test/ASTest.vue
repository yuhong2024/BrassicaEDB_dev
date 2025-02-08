<template>
  <div class="container">
    <h2>AS API Test Page</h2>
    
    <!-- 输入表单 -->
    <el-card class="input-card">
      <el-form :model="form" label-width="120px" class="form">
        <el-form-item label="Species" prop="species">
          <el-input v-model="form.species" disabled></el-input>
        </el-form-item>
        <el-form-item label="Gene ID" prop="gene_id">
          <el-input v-model="form.gene_id" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchAllData" :loading="loading">
            Test API Requests
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- API响应结果展示 -->
    <div class="results-container">
      <el-collapse v-model="activeNames">
        <!-- A3SS结果 -->
        <el-collapse-item title="A3SS API Response" name="a3ss">
          <div class="api-info">
            <div class="url">{{ endpoints.a3ss.url }}?gene_id={{ form.gene_id }}&species={{ form.species }}</div>
          </div>
          <pre class="response-data">{{ JSON.stringify(a3ssData, null, 2) }}</pre>
        </el-collapse-item>

        <!-- MXE结果 -->
        <el-collapse-item title="MXE API Response" name="mxe">
          <div class="api-info">
            <div class="url">{{ endpoints.mxe.url }}?gene_id={{ form.gene_id }}&species={{ form.species }}</div>
          </div>
          <pre class="response-data">{{ JSON.stringify(mxeData, null, 2) }}</pre>
        </el-collapse-item>

        <!-- SE结果 -->
        <el-collapse-item title="SE API Response" name="se">
          <div class="api-info">
            <div class="url">{{ endpoints.se.url }}?gene_id={{ form.gene_id }}&species={{ form.species }}</div>
          </div>
          <pre class="response-data">{{ JSON.stringify(seData, null, 2) }}</pre>
        </el-collapse-item>

        <!-- A5SS结果 -->
        <el-collapse-item title="A5SS API Response" name="a5ss">
          <div class="api-info">
            <div class="url">{{ endpoints.a5ss.url }}?gene_id={{ form.gene_id }}&species={{ form.species }}</div>
          </div>
          <pre class="response-data">{{ JSON.stringify(a5ssData, null, 2) }}</pre>
        </el-collapse-item>

        <!-- RI结果 -->
        <el-collapse-item title="RI API Response" name="ri">
          <div class="api-info">
            <div class="url">{{ endpoints.ri.url }}?gene_id={{ form.gene_id }}&species={{ form.species }}</div>
          </div>
          <pre class="response-data">{{ JSON.stringify(riData, null, 2) }}</pre>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 表单数据（预填充）
const form = ref({
  gene_id: 'BnaA01G0004200ZS',
  species: 'Brassica_napus'
})

// API endpoints
const endpoints = {
  a3ss: { title: "A3SS Result", url: "https://brassicaedb.com/api/as/a3ss" },
  mxe: { title: "MXE Result", url: "https://brassicaedb.com/api/as/mxe" },
  se: { title: "SE Result", url: "https://brassicaedb.com/api/as/se" },
  a5ss: { title: "A5SS Result", url: "https://brassicaedb.com/api/as/a5ss" },
  ri: { title: "RI Result", url: "https://brassicaedb.com/api/as/ri" }
}

// 存储API响应数据
const a3ssData = ref(null)
const mxeData = ref(null)
const seData = ref(null)
const a5ssData = ref(null)
const riData = ref(null)

// 控制折叠面板
const activeNames = ref(['a3ss', 'mxe', 'se', 'a5ss', 'ri'])
const loading = ref(false)

// 发送请求获取数据
const fetchAllData = async () => {
  loading.value = true
  try {
    const params = {
      gene_id: form.value.gene_id,
      species: form.value.species
    }

    const [a3ssRes, mxeRes, seRes, a5ssRes, riRes] = await Promise.all([
      axios.get(endpoints.a3ss.url, { params }),
      axios.get(endpoints.mxe.url, { params }),
      axios.get(endpoints.se.url, { params }),
      axios.get(endpoints.a5ss.url, { params }),
      axios.get(endpoints.ri.url, { params })
    ])

    // 更新数据
    a3ssData.value = a3ssRes.data
    mxeData.value = mxeRes.data
    seData.value = seRes.data
    a5ssData.value = a5ssRes.data
    riData.value = riRes.data

    ElMessage.success('所有API请求已完成')
  } catch (error) {
    console.error('API请求错误:', error)
    ElMessage.error('API请求失败，请查看控制台了解详情')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.input-card {
  margin-bottom: 20px;
}

.results-container {
  margin-top: 20px;
}

.api-info {
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.url {
  font-family: monospace;
  color: #666;
  word-break: break-all;
}

.response-data {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: Monaco, monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 美化折叠面板 */
:deep(.el-collapse-item__header) {
  font-size: 16px;
  font-weight: bold;
}

:deep(.el-collapse-item__content) {
  padding: 15px;
}
</style> 