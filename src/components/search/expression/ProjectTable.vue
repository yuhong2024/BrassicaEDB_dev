<template>
  <div>
    <!-- Organism 筛选框 -->
    <el-select v-model="selectedOrganism" placeholder="选择Organism" style="margin-bottom: 20px; width: 300px;">
      <el-option v-for="organism in uniqueOrganisms" :key="organism" :label="organism" :value="organism"></el-option>
    </el-select>

    <!-- BioProject 筛选框 -->
    <el-select v-model="selectedBioProject" placeholder="选择BioProject" style="margin-bottom: 20px; width: 300px;">
      <el-option v-for="bioproject in filteredBioProjects" :key="bioproject" :label="bioproject" :value="bioproject"></el-option>
    </el-select>

    <!-- 表格 -->
    <el-table :data="paginatedData" style="width: 100%">
      <el-table-column prop="Organism" label="Organism" width="180"></el-table-column>
      <el-table-column prop="BioProject" label="BioProject" width="180"></el-table-column>
      <el-table-column prop="Samples" label="Samples" width="100"></el-table-column>
      <el-table-column prop="Description" label="Description"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="filteredData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        style="margin-top: 20px; text-align: center;">
    </el-pagination>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import * as XLSX from 'xlsx';

export default {
  name: 'ProjectTable',
  setup() {
    const tableData = ref([]);
    const selectedOrganism = ref('');
    const selectedBioProject = ref('');

    // 分页数据
    const pageSize = ref(10); // 每页展示的行数
    const currentPage = ref(1); // 当前页码

    // 组件挂载时从 Excel 文件读取数据
    onMounted(() => {
      fetch('/src/assets/data/expression/project.xlsx')
          .then(response => response.arrayBuffer())
          .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            tableData.value = jsonData.map(row => ({
              Organism: row.Organism,
              BioProject: row.BioProject,
              Samples: row.Samples,
              Description: row.Description,
            }));
          });
    });

    // 计算唯一的 Organism 列表
    const uniqueOrganisms = computed(() => {
      return [...new Set(tableData.value.map(item => item.Organism))];
    });

    // 根据选择的 Organism 筛选 BioProject 列表
    const filteredBioProjects = computed(() => {
      const filtered = tableData.value.filter(item => {
        return !selectedOrganism.value || item.Organism === selectedOrganism.value;
      });
      return [...new Set(filtered.map(item => item.BioProject))];
    });

    // 过滤数据
    const filteredData = computed(() => {
      return tableData.value.filter(item => {
        const matchesOrganism = !selectedOrganism.value || item.Organism === selectedOrganism.value;
        const matchesBioProject = !selectedBioProject.value || item.BioProject === selectedBioProject.value;
        return matchesOrganism && matchesBioProject;
      });
    });

    // 分页数据
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredData.value.slice(start, end);
    });

    // 处理页码切换
    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
    };

    return {
      selectedOrganism,
      selectedBioProject,
      uniqueOrganisms,
      filteredBioProjects,
      filteredData,
      paginatedData,
      pageSize,
      currentPage,
      handlePageChange,
    };
  }
};
</script>

<style scoped>
.el-select {
  margin-bottom: 20px;
}
</style>
