<template>
  <el-card class="box-card">
    <h2>Omics Data</h2>
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
      <el-table-column prop="species" label="Species" />
      <el-table-column prop="variationVCF" label="Variation (VCF)" />
      <el-table-column prop="variationPLINK" label="Variation (PLINK)" />
      <el-table-column prop="geneExpression" label="Gene Expression" />
      <el-table-column prop="abstract" label="Abstract" />
      <el-table-column prop="peakList" label="Peak List" />
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
  axios.get('/data/omics-data.json').then(response => {
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

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
