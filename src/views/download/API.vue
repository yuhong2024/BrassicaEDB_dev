<template>
  <div class="api-test-container">
    <el-card class="api-card">
      <template #header>
        <div class="card-header">
          <h2>API Test Interface</h2>
        </div>
      </template>

      <el-form :model="form" label-width="120px">
        <!-- Gene IDs -->
        <el-form-item label="Gene IDs">
          <el-select
              v-model="form.gene_ids"
              multiple
              filterable
              placeholder="Select genes (max 10)"
              :multiple-limit="10"
          >
            <el-option
                v-for="gene in defaultGenes"
                :key="gene"
                :label="gene"
                :value="gene"
            />
          </el-select>
        </el-form-item>

        <!-- Tissue -->
        <el-form-item label="Tissue">
          <el-select
              v-model="form.tissue"
              multiple
              filterable
              placeholder="Select tissues (max 3)"
              :multiple-limit="3"
          >
            <el-option
                v-for="tissue in defaultTissues"
                :key="tissue"
                :label="tissue"
                :value="tissue"
            />
          </el-select>
        </el-form-item>

        <!-- Optional Parameters -->
        <el-form-item label="Parameters">
          <el-checkbox-group v-model="form.params">
            <el-checkbox label="r" />
            <el-checkbox label="c" />
            <el-checkbox label="w" />
            <el-checkbox label="l" />
            <el-checkbox label="b" />
            <el-checkbox label="m" />
            <el-checkbox label="n" />
          </el-checkbox-group>
        </el-form-item>

        <!-- Submit Button -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>

      <!-- Response Display -->
      <div v-if="response" class="response-section">
        <h3>API Response:</h3>

        <!-- Species Data Tables -->
        <div v-if="response.species_data" class="tables-section">
          <!-- PantranJ Table -->
          <el-card v-if="response.species_data.PantranJ?.length" class="data-table">
            <template #header>
              <div class="card-header">
                <h4>PantranJ Data</h4>
              </div>
            </template>
            <el-table :data="response.species_data.PantranJ" border stripe>
              <el-table-column prop="id" label="ID" width="100" />
              <el-table-column prop="Tumida_V2" label="Tumida V2" />
              <el-table-column prop="AU213" label="AU213" />
              <el-table-column prop="Classification" label="Classification" />
            </el-table>
          </el-card>

          <!-- PantranC Table -->
          <el-card v-if="response.species_data.PantranC?.length" class="data-table">
            <template #header>
              <div class="card-header">
                <h4>PantranC Data</h4>
              </div>
            </template>
            <el-table :data="response.species_data.PantranC" border stripe>
              <el-table-column prop="id" label="ID" width="100" />
              <el-table-column prop="_10167" label="10167" />
              <el-table-column prop="ZD_V1" label="ZD V1" />
              <el-table-column prop="Gomenzer" label="Gomenzer" />
              <el-table-column prop="Classification" label="Classification" />
            </el-table>
          </el-card>
        </div>

        <!-- PDF Display -->
        <el-card v-if="response.pdf_link" class="pdf-section">
          <template #header>
            <div class="card-header">
              <h4>Heat Map</h4>
              <el-button
                  type="primary"
                  size="small"
                  @click="openPDF(response.pdf_link)"
              >
                Open PDF
              </el-button>
            </div>
          </template>
          <iframe
              v-if="response.pdf_link"
              :src="response.pdf_link"
              class="pdf-viewer"
          ></iframe>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const defaultGenes = [
  'BjuVB08G59640',
  'Bca101B1G012020',
  'Bca_ComB08g02030'
]

const defaultTissues = [
  'Embryo',
  'Seed_coat'
]

const form = reactive({
  gene_ids: [],
  tissue: [],
  params: ['r', 'm']  // 默认选中 r 和 m
})

const response = ref(null)

const submitForm = async () => {
  try {
    const formData = new FormData()

    // 添加所有选中的基因
    form.gene_ids.forEach(gene => {
      formData.append('gene_ids', gene)
    })

    // 添加所有选中的组织
    form.tissue.forEach(tissue => {
      formData.append('tissue', tissue)
    })

    // 添加其他参数
    form.params.forEach(param => {
      formData.append(param, param === 'r' ? '18' : param === 'm' ? 'Test Title' : '')
    })

    const res = await fetch('https://brassicaedb.com/api/pantranscriptome/', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    response.value = data
    ElMessage.success('Request successful!')
  } catch (error) {
    console.error('Error:', error)
    ElMessage.error(`Request failed: ${error.message}`)
  }
}

const resetForm = () => {
  form.gene_ids = []
  form.tissue = []
  form.params = ['r', 'm']
  response.value = null
}

const openPDF = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.api-test-container {
  padding: 20px;
  width: 100%;
  margin: 0 auto;
}

.api-card {
  margin-bottom: 20px;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.response-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  width: 100%;
}

.response-section pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 500px;
  overflow-y: auto;
}

.el-form-item {
  margin-bottom: 20px;
  width: 100%;
}

.tables-section {
  margin-bottom: 20px;
  width: 100%;
}

.data-table {
  margin-bottom: 20px;
  width: 100%;
}

.pdf-section {
  margin-top: 20px;
  width: 100%;
}

.pdf-viewer {
  width: 100%;
  height: 800px;
  border: none;
}

.card-header h4 {
  margin: 0;
}

:deep(.el-table) {
  width: 100%;
  margin-top: 10px;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background-color: #fafafa;
}

:deep(.el-card) {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-checkbox-group) {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
