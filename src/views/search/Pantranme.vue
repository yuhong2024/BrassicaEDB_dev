<template>
  <div class="container">
    <Homo />
    <el-card class="el-card form-card">
      <el-form :model="form" label-width="120px" class="form-content">
        <!-- Gene IDs -->
        <div class="section">
          <div class="section-title">Gene id</div>
          <el-input
              v-model="form.gene_ids_text"
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8 }"
              class="gene-input"
          />
          <div class="button-container">
            <el-button
                @click="fillExampleIds"
                type="primary"
                plain
                class="example-button"
            >
              Fill Example IDs
            </el-button>
          </div>
        </div>

        <!-- Organism -->
        <div class="section">
          <div class="section-title">Organism</div>
          <div class="checkbox-container">
            <el-checkbox-group v-model="form.organisms">
              <div class="checkbox-grid">
                <div class="checkbox-row">
                  <el-checkbox label="Brassica carinata">Brassica carinata</el-checkbox>
                  <el-checkbox label="Brassica juncea">Brassica juncea</el-checkbox>
                  <el-checkbox label="Brassica napus">Brassica napus</el-checkbox>
                </div>
                <div class="checkbox-row">
                  <el-checkbox label="Brassica nigra">Brassica nigra</el-checkbox>
                  <el-checkbox label="Brassica oleracea">Brassica oleracea</el-checkbox>
                  <el-checkbox label="Brassica rapa">Brassica rapa</el-checkbox>
                </div>
              </div>
            </el-checkbox-group>
          </div>
        </div>

        <!-- Tissue -->
        <div class="section">
          <div class="section-title">Tissue</div>
          <div class="checkbox-container">
            <el-checkbox-group v-model="form.tissues">
              <div class="checkbox-row tissue-row">
                <el-checkbox label="Embryo">Embryo</el-checkbox>
                <el-checkbox label="Seed coat">Seed coat</el-checkbox>
                <el-checkbox label="Ovule">Ovule</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>

        <!-- Parameters -->
        <el-collapse v-model="activeCollapse">
          <el-collapse-item name="1">
            <template #title>
              <div class="collapse-header">
                <span>Parameters</span>
                <el-tag size="small" type="info">Click to modify parameters</el-tag>
              </div>
            </template>

            <div class="params-form">
              <div class="params-grid">
                <div class="param-item">
                  <span class="param-label">row font size</span>
                  <el-input v-model="form.r" />
                </div>
                <div class="param-item">
                  <span class="param-label">cell width</span>
                  <el-input v-model="form.cellWidth" disabled />
                </div>
                <div class="param-item">
                  <span class="param-label">Title name</span>
                  <el-input v-model="form.m" />
                </div>
                <div class="param-item">
                  <span class="param-label">col font size</span>
                  <el-input v-model="form.colFontSize" disabled />
                </div>
                <div class="param-item">
                  <span class="param-label">cell height</span>
                  <el-input v-model="form.cellHeight" disabled />
                </div>
                <div class="param-item">
                  <span class="param-label">display numbers</span>
                  <el-input v-model="form.displayNumbers" disabled />
                </div>
                <div class="param-item">
                  <span class="param-label">border color</span>
                  <el-input v-model="form.borderColor" disabled />
                </div>
                <div class="param-item">
                  <span class="param-label">file name</span>
                  <el-input v-model="form.fileName" disabled />
                </div>
                <div class="param-item">
                  <span class="param-label">output file outdir</span>
                  <el-input v-model="form.outdir" disabled />
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

        <!-- Submit Buttons -->
        <div class="button-container">
          <el-button
              type="primary"
              @click="submitForm"
              :loading="loading"
              class="submit-button"
          >
            {{ loading ? 'Submitting...' : 'Submit' }}
          </el-button>
          <el-button @click="resetForm">Reset</el-button>
        </div>
      </el-form>
    </el-card>

    <!-- Response Display -->
    <el-card v-if="response" class="el-card result-card">
      <h3 class="result-title">API Response:</h3>

      <!-- Species Data Tables -->
      <div v-if="response?.species_data" class="tables-section">
        <el-tabs type="border-card">
          <!-- 动态生成 Tab -->
          <el-tab-pane
              v-for="(tableData, tableName) in response.species_data"
              :key="tableName"
              :label="tableName"
          >
            <el-table
                v-if="tableData?.length"
                :data="tableData"
                border
                stripe
                style="width: 100%"
            >
              <!-- 动态生成表格列 -->
              <el-table-column
                  v-for="(value, key) in tableData[0]"
                  :key="key"
                  :prop="key"
                  :label="formatColumnLabel(key)"
                  :width="key === 'id' ? 100 : ''"
              />
            </el-table>
            <el-empty v-else :description="`No ${tableName} data available`" />
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- PDF Display -->
      <el-card v-if="response?.pdf_link" class="pdf-section">
        <template #header>
          <div class="card-header">
            <h4>Heat Map</h4>
            <el-button
                type="primary"
                size="large"
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
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Homo from '@/components/search/Title/Pan.vue';


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
  gene_ids_text: '',
  tissue: [],
  r: '16',        // row font size
  m: 'Test Title', // Title name
  cellWidth: '20',
  colFontSize: '12',
  cellHeight: '25',
  displayNumbers: 'true',
  borderColor: 'white',
  fileName: 'pheat',
  outdir: 'pheat'
})

const response = ref(null)

const activeCollapse = ref([]) // 默认折叠

const loading = ref(false)

// 监听文本输入，转换为数组
watch(() => form.gene_ids_text, (newVal) => {
  form.gene_ids = newVal.split('\n').filter(id => id.trim() !== '')
})

