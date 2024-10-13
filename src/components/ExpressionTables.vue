<template>
  <div class="transcript-page">
    <!-- 表格展示区 -->
    <el-card class="table-card" shadow="always">
      <el-tabs type="border-card">
        <!-- Counts 表格 -->
        <el-tab-pane label="Counts">
          <el-table :data="countsData" style="width: 100%">
            <el-table-column prop="GeneID" label="Gene ID" width="200"></el-table-column>
            <el-table-column v-for="col in petalColumns" :key="col" :prop="col" :label="col"></el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- FPKM 表格 -->
        <el-tab-pane label="FPKM">
          <el-table :data="fpkmData" style="width: 100%">
            <el-table-column prop="GeneID" label="Gene ID" width="200"></el-table-column>
            <el-table-column v-for="col in petalColumns" :key="col" :prop="col" :label="col"></el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- TPM 表格 -->
        <el-tab-pane label="TPM">
          <el-table :data="tpmData" style="width: 100%">
            <el-table-column prop="GeneID" label="Gene ID" width="200"></el-table-column>
            <el-table-column v-for="col in petalColumns" :key="col" :prop="col" :label="col"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { ref, onMounted } from 'vue';

export default {
  name: 'ExpressionTables',
  props: {
    countsFilePath: {
      type: String,
      required: true
    },
    fpkmFilePath: {
      type: String,
      required: true
    },
    tpmFilePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const countsData = ref([]); // Counts表格数据
    const fpkmData = ref([]);   // FPKM表格数据
    const tpmData = ref([]);    // TPM表格数据
    const petalColumns = ref(['Petal_1', 'Petal_2', 'Petal_3', 'Petal_4', 'Petal_5', 'Petal_6']); // 样本列名

    // 读取本地 Excel 文件并解析到数据中
    const loadExcelData = (filePath, dataProperty) => {
      fetch(filePath)
          .then(response => response.arrayBuffer())
          .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // 将读取到的 Excel 数据映射到表格中
            dataProperty.value = jsonData.map(row => ({
              GeneID: row['GeneID'],  // 假设列名为 'GeneID'
              Petal_1: row['Petal_1'], // 样本列
              Petal_2: row['Petal_2'],
              Petal_3: row['Petal_3'],
              Petal_4: row['Petal_4'],
              Petal_5: row['Petal_5'],
              Petal_6: row['Petal_6']
            }));
          })
          .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
          });
    };

    onMounted(() => {
      // 加载不同表格数据
      loadExcelData(props.countsFilePath, countsData);
      loadExcelData(props.fpkmFilePath, fpkmData);
      loadExcelData(props.tpmFilePath, tpmData);
    });

    return {
      countsData,
      fpkmData,
      tpmData,
      petalColumns
    };
  }
};
</script>

<style scoped>
.transcript-page {
  padding: 20px;
}

.table-card {
  margin-top: 20px;
}

.el-table-column {
  text-align: center;
}

.el-tabs {
  margin-bottom: 20px;
}
</style>
