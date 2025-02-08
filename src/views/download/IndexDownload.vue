<template>
  <div class="project-table-page">
    <h1>Project</h1>
    <!-- 引用 ProjectTable 组件 -->
    <ProjectTable @bioProjectSelected="handleBioProjectSelected" />
  </div>

  <div class="homologous-table-page">
    <el-card>
      <h1>Run</h1>
      <HomologousGeneSearch />
    </el-card>
  </div>
</template>

<script>
import ProjectTable from '@/components/download/Project.vue';
import HomologousGeneSearch from '@/components/download/Run.vue';

export default {
  components: {
    ProjectTable,
    HomologousGeneSearch
  },
  methods: {
    handleBioProjectSelected(selectedBioProject) {
      // 处理项目选择的回调
      console.log('Selected BioProject:', selectedBioProject);
    }
  }
};
</script>

<style scoped>
.project-table-page,
.homologous-table-page {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}
</style>





