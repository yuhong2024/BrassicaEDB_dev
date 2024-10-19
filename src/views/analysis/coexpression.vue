<template>
  <div class="project-expression-page">
    <!-- 面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Project Expression Data</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">Project Expression</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- 表格展示 -->
    <el-card class="content-card">
      <el-table
          :data="paginatedData"
          stripe
          style="width: 100%;"
      >
        <el-table-column prop="Organism" label="Organism" width="180"></el-table-column>
        <el-table-column prop="Mode" label="Mode" width="120"></el-table-column>
        <el-table-column prop="Tissue" label="Tissue" width="120"></el-table-column>
        <el-table-column prop="Classify" label="Classify" width="120"></el-table-column>
        <el-table-column prop="Treatment_type" label="Treatment Type" width="180"></el-table-column>
        <el-table-column prop="BioProject" label="BioProject" width="180"></el-table-column>
        <el-table-column prop="Description" label="Description" width="300"></el-table-column>
      </el-table>

      <!-- 分页控件 -->
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="data.length"
          layout="prev, pager, next"
          style="margin-top: 20px; text-align: center;"
          @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [], // 存储从 JSON 文件加载的数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条目数
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.data.slice(start, end);
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await fetch('https://brassica.wangyuhong.cn/api/projects/');
        const jsonData = await response.json();
        this.data = jsonData; // 将数据保存到data中
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.project-expression-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.content-card {
  margin-top: 20px;
  padding: 20px;
}

.el-pagination {
  text-align: center;
}
</style>
