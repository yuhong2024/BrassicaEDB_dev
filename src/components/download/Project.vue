<template>
  <!-- 主内容卡片布局 -->
  <el-card class="content-card">
    <div class="content-section">

      <!-- 全局搜索框与重置按钮 -->
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <el-input
            v-model="searchQuery"
            placeholder="Search"
            @input="filterTable"
            style="width: 300px; margin-right: 20px;"
        />
        <el-button @click="resetFilters">Reset</el-button>
      </div>

      <!-- 表格展示 -->
      <el-table :data="paginatedData" stripe style="width: 100%;">
        <!-- Organism 筛选列 -->
        <el-table-column prop="Organism" label="Organism" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Organism" placeholder="Organism" @change="filterTable">
              <!-- 手动添加 All 选项，不让 uniqueValues 再生成 -->
              <el-option label="All" value="">Organism</el-option>
              <el-option v-for="item in uniqueValues('Organism')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Mode 筛选列 -->
        <el-table-column prop="Mode" label="Mode" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Mode" placeholder="Mode" @change="filterTable">
              <el-option label="All" value="">Mode</el-option>
              <el-option v-for="item in uniqueValues('Mode')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Tissue 筛选列 -->
        <el-table-column prop="Tissue" label="Tissue" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Tissue" placeholder="Tissue" @change="filterTable">
              <el-option label="All" value="">Tissue</el-option>
              <el-option v-for="item in uniqueValues('Tissue')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Classify 筛选列 -->
        <el-table-column prop="Classify" label="Classify" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.Classify" placeholder="Classify" @change="filterTable">
              <el-option label="All" value="">Classify</el-option>
              <el-option v-for="item in uniqueValues('Classify')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- BioProject 筛选列 (级联过滤) -->
        <el-table-column prop="BioProject" label="BioProject" width="180">
          <template v-slot:header="scope">
            <el-select v-model="filters.BioProject" placeholder="BioProject" @change="filterTable">
              <el-option label="BioProject" value="">All</el-option>
              <el-option v-for="item in filteredBioProjects" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- Description 列 -->
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

      <!-- 显示选择的 Organism 和 BioProject -->
      <p v-if="filters.Organism || filters.BioProject">
        Selected  Organism : {{ filters.Organism || 'Organism' }}, BioProject : {{ filters.BioProject || 'BioProject' }}
      </p>

    </div>
  </el-card>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const originalData = ref([]);
    const filteredData = ref([]);
    const searchQuery = ref("");
    const filters = ref({
      Organism: "",
      Mode: "",
      Tissue: "",
      Classify: "",
      BioProject: ""
    });

    const currentPage = ref(1);
    const pageSize = ref(10);

// 从 JSON 文件加载数据
    const loadData = async () => {
      try {// 使用 import 动态导入 JSON 文件
        const data = await import('@/assets/data/testproject.json');
        originalData.value = data.default; // 动态导入的 JSON 数据存放在 `default`
        filteredData.value = originalData.value; // 初始显示所有数据
      } catch (error) {
        console.error('读取 JSON 文件出错:', error);
      }
    };


    // 过滤表格数据
    const filterTable = () => {
      const searchQueryLower = searchQuery.value.toLowerCase();
      filteredData.value = originalData.value.filter(item => {
        const matchesSearch = Object.values(item).some(val =>
            val.toString().toLowerCase().includes(searchQueryLower)
        );
        const matchesFilters = Object.keys(filters.value).every(key =>
            filters.value[key] === "" || item[key] === filters.value[key]
        );
        return matchesSearch && matchesFilters;
      });
      currentPage.value = 1; // 切换筛选时重置页码
    };

    // 获取唯一值用于筛选
    const uniqueValues = (column) => {
      return [...new Set(originalData.value.map(item => item[column]))];
    };

    // 级联过滤 BioProject
    const filteredBioProjects = computed(() => {
      const filtered = originalData.value.filter(item => {
        const matchesOrganism = filters.value.Organism === "" || item.Organism === filters.value.Organism;
        const matchesMode = filters.value.Mode === "" || item.Mode === filters.value.Mode;
        const matchesTissue = filters.value.Tissue === "" || item.Tissue === filters.value.Tissue;
        const matchesClassify = filters.value.Classify === "" || item.Classify === filters.value.Classify;
        return matchesOrganism && matchesMode && matchesTissue && matchesClassify;
      });
      return [...new Set(filtered.map(item => item.BioProject))];
    });

    // 分页显示数据
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredData.value.slice(start, end);
    });

    // 重置搜索和筛选
    const resetFilters = () => {
      filters.value = {
        Organism: "",
        Mode: "",
        Tissue: "",
        Classify: "",
        BioProject: ""
      };
      searchQuery.value = "";
      filterTable(); // 重新过滤表格
    };

    // 组件挂载时加载数据
    onMounted(() => {
      loadData();
    });

    return {
      searchQuery,
      filters,
      filteredData,
      paginatedData,
      uniqueValues,
      filteredBioProjects,
      currentPage,
      pageSize,
      filterTable,
      resetFilters
    };
  }
};
</script>








<style scoped>
/* 主容器设置 */
.content-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
}

/* 内部内容的布局样式 */
.content-section {
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* 输入框样式：控制宽度、圆角边框和边距 */
.el-input {
  width: 300px;
  border-radius: 5px;
  margin-right: 10px;
}

.el-button {
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #409EFF; /* Element Plus 主色调 */
  color: #fff;
}

.el-button:hover {
  background-color: #66b1ff; /* 提供悬停状态的视觉反馈 */
  border-color: #66b1ff;
}

/* 表格样式：保持视觉上的简洁和一致性 */
.el-table {
  margin-top: 20px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #ebeef5;
}

/* 表格列头部样式：让筛选下拉菜单与表头一致 */
.el-table th {
  background-color: #f5f7fa;
  font-weight: bold;
}

/* 筛选框样式 */
.el-select {
  width: 100%;
  border-radius: 5px;
}

.el-select .el-input__inner {
  border-radius: 5px;
}

/* 分页控件样式：居中对齐 */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}

/* 选中的 Organism 和 BioProject 信息样式 */
p {
  font-size: 16px;
  margin-top: 20px;
  padding: 10px;
  background-color: #eff6ff;
  border-left: 4px solid #409eff;
  border-radius: 5px;
  color: #333;
}

/* 悬浮状态的交互效果：让交互更丝滑 */
.el-table__row:hover {
  background-color: #f2f6fc !important; /* 行悬浮高亮 */
}

.el-select .el-input__inner:hover,
.el-button:hover {
  transition: all 0.3s ease; /* 过渡效果 */
}

.el-card {
  transition: all 0.3s ease;
}

.el-card:hover {
  transform: translateY(-2px); /* 轻微浮动效果 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* 提升悬浮时的视觉深度 */
}

/* 页眉与内容的适当间距 */
.el-card__header {
  padding-bottom: 10px;
}

</style>
