<template>
  <div class="container">
     <!-- 表格区域 -->
    <el-card class="content-card">
      <!-- 全局搜索框 -->
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <el-input
            v-model="searchQuery"
            placeholder="Search"
            @input="filterTable"
            style="width: 300px; margin-right: 20px;"
        />
        <el-button @click="resetFilters">Reset</el-button>
      </div>

      <!-- 表格 -->
      <el-table :data="paginatedData" stripe style="width: 100%;">
        <!-- Organism -->
        <el-table-column prop="Organism" label="Organism" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Organism" placeholder="Organism" @change="filterTable">
              <el-option label="All" value="">All</el-option>
              <el-option v-for="item in uniqueValues('Organism')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- BioProject -->
        <el-table-column prop="BioProject" label="BioProject" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.BioProject" placeholder="BioProject" @change="filterTable">
              <el-option label="All" value="">All</el-option>
              <el-option v-for="item in uniqueValues('BioProject')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Run -->
        <el-table-column prop="Run" label="Run" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Run" placeholder="Run" @change="filterTable">
              <el-option label="All" value="">All</el-option>
              <el-option v-for="item in uniqueValues('Run')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Tissue -->
        <el-table-column prop="Tissue" label="Tissue" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Tissue" placeholder="Tissue" @change="filterTable">
              <el-option label="All" value="">All</el-option>
              <el-option v-for="item in uniqueValues('Tissue')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Treatment -->
        <el-table-column prop="Treatment" label="Treatment" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Treatment" placeholder="Treatment" @change="filterTable">
              <el-option label="All" value="">All</el-option>
              <el-option v-for="item in uniqueValues('Treatment')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Description -->
        <el-table-column prop="name" label="Description" width="400"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredData.length"
          layout="prev, pager, next"
          style="margin-top: 20px; text-align: center;"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 定义状态变量
const originalData = ref([]); // 原始数据
const filteredData = ref([]); // 过滤后的数据
const searchQuery = ref(""); // 搜索框输入值
const filters = ref({
  Organism: "",
  BioProject: "",
  Run: "",
  Tissue: "",
  Treatment: ""
}); // 筛选条件

const currentPage = ref(1);
const pageSize = ref(10);

// 加载并解析 Run.txt 文件
const loadData = async () => {
  try {
    const response = await fetch(new URL("@/assets/download/Run.txt", import.meta.url));
    const text = await response.text();

    // 按行解析数据
    const rows = text.trim().split("\n");
    const headers = rows[0].split("\t"); // 第一行为表头
    const data = rows.slice(1).map((row) => {
      const values = row.split("\t");
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });

    originalData.value = data;
    filteredData.value = data; // 初始状态显示所有数据
  } catch (error) {
    console.error("Error loading Run.txt:", error);
  }
};

// 过滤表格数据
const filterTable = () => {
  const searchQueryLower = searchQuery.value.toLowerCase();
  filteredData.value = originalData.value.filter((item) => {
    const matchesSearch = Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(searchQueryLower)
    );
    const matchesFilters = Object.keys(filters.value).every(
        (key) => filters.value[key] === "" || item[key] === filters.value[key]
    );
    return matchesSearch && matchesFilters;
  });
  currentPage.value = 1; // 切换筛选时重置页码
};

// 获取唯一值用于筛选
const uniqueValues = (column) => {
  return [...new Set(originalData.value.map((item) => item[column]))];
};

// 分页
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    Organism: "",
    BioProject: "",
    Run: "",
    Tissue: "",
    Treatment: ""
  };
  searchQuery.value = "";
  filterTable();
};

// 加载数据
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0px;
}

.page-title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
}


.el-button {
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #409EFF; /* Element Plus 主色调 */
  color: #fff;
}
</style>
