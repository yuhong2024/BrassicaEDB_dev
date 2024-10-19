<template>
  <div class="project-select-page">
    <!-- 面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>Project Selection</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">Project Select</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- 卡片式布局 -->
    <el-card class="content-card">
      <div class="content-section">
        <!-- 全局搜索框 -->
        <el-input
            v-model="searchQuery"
            placeholder="Search"
            @input="filterTable"
            style="width: 100%; margin-bottom: 20px;"
        />

        <!-- 表格展示 -->
        <el-table
            :data="filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            stripe
            style="width: 100%;"
        >
          <!-- Organism列筛选 -->
          <el-table-column prop="Organism" label="Organism" width="180">
            <template v-slot:header="scope">
              <el-select v-model="filters.Organism" placeholder="Filter Organism" @change="filterTable">
                <el-option
                    v-for="item in uniqueValues('Organism')"
                    :key="item"
                    :label="item"
                    :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <!-- Classify列筛选 -->
          <el-table-column prop="Classify" label="Classify" width="180">
            <template v-slot:header="scope">
              <el-select v-model="filters.Classify" placeholder="Filter Classify" @change="filterTable">
                <el-option
                    v-for="item in uniqueValues('Classify')"
                    :key="item"
                    :label="item"
                    :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="BioProject" label="Project" width="180"></el-table-column>
          <el-table-column prop="Description" label="Description" width="400"></el-table-column>
        </el-table>

        <!-- 分页控件 -->
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredData.length"
            layout="prev, pager, next"
            style="margin-top: 20px; text-align: center;"
        />
      </div>
    </el-card>

    <!-- 级联选择器 -->
    <el-card class="cascader-card">
      <el-cascader
          v-model="selectedParams"
          :options="cascaderOptions"
          placeholder="Select Organism and Project"
          @change="onSelectChange"
          style="width: 100%; margin-top: 20px;"
      />
    </el-card>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      originalData: [],
      filteredData: [],
      searchQuery: "",
      filters: {
        Organism: "",
        Classify: ""
      },
      currentPage: 1,
      pageSize: 20,
      selectedParams: [],
      cascaderOptions: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const url = '/src/assets/data/expression/test_Project_Select.xlsx';
      fetch(url)
          .then(response => response.arrayBuffer())
          .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            this.originalData = jsonData;
            this.filteredData = jsonData;
            this.setupCascaderOptions();
          });
    },
    setupCascaderOptions() {
      const organisms = Array.from(new Set(this.originalData.map(item => item.Organism)));
      this.cascaderOptions = organisms.map(organism => {
        const projects = this.originalData
            .filter(item => item.Organism === organism)
            .map(item => ({ value: item.BioProject, label: item.BioProject }));
        return {
          value: organism,
          label: organism,
          children: projects
        };
      });
    },
    filterTable() {
      const searchQueryLower = this.searchQuery.toLowerCase();
      this.filteredData = this.originalData.filter(item => {
        const matchesSearch = Object.values(item).some(val =>
            val.toString().toLowerCase().includes(searchQueryLower)
        );
        const matchesFilters = Object.keys(this.filters).every(key =>
            this.filters[key] === "" || item[key] === this.filters[key]
        );
        return matchesSearch && matchesFilters;
      });
      this.currentPage = 1;
    },
    uniqueValues(column) {
      return Array.from(new Set(this.originalData.map(item => item[column])));
    },
    onSelectChange(value) {
      console.log("Selected Organism and Project:", value);
    }
  }
};
</script>

<style scoped>
.project-select-page {
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
}

.cascader-card {
  margin-top: 20px;
  text-align: center;
}

.content-section {
  padding: 20px;
}
</style>