// 填充示例ID
const fillExampleIds = () => {
  form.gene_ids_text = `BjuVB08G59640
Bca101B1G012020
Bca_ComB08g02030
BnaA09G0693800ZS
BnaA09G0715200ZS
BnaC05G0010600ZS`
}

const submitForm = async () => {
  if (!form.gene_ids_text) {
    ElMessage.warning('Please enter gene IDs')
    return
  }
  if (form.organisms.length === 0) {
    ElMessage.warning('Please select at least one organism')
    return
  }
  if (form.tissues.length === 0) {
    ElMessage.warning('Please select at least one tissue')
    return
  }
  try {
    loading.value = true // 开始加载

    // 验证基因ID数量
    const geneIds = form.gene_ids_text.split('\n').filter(id => id.trim())
    if (geneIds.length === 0 || geneIds.length > 10) {
      ElMessage.error('Number of gene IDs must be between 1 and 10')
      return
    }

    // 验证组织数量
    if (form.tissues.length === 0 || form.tissues.length > 3) {
      ElMessage.error('Number of tissues must be between 1 and 3')
      return
    }

    const formData = new FormData()

    // 添加基因IDs
    geneIds.forEach(gene => {
      formData.append('gene_ids', gene.trim())
    })

    // 添加组织，注意处理 Seed coat -> Seed_coat 的转换
    form.tissues.forEach(tissue => {
      // 将空格替换为下划线
      const formattedTissue = tissue.replace(/\s+/g, '_')
      formData.append('tissue', formattedTissue)
    })

    // 添加必要参数
    formData.append('r', form.r)
    formData.append('m', form.m)

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
  } finally {
    loading.value = false // 结束加载
  }
}

const resetForm = () => {
  ElMessageBox.confirm(
      'Are you sure you want to reset all fields?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        form.gene_ids_text = ''
        form.organisms = []
        form.tissues = []
        form.r = '16'
        form.m = 'Test Title'
        response.value = null
        ElMessage.success('Form has been reset')
      })
      .catch(() => {
        ElMessage.info('Reset cancelled')
      })
}

const openPDF = (url) => {
  window.open(url, '_blank')
}

// 格式化列标签
const formatColumnLabel = (key) => {
  // 处理特殊情况
  if (key === '_10167') return '10167'
  if (key === 'ZD_V1') return 'ZD V1'

  // 一般情况：将下划线替换为空格，首字母大写
  return key.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}
</script>

<style scoped>
/* 基础容器样式 */
.container {
  margin-top: 40px;
  width: 100%;
}

/* Gene IDs 部分 */
.section {
  margin-bottom: 40px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  padding: 20px;
}

.section-title {
  font-size: 20px;
  color: #303133;
  text-align: center;
  margin-bottom: 20px;
}

.gene-input {
  margin-bottom: 15px;
}

:deep(.el-textarea__inner) {
  font-size: 18px;
}

/* Organism 和 Tissue 部分 */
.checkbox-container {
  padding: 20px;
}

.checkbox-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkbox-row {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
}

.tissue-row {
  justify-content: center;
  gap: 100px;
}

:deep(.el-checkbox) {
  margin-right: 0;
}

:deep(.el-checkbox__label) {
  font-size: 18px;
}

/* Parameters 部分 */
.collapse-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-text {
  font-size: 20px;
  font-weight: 500;
}

.params-form {
  padding: 30px;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 20px;
}

.param-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.param-label {
  font-size: 18px;
  color: #303133;
  white-space: nowrap;
  min-width: 140px;
}

:deep(.el-input__inner) {
  text-align: center;
  font-size: 18px;
  height: 40px;
}

/* Submit 按钮部分 */
.submit-button, :deep(.el-button) {
  font-size: 18px !important;
  padding: 12px 25px;
  height: auto;
}

/* Response 部分 */
.result-title {
  font-size: 20px;
  margin-bottom: 25px;
}

:deep(.el-table) {
  font-size: 18px;
}

:deep(.el-table th) {
  font-size: 18px;
  background-color: #f5f7fa;
}

:deep(.el-tabs__item) {
  font-size: 18px !important;
  height: 50px;
  line-height: 50px;
}

:deep(.el-tag) {
  font-size: 16px;
}

/* 通用间距 */
.section-block {
  margin-bottom: 40px;
}

/* 卡片样式 */
.el-card {
  margin-bottom: 30px;
}

:deep(.el-card__header) {
  font-size: 20px;
  padding: 20px;
}

/* PDF 部分 */
.pdf-section {
  margin-top: 30px;
  margin-bottom: 40px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.card-header h4 {
  font-size: 20px;
  margin: 0;
  color: #303133;
}

.pdf-viewer {
  width: 100%;
  height: 800px;  /* 设置足够大的高度 */
  border: none;
  margin-top: 20px;
}

:deep(.el-card__header) {
  padding: 20px;
  border-bottom: 1px solid #EBEEF5;
}

:deep(.el-card__body) {
  padding: 20px;
}

:deep(.el-button) {
  font-size: 18px;
  padding: 12px 25px;
}

:deep(.el-empty__description) {
  font-size: 18px;
}

/* 折叠面板 */
:deep(.el-collapse-item__header) {
  font-size: 20px;
  padding: 15px;
}

:deep(.el-collapse-item__content) {
  font-size: 18px;
}

/* Button container styles */
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.example-button {
  font-size: 18px;
  padding: 12px 25px;
}

.submit-button {
  min-width: 120px; /* 确保按钮宽度足够显示加载状态文本 */
}

:deep(.el-button) {
  font-size: 18px;
  padding: 12px 25px;
  height: auto;
}
</style>
