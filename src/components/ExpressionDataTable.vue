<template>
  <el-card class="table-card">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Counts Data" name="counts">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gene_id" label="Gene ID" width="180"></el-table-column>
          <el-table-column prop="counts" label="Counts"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="TPM Data" name="tpm">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gene_id" label="Gene ID" width="180"></el-table-column>
          <el-table-column prop="tpm" label="TPM"></el-table-column>
      </el-tab-pane>

      <el-tab-pane label="FPKM Data" name="fpkm">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gene_id" label="Gene ID" width="180"></el-table-column>
          <el-table-column prop="fpkm" label="FPKM"></el-table-column>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      activeTab: "counts",
      tableData: []
    };
  },
  watch: {
    activeTab() {
      this.loadData();
    }
  },
  mounted() {
    this.loadData(); // 初始化时加载默认的 counts 数据
  },
  methods: {
    async loadData() {
      let fileUrl = "";
      if (this.activeTab === "counts") {
        fileUrl = "/src/assets/data/expression/counts.xlsx";
      } else if (this.activeTab === "tpm") {
        fileUrl = "/src/assets/data/expression/tpm.xlsx";
      } else if (this.activeTab === "fpkm") {
        fileUrl = "/src/assets/data/expression/fpkm.xlsx";
      }

      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      this.tableData = jsonData.map(row => ({
        gene_id: row["Gene ID"],
        ...(this.activeTab === "counts" && { counts: row["Counts"] }),
        ...(this.activeTab === "tpm" && { tpm: row["TPM"] }),
        ...(this.activeTab === "fpkm" && { fpkm: row["FPKM"] })
      }));
    }
  }
};
</script>

<style scoped>
.table-card {
  margin-bottom: 20px;
}
</style>
