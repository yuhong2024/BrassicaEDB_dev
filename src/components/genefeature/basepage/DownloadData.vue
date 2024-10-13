<template>
  <el-card class="box-card">
    <h2>Download Data</h2>
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
      <el-table-column prop="type" label="Type" />
      <el-table-column prop="description" label="Description" />
      <el-table-column label="Link">
        <template v-slot="scope">
          <el-button type="primary" @click="handleDownload(scope.row.description)">Download</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const fetchData = () => {
  axios.get('/data/download-data.json').then(response => {
    tableData.value = response.data;
    total.value = response.data.length;
  });
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchData();
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchData();
};

const handleDownload = (description) => {
  alert(`Downloading ${description}`);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
