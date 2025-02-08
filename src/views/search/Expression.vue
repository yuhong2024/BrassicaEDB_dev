<template>
  <div>

      <breadcrumb-component />
      <input-component @submitQuery="handleSubmit" @resetQuery="handleReset" />
    <!-- 走马灯组件卡片（仅在未提交状态下显示） -->
    <el-card class="card" v-if="!showResults">
      <carousel-component />
    </el-card>

    <!-- Chart 结果卡片（默认展开，可折叠） -->
    <el-collapse v-model="isChartExpanded" v-if="showResults">
      <el-collapse-item name="chartResults">
        <template #title>
          <el-icon style="margin-left: 18px;">
            <i class="el-icon-data-analysis" /> <!-- 图标样式，用户交互提示 -->
          </el-icon>
          <el-icon><RemoveFilled /></el-icon>
          Fold
          <el-tooltip content="Fold or Open" placement="top">
            <i class="el-icon-info" style="margin-left: 18px; color: #409EFF;"></i>
          </el-tooltip>
        </template>

        <el-card class="card">
          <chart-component
              :geneIds="queryData.geneIds"
              :species="queryData.species"
              :bioproject="queryData.bioproject"
          />
        </el-card>
      </el-collapse-item>
    </el-collapse>



    <!-- 显示同源基因表格和类似项目表格 -->
    <div v-if="showResults">
      <el-card class="card">
      <!-- 同源基因表格 -->
        <homologous-genes-component
            :geneIds="queryData.geneIds"
            :species="queryData.species"
            @fillGeneId="handleFillGeneId"
        />

      <!-- 同类处理的项目表格 -->
        <similar-projects-component
            :bioproject="queryData.bioproject"
            :mode="queryData.mode"
            :tissue="queryData.tissue"
            :classify="queryData.classify"
            :treatment_type="queryData.treatmentType"
            @clickRow="handleFillProject"
        />
      </el-card>
      <!-- 二次输入板块，ResultDisplay 组件，用于展示结果 -->
      <el-card class="card">
        <h2>Search More</h2>
        <result-display :combinedFormData="combinedFormData" />
      </el-card>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import BreadcrumbComponent from '@/components/search/Title/TR.vue';
import InputComponent from '@/components/search/expression/InputComponent.vue';
import CarouselComponent from '@/components/search/expression/Carousel.vue';
import ChartComponent from '@/components/search/expression/ChartComponent.vue';
import HomologousGenesComponent from '@/components/search/expression/HomologousGenesComponent.vue';
import SimilarProjectsComponent from '@/components/search/expression/SimilarProjectsComponent.vue';
import ResultDisplay from "@/components/search/expression/ResultDisplay.vue";

const showResults = ref(false);  // 控制结果组件显示
const isChartExpanded = ref(['chartResults']); // 控制Chart折叠面板，默认展开
const queryData = ref({
  geneIds: '',
  species: '',
  bioproject: '',
  mode: '',
  tissue: '',
  classify: '',
  treatmentType: ''
});

const combinedFormData = ref({
  gene_ids: '',
  species: '',
  bioproject: ''
});

async function handleSubmit(data) {
  showResults.value = false;

  queryData.value = {
    geneIds: data.gene_ids.join(','),
    species: data.species,
    bioproject: data.bioproject,
    mode: data.mode,
    tissue: data.tissue,
    classify: data.classify,
    treatmentType: data.treatment_type
  };

  await nextTick();
  showResults.value = true;
}

function handleReset() {
  showResults.value = false;
  queryData.value = {
    geneIds: '',
    species: '',
    bioproject: '',
    mode: '',
    tissue: '',
    classify: '',
    treatmentType: ''
  };
}

// 处理 HomologousGenesComponent 中的点击基因ID事件
function handleFillGeneId(geneId) {
  combinedFormData.value.gene_ids = geneId;
}

// 处理 SimilarProjectsComponent 中点击行数据的事件
function handleFillProject(project) {
  combinedFormData.value = {
    ...combinedFormData.value,
    species: project.organism,
    bioproject: project.bioproject
  };
}
</script>

