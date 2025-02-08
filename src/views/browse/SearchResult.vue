<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Structure from "@/components/Base/Structure.vue";
import { Link } from '@element-plus/icons-vue';

const route = useRoute();
const geneId = route.params.geneId || '';
const searchResult = ref<any>(null);
const loading = ref(true);

const goToArabidopsis = (atId: string) => {
  if (atId) {
    window.open(`https://www.arabidopsis.org/servlets/TairObject?type=locus&name=${atId}`, '_blank');
  }
};

onMounted(async () => {
  if (geneId) {
    try {
      const response = await axios.get(`https://brassicaedb.com/api/genefeaturesearch/?gene_id=${geneId}`);
      if (response.data) {
        searchResult.value = response.data;
      } else {
        console.warn('No matching Gene ID found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  } else {
    console.warn('No Gene ID provided.');
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="loading-container">
    <el-loading :fullscreen="true" text="Loading..." />
  </div>

  <div v-else-if="searchResult?.genefeature" class="search-result-container">
    <h2 class="page-title">{{ searchResult?.genefeature[0]?.gene_id }}</h2>

    <!-- Part 1: Basic Information -->
    <el-card class="result-card" shadow="hover">
      <div class="card-header">Part 1: Basic Information</div>
      <el-descriptions :column="3" border>
        <el-descriptions-item 
          label="Chromosome" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].chromosome }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Position" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].position }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="CDS Number" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].cds_number }}
        </el-descriptions-item>

        <el-descriptions-item 
          label="AT" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          <div class="at-link" @click="goToArabidopsis(searchResult.genefeature[0].at)">
            {{ searchResult.genefeature[0].at }}
            <el-icon class="link-icon"><Link /></el-icon>
          </div>
        </el-descriptions-item>
        <el-descriptions-item 
          label="AT Name" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].at_name || '-' }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Preferred Name" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].preferred_name || '-' }}
        </el-descriptions-item>

        <el-descriptions-item 
          label="Description" 
          label-align="left" 
          align="left"
          :span="3"
          class="info-item description-item"
        >
          {{ searchResult.genefeature[0].description }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- Part 2: Gene Structure -->
    <el-card v-if="searchResult?.genestructure" class="result-card" shadow="hover">
      <div class="card-header">Part 2: Gene Structure</div>
      <Structure 
        :genestructure="searchResult.genestructure"
        :gene_id="searchResult.genefeature[0].gene_id"
      />
    </el-card>

    <!-- Part 3: Functional Information -->
    <el-card v-if="searchResult?.genefeature" class="result-card" shadow="hover">
      <div class="card-header">Part 3: Functional Information</div>
      <el-descriptions :column="1" border>
        <el-descriptions-item 
          label="GOs" 
          label-align="left" 
          align="left"
          class="full-width-item"
        >
          <el-input
            type="textarea"
            v-model="searchResult.genefeature[0].gos"
            :rows="2"
            resize="vertical"
            :autosize="{ minRows: 2, maxRows: 6 }"
            readonly
          />
        </el-descriptions-item>
        <el-descriptions-item 
          label="KEGG Pathway" 
          label-align="left" 
          align="left"
          class="full-width-item"
        >
          <el-input
            type="textarea"
            v-model="searchResult.genefeature[0].kegg_pathway"
            :rows="2"
            resize="vertical"
            :autosize="{ minRows: 2, maxRows: 6 }"
            readonly
          />
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border class="mt-4">
        <el-descriptions-item 
          label="CAZY" 
          label-align="left" 
          align="left"
          class="half-width-item"
        >
          {{ searchResult.genefeature[0].cazy || '-' }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="PFAMs" 
          label-align="left" 
          align="left"
          class="half-width-item"
        >
          {{ searchResult.genefeature[0].pfams || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- Part 4: Protein Information -->
    <el-card v-if="searchResult?.genefeature" class="result-card" shadow="hover">
      <div class="card-header">Part 4: Protein Information</div>
      <el-descriptions :column="3" border>
        <el-descriptions-item 
          label="Amino Acid Count" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].amino_acid_count }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Molecular Weight" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].molecular_weight }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Theoretical PI" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].theoretical_pi }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Instability Index" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].instability_index }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Aliphatic Index" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].aliphatic_index }}
        </el-descriptions-item>
        <el-descriptions-item 
          label="Grand Average of Hydropathicity" 
          label-align="left" 
          align="left"
          class="info-item"
        >
          {{ searchResult.genefeature[0].grand_average_of_hydropathicity }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style scoped>
.search-result-container {
  max-width: 99%;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.result-card {
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
}

.card-header {
  color: #409EFF;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 500;
}

:deep(.el-descriptions__label) {
  color: #606266;
  font-weight: normal;
  background: linear-gradient(to right, #f8f9fc, #f2f6fc);
  width: 180px;
  min-width: 180px;
  font-size: 14px;
  padding: 12px 16px;
}

:deep(.el-descriptions__content) {
  color: #333;
  padding: 12px 16px;
  background-color: #ffffff;
}

:deep(.info-item .el-descriptions__label) {
  background: linear-gradient(to right, #f8f9fc, #f2f6fc);
}

:deep(.el-descriptions__cell) {
  padding: 0;
}

:deep(.el-descriptions__body) {
  background-color: #ffffff;
}

:deep(.el-descriptions__label),
:deep(.el-descriptions__content) {
  border-color: #ebeef5;
}

.at-link {
  color: #409EFF;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.at-link:hover {
  color: #79bbff;
  text-decoration: underline;
}

.link-icon {
  font-size: 14px;
}

:deep(.el-textarea__inner) {
  border: none;
  background-color: transparent;
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
}

:deep(.el-textarea__inner:hover),
:deep(.el-textarea__inner:focus) {
  border: none;
  box-shadow: none;
}

:deep(.el-textarea__inner::-webkit-resizer) {
  border-width: 8px;
  border-style: solid;
  border-color: transparent #dcdfe6 #dcdfe6 transparent;
  background-color: transparent;
}

:deep(.full-width-item .el-descriptions__content) {
  padding: 0;
}

:deep(.el-textarea) {
  width: 100%;
}

.mt-4 {
  margin-top: 12px;
}

.loading-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-descriptions) {
  --el-descriptions-item-bordered-label-background: linear-gradient(to right, #f8f9fc, #f2f6fc);
}
</style>
