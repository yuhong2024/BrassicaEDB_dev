<template>
  <div class="download-page">
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Download</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item>Download</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <el-card class="intro-card">
      <h2>Download</h2>
      <p>
        In this module, genome, genomic variants, basic information of genes, functional annotations of genes, gene expression, and literature abstracts for 21 species can be downloaded by the users.
      </p>
    </el-card>

    <el-card class="table-card" shadow="hover">
      <h3>Omics Data</h3>
      <el-table :data="paginatedOmicsData" stripe>
        <el-table-column prop="species" label="Species" />
        <el-table-column label="Variation (VCF)" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.vcfUrl)">
              {{ scope.row.vcf }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Variation (PLINK)" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.plinkUrl)">
              {{ scope.row.plink }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Gene Expression" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.expressionUrl)">
              {{ scope.row.expression }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Abstract" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.abstractUrl)">
              {{ scope.row.abstract }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Peak List" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.peakListUrl)">
              {{ scope.row.peakList }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="omicsData.length"
          :page-size="pageSize"
          @current-change="handleOmicsPageChange"
      />
    </el-card>

    <el-card class="table-card" shadow="hover">
      <h3>Genome Data</h3>
      <el-table :data="paginatedGenomeData" stripe>
        <el-table-column prop="species" label="Species" />
        <el-table-column label="Genome" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.genomeUrl)">
              {{ scope.row.genome }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="cDNA" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.cDNAUrl)">
              {{ scope.row.cDNA }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="CDS" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.cdsUrl)">
              {{ scope.row.cds }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="ncRNA" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.ncRNAUrl)">
              {{ scope.row.ncRNA }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Protein" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.proteinUrl)">
              {{ scope.row.protein }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Genome Annotation" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.annotationUrl)">
              {{ scope.row.annotation }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Gene Description" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.descriptionUrl)">
              {{ scope.row.description }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Functional Annotation" align="center">
          <template #default="scope">
            <span class="download-link" @click="handleDownload(scope.row.functionalUrl)">
              {{ scope.row.functional }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="genomeData.length"
          :page-size="pageSize"
          @current-change="handleGenomePageChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const omicsData = reactive([]);
const paginatedOmicsData = ref([]);
const genomeData = reactive([]);
const paginatedGenomeData = ref([]);
const pageSize = ref(5);

// 加载 JSON 数据
const loadData = async () => {
  const response = await fetch('/src/assets/datatest/testdown.json');
  const data = await response.json();

  omicsData.push(...data.omicsData);
  genomeData.push(...data.genomeData);

  updatePaginatedOmicsData(1);
  updatePaginatedGenomeData(1);
};

// 更新分页 Omics 数据
const updatePaginatedOmicsData = (page) => {
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedOmicsData.value = omicsData.slice(start, end);
};

// 更新分页 Genome 数据
const updatePaginatedGenomeData = (page) => {
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedGenomeData.value = genomeData.slice(start, end);
};

const handleOmicsPageChange = (page) => {
  updatePaginatedOmicsData(page);
};

const handleGenomePageChange = (page) => {
  updatePaginatedGenomeData(page);
};

// 处理下载功能
const handleDownload = (url) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = true;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

onMounted(() => {
  loadData(); // 加载 JSON 数据
});
</script>

<style scoped>
.download-page {
  width: 90vw;
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

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.intro-card,
.table-card {
  margin-bottom: 20px;
}

.download-link {
  color: #8FBC8F; /* 浅绿色 */
  cursor: pointer;
}

.download-link:hover {
  color: #556B2F; /* 深绿色 */
}
</style>
