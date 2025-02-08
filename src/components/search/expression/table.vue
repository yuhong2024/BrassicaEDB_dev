<template>
  <div class="container">


    <!-- 表格展示板块 -->
    <el-card class="table-card">
      <!-- 全局搜索框 -->
      <div class="search-container">
        <el-input
            v-model="searchQuery"
            placeholder="Search"
            clearable
            class="global-search"
            @input="handleSearch"
        ></el-input>
      </div>

      <!-- 表格 -->
      <el-table :data="paginatedData" style="width: 100%" v-loading="loading" border>
        <!-- 动态生成列，并添加点击搜索功能 -->
        <el-table-column
            v-for="(header, index) in headers"
            :key="index"
            :label="header"
            :prop="header"
            :min-width="150"
            sortable
        >
          <!-- 动态渲染表格单元格内容，显示“无数据” -->
          <template #default="{ row }">
            <span v-if="row[header] !== '-'">{{ row[header] }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="filteredData.length"
            :page-size="pageSize"
            @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 面包屑导航数据
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Analysis', path: '/analysis' },
  { name: 'Homologous Gene', path: '/analysis/homologous-gene' }
];

// 表格头部
const headers = [
  'Arabidopsis_thaliana',
  'Brassica_carinata',
  'Brassica_juncea',
  'Brassica_napus',
  'Brassica_nigra',
  'Brassica_oleracea',
  'Brassica_rapa'
];

// 数据和状态管理
const tableData = ref([]);
const filteredData = ref([]);
const paginatedData = ref([]);
const searchQuery = ref('');
const columnSearchQuery = ref({});
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(15);

// 加载 JSON 文件的数据
const fetchData = async () => {
  loading.value = true;
  try {
    // 动态导入 JSON 文件
    const data = await import('@/assets/data/Homologous.json');
    tableData.value = data.default; // 由于是 JSON 数据，使用 `default`
    filteredData.value = tableData.value;
    updatePaginatedData();
  } catch (error) {
    console.error('读取文件出错:', error);
  }
  loading.value = false;
};

// 处理全局搜索
const handleSearch = () => {
  filteredData.value = tableData.value.filter(row => {
    return headers.some(header => {
      const cellData = row[header] ? row[header].toString().toLowerCase() : '';
      return cellData.includes(searchQuery.value.toLowerCase());
    });
  });
  currentPage.value = 1;
  updatePaginatedData();
};

// 处理列的搜索
const handleColumnSearch = header => {
  const query = columnSearchQuery.value[header]?.toLowerCase() || '';
  filteredData.value = tableData.value.filter(row => {
    const cellData = row[header] ? row[header].toString().toLowerCase() : '';
    return cellData.includes(query);
  });
  currentPage.value = 1;
  updatePaginatedData();
};

// 分页更新数据
const handlePageChange = page => {
  currentPage.value = page;
  updatePaginatedData();
};

// 更新当前页的数据
const updatePaginatedData = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = currentPage.value * pageSize.value;
  paginatedData.value = filteredData.value.slice(start, end);
};

// 页面挂载时加载数据
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
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

/* Introduction 样式 */
.intro-card {
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image {
  width: 120px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
}

.intro-text h2 {
  margin: 0;
  font-size: 24px;
}

.intro-text p {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
}

/* 表格布局样式 */
.table-card {
  margin-top: 20px;
  padding: 20px;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

.global-search {
  width: 500px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
