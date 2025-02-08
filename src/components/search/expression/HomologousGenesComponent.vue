<template>
  <div>
    <h2>Homologous Gene</h2>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <!-- 同源基因表格，带点击填充功能 -->
    <el-table v-if="homologousData.length" :data="homologousData" stripe border style="width: 100%">

      <el-table-column prop="Brassica_carinata" label="Brassica carinata" width="200">
        <template #header>
          <!-- 点击表头填充这一列的所有内容 -->
          <span @click="fillColumnWithHeader('Brassica_carinata')" style="cursor: pointer; font-weight: bold;">Brassica carinata</span>
        </template>
        <template #default="scope">
          <el-tag @click="fillGeneId(scope.row.Brassica_carinata)">{{ scope.row.Brassica_carinata || 'NA' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="Brassica_juncea" label="Brassica juncea" width="200">
        <template #header>
          <span @click="fillColumnWithHeader('Brassica_juncea')" style="cursor: pointer; font-weight: bold;">Brassica juncea</span>
        </template>
        <template #default="scope">
          <el-tag @click="fillGeneId(scope.row.Brassica_juncea)">{{ scope.row.Brassica_juncea || 'NA' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="Brassica_napus" label="Brassica napus" width="200">
        <template #header>
          <span @click="fillColumnWithHeader('Brassica_napus')" style="cursor: pointer; font-weight: bold;">Brassica napus</span>
        </template>
        <template #default="scope">
          <el-tag @click="fillGeneId(scope.row.Brassica_napus)">{{ scope.row.Brassica_napus || 'NA' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="Brassica_nigra" label="Brassica nigra" width="200">
        <template #header>
          <span @click="fillColumnWithHeader('Brassica_nigra')" style="cursor: pointer; font-weight: bold;">Brassica nigra</span>
        </template>
        <template #default="scope">
          <el-tag @click="fillGeneId(scope.row.Brassica_nigra)">{{ scope.row.Brassica_nigra || 'NA' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="Brassica_oleracea" label="Brassica oleracea" width="200">
        <template #header>
          <span @click="fillColumnWithHeader('Brassica_oleracea')" style="cursor: pointer; font-weight: bold;">Brassica oleracea</span>
        </template>
        <template #default="scope">
          <el-tag @click="fillGeneId(scope.row.Brassica_oleracea)">{{ scope.row.Brassica_oleracea || 'NA' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="Brassica_rapa" label="Brassica rapa" width="200">
        <template #header>
          <span @click="fillColumnWithHeader('Brassica_rapa')"
                style="cursor: pointer; font-weight: bold;">Brassica rapa</span>
        </template>
        <template #default="scope">
          <el-tag @click="fillGeneId(scope.row.Brassica_rapa)">{{ scope.row.Brassica_rapa || 'NA' }}</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <p v-else>no search</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomologousGenesComponent',
  props: {
    geneIds: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      homologousData: [],
      errorMessage: null
    };
  },
  watch: {
    geneIds: {
      immediate: true,
      handler(newGeneIds) {
        if (newGeneIds) {
          this.fetchHomologousGenes(newGeneIds);
        }
      }
    }
  },
  methods: {
    async fetchHomologousGenes(geneIds) {
      const params = {
        gene_id: geneIds
      };
      try {
        const response = await axios.get('https://brassica.wangyuhong.cn/api/homologous/', {params});
        if (response.data.status === 'success') {
          this.processHomologousData(response.data.combined_data);
        } else {
          this.errorMessage = 'no search';
        }
      } catch (error) {
        this.errorMessage = `Error fetching data: ${error.message}`;
      }
    },
    processHomologousData(data) {
      this.homologousData = data.map(item => ({
        Brassica_carinata: item.Brassica_carinata || 'NA',
        Brassica_juncea: item.Brassica_juncea || 'NA',
        Brassica_napus: item.Brassica_napus || 'NA',
        Brassica_nigra: item.Brassica_nigra || 'NA',
        Brassica_oleracea: item.Brassica_oleracea || 'NA',
        Brassica_rapa: item.Brassica_rapa || 'NA'
      }));
    },
    fillGeneId(geneId) {
      if (geneId && geneId !== 'NA') {
        this.$emit('fillGeneId', geneId);
      }
    },
    fillColumnWithHeader(column) {
      // 点击列的标题时，填充该列的所有值，并用逗号分隔
      const geneIds = this.homologousData
          .map(row => row[column])
          .filter(value => value && value !== 'NA')
          .join(', ');

      if (geneIds) {
        this.$emit('fillGeneId', geneIds);
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
