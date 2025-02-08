<template>
  <div class="container">


    <!-- Search Section -->
    <el-card class="search-card">
      <div class="search-header">
        <el-icon><Search /></el-icon>
        <span class="search-title">Search Homologous Genes</span>
      </div>
      <div class="search-container">
        <el-input
            v-model="searchQuery"
            placeholder="Search genes..."
            clearable
            prefix-icon="el-icon-search"
            @input="handleSearch"
            class="global-search"
        ></el-input>
      </div>
    </el-card>

    <!-- Table Section -->
    <el-card class="table-card">
      <el-table :data="paginatedData" v-loading="loading" border>
        <el-table-column
            v-for="(header, index) in headers"
            :key="index"
            :label="header"
            :prop="header"
            :min-width="150"
            sortable
        >
          <template #default="{ row }">
            <span v-if="row[header] !== '-'">{{ row[header] }}</span>
            <span v-else>No Data</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- Enhanced Pagination Controls -->
      <div class="pagination-container">
        <el-radio-group v-model="paginationSize" class="pagination-options">
          <el-radio-button value="default">Default</el-radio-button>
          <el-radio-button value="large">Large</el-radio-button>
          <el-radio-button value="small">Small</el-radio-button>
        </el-radio-group>
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :size="paginationSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredData.length"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

// Table headers
const headers = [
  'Arabidopsis_thaliana',
  'Brassica_carinata',
  'Brassica_juncea',
  'Brassica_napus',
  'Brassica_nigra',
  'Brassica_oleracea',
  'Brassica_rapa'
]

// Data and state management
const tableData = ref([])
const filteredData = ref([])
const paginatedData = ref([])
const searchQuery = ref('')
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const paginationSize = ref('default')

// Fetch data from JSON file
const fetchData = async () => {
  loading.value = true
  try {
    const data = await import('@/assets/data/Homologous.json')
    tableData.value = data.default
    filteredData.value = tableData.value
    updatePaginatedData()
  } catch (error) {
    console.error('Error loading data:', error)
  }
  loading.value = false
}

// Global search function
const handleSearch = () => {
  filteredData.value = tableData.value.filter(row =>
      headers.some(header => row[header]?.toString().toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
  currentPage.value = 1
  updatePaginatedData()
}

// Pagination update
const handlePageChange = page => {
  currentPage.value = page
  updatePaginatedData()
}

// Handle page size change
const handleSizeChange = newSize => {
  pageSize.value = newSize
  currentPage.value = 1
  updatePaginatedData()
}

// Update.md paginated data
const updatePaginatedData = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  paginatedData.value = filteredData.value.slice(start, end)
}

// Fetch data on page load
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.intro-card, .search-card, .table-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image {
  width: 120px;
  margin-right: 20px;
  border-radius: 8px;
}

.intro-text h2 {
  font-size: 24px;
}

.search-header {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: #333;
  font-weight: 500;
}

.global-search {
  width: 100%;
  max-width: 500px;
  margin-left: 10px;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
