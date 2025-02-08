<template>
  <div>
    <h2>Similar Projects</h2>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <!-- 同类项目表格，带点击填充功能 -->
    <el-table
        v-if="paginatedProjects.length"
        :data="paginatedProjects"
        stripe
        border
        style="width: 100%"
        @row-click="handleRowClick"
    >

      <el-table-column prop="organism" label="Organism" width="200" />
      <el-table-column prop="mode" label="Mode" width="150" />
      <el-table-column prop="tissue" label="Tissue" width="150" />
      <el-table-column prop="classify" label="Classify" width="150" />
      <el-table-column prop="treatment_type" label="Treatment Type" width="200" />
      <el-table-column prop="bioproject" label="BioProject" width="200" />



    </el-table>
    <p v-else>无相关同类项目信息。</p>

    <!-- 分页组件 -->
    <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="projects.length"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SimilarProjectsComponent',
  props: {
    mode: {
      type: String,
      required: true
    },
    tissue: {
      type: String,
      required: true
    },
    classify: {
      type: String,
      required: true
    },
    treatment_type: {
      type: String,
      required: true
    },
    bioproject: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      projects: [],
      errorMessage: null,
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.projects.slice(start, end);
    }
  },
  watch: {
    mode: 'fetchProjects',
    tissue: 'fetchProjects',
    classify: 'fetchProjects',
    treatment_type: 'fetchProjects',
    bioproject: 'fetchProjects'
  },
  methods: {
    async fetchProjects() {
      const params = {
        mode: this.mode,
        tissue: this.tissue,
        classify: this.classify,
        treatment_type: this.treatment_type
      };
      try {
        const response = await axios.get('https://brassica.wangyuhong.cn/api/projects/', { params });
        if (response.data.status === 'success') {
          this.projects = response.data.combined_data;
          this.errorMessage = null;
          this.currentPage = 1;
        } else {
          this.errorMessage = '未找到相关同类项目';
          this.projects = [];
        }
      } catch (error) {
        this.errorMessage = `Error fetching data: ${error.message}`;
      }
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleRowClick(row) {
      this.$emit('clickRow', row);
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
