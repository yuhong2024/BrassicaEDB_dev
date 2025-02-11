<template>
  <div class="api-container">
    <breadcrumb-component />

    <!-- 上部分搜索区域 -->
    <el-card class="search-section" :body-style="{ padding: '0' }">
      <div class="search-content">
        <!-- GeneID 输入区 -->
        <div class="input-section">
          <div class="label">GeneID</div>
          <div class="input-wrapper">
            <el-input
                v-model="form.geneId"
                class="gene-input"
                :size="'large'"
            />
            <el-button
                type="primary"
                plain
                :size="'large'"
                @click="handleExample"
                class="example-btn"
            >
              Example
            </el-button>
          </div>
        </div>

        <!-- Organism 选择区 -->
        <div class="organism-section">
          <div class="label">Organism</div>
          <el-radio-group v-model="form.organism" class="radio-grid" size="large">
            <div class="radio-row">
              <el-radio label="Brassica carinata">Brassica carinata</el-radio>
              <el-radio label="Brassica juncea">Brassica juncea</el-radio>
              <el-radio label="Brassica napus">Brassica napus</el-radio>
            </div>
            <div class="radio-row">
              <el-radio label="Brassica nigra">Brassica nigra</el-radio>
              <el-radio label="Brassica oleracea">Brassica oleracea</el-radio>
              <el-radio label="Brassica rapa">Brassica rapa</el-radio>
            </div>
          </el-radio-group>
        </div>

        <!-- 引用文献 -->
        <div class="citation">
          PRJNA641876 270 The evolution of gene spatiotemporal expression
          <br />in six brassica species during embryogenesis
        </div>
      </div>
    </el-card>

    <!-- 下部分筛选区域 -->
    <el-card class="filter-section" :body-style="{ padding: '0' }">
      <div class="filter-content">
        <!-- Tissue 选择 -->
        <div class="filter-row">
          <span class="filter-label">Tissue!</span>
          <div class="button-group">
            <el-button-group>
              <el-button size="large">Root</el-button>
              <el-button size="large">Stem</el-button>
              <el-button size="large">Leaf</el-button>
              <el-button size="large">Flower</el-button>
              <el-button size="large">Seed</el-button>
            </el-button-group>
            <el-button circle size="large">
              <el-icon><Plus /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- Classification 选择 -->
        <div class="filter-row">
          <span class="filter-label">Classification</span>
          <el-button-group>
            <el-button size="large">Normal</el-button>
            <el-button size="large">Abiotic</el-button>
            <el-button size="large">Biotic</el-button>
          </el-button-group>
        </div>

        <!-- Project 信息 -->
        <div class="filter-row">
          <div class="project-inputs">
            <el-input
                placeholder="ProjectID"
                class="project-id"
                size="large"
            />
            <el-input
                placeholder="Description"
                class="project-desc"
                size="large"
            />
            <el-button circle size="large">
              <el-icon><Plus /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- Submit 按钮 -->
        <el-button type="primary" class="submit-btn" size="large">Submit</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import BreadcrumbComponent from '@/components/search/Title/TR.vue';


const form = ref({
  geneId: '',
  organism: ''
})

const handleExample = () => {
  form.value.geneId = 'BnaA01G0000100ZS'
}
</script>

<style scoped>
.api-container {
  width: 100%;
  margin-top: 30px;
}

.search-section,
.filter-section {
  margin-bottom: 1px;
  border-radius: 0;
}

.search-content,
.filter-content {
  padding: 30px;  /* 增加内边距 */
  width: 100%;
  box-sizing: border-box;
}

.input-section,
.organism-section {
  margin-bottom: 30px;  /* 增加间距 */
}

.label {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;  /* 增大标签字体 */
  color: #333;
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  gap: 15px;  /* 增加间距 */
  justify-content: center;
}

.gene-input {
  width: 600px;
}

:deep(.el-input__inner) {
  font-size: 16px;  /* 增大输入框字体 */
}

.radio-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;  /* 增加间距 */
  margin-top: 15px;
}

.radio-row {
  display: flex;
  justify-content: center;
  gap: 40px;  /* 增加间距 */
}

:deep(.el-radio) {
  margin-right: 0;
  margin-bottom: 0;
  min-width: 200px;  /* 增加宽度 */
  font-size: 16px;  /* 增大单选框字体 */
}

.citation {
  text-align: center;
  margin-top: 30px;
  color: #666;
  font-size: 16px;  /* 增大引用文字 */
  line-height: 1.6;
}

.filter-row {
  margin-bottom: 25px;  /* 增加间距 */
  display: flex;
  align-items: center;
  gap: 25px;  /* 增加间距 */
}

.filter-label {
  min-width: 140px;  /* 增加宽度 */
  font-size: 16px;  /* 增大标签字体 */
  color: #333;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
}

:deep(.el-button) {
  font-size: 16px;  /* 增大按钮字体 */
}

.project-inputs {
  display: flex;
  gap: 15px;
  width: 100%;
}

.project-id {
  width: 300px;  /* 增加宽度 */
}

.project-desc {
  flex: 1;
}

.submit-btn {
  width: 100%;
  margin-top: 30px;  /* 增加间距 */
  height: 45px;  /* 增加高度 */
  font-size: 18px;  /* 增大提交按钮字体 */
}

:deep(.el-card) {
  border: none;
  box-shadow: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .radio-row {
    flex-direction: column;
    align-items: center;
  }

  .filter-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-inputs {
    flex-direction: column;
  }

  .project-id,
  .project-desc {
    width: 100%;
  }
}
</style>