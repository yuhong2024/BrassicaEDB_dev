<template>
  <UpdateTitle />
  <div class="container">
    <el-row justify="center">
      <el-col :span="24">
        <h1 class="page-title">Genome Data Downloads</h1>

        <el-card class="table-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="header-title">Available Genome Data</span>
              <el-tag type="primary" effect="plain" size="large" class="header-tag">
                Click "Download" to get the data file
              </el-tag>
            </div>
          </template>

          <el-table
              :data="genomeData"
              stripe
              style="width: 100%"
              :header-cell-style="{
              background: '#f5f7fa',
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600',
              height: '70px'
            }"
              :cell-style="{
              fontSize: '16px',
              height: '65px'
            }"
          >
            <!-- Genome ID -->
            <el-table-column
                prop="Genome ID"
                label="Genome ID"
                min-width="220"
                show-overflow-tooltip
            >
              <template #default="scope">
                <span class="genome-id">{{ scope.row['Genome ID'] }}</span>
              </template>
            </el-table-column>

            <!-- Species -->
            <el-table-column
                prop="Species"
                label="Species"
                min-width="200"
                show-overflow-tooltip
            >
              <template #default="scope">
                <el-tag
                    size="large"
                    effect="plain"
                    type="primary"
                    class="data-tag"
                >
                  {{ scope.row.Species }}
                </el-tag>
              </template>
            </el-table-column>

            <!-- Subgenome -->
            <el-table-column
                prop="Subgenome"
                label="Subgenome"
                min-width="120"
                show-overflow-tooltip
            >
              <template #default="scope">
                <el-tag
                    size="large"
                    type="primary"
                    effect="light"
                    class="data-tag"
                >
                  {{ scope.row.Subgenome }}
                </el-tag>
              </template>
            </el-table-column>

            <!-- Genome -->
            <el-table-column
                label="Genome"
                align="center"
                min-width="150"
            >
              <template #default="scope">
                <a
                    v-if="scope.row.genome"
                    :href="scope.row.genome"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="download-link"
                >
                  <el-button
                      type="primary"
                      size="large"
                      class="download-button"
                  >
                    Download
                  </el-button>
                </a>
                <el-tag
                    v-else
                    type="info"
                    effect="plain"
                    size="large"
                    class="no-data-tag"
                >
                  No Data
                </el-tag>
              </template>
            </el-table-column>

            <!-- GTF -->
            <el-table-column
                label="GTF"
                align="center"
                min-width="150"
            >
              <template #default="scope">
                <a
                    v-if="scope.row.gtf"
                    :href="scope.row.gtf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="download-link"
                >
                  <el-button
                      type="primary"
                      size="large"
                      class="download-button"
                  >
                    Download
                  </el-button>
                </a>
                <el-tag
                    v-else
                    type="info"
                    effect="plain"
                    size="large"
                    class="no-data-tag"
                >
                  No Data
                </el-tag>
              </template>
            </el-table-column>

            <!-- CDS -->
            <el-table-column
                label="CDS"
                align="center"
                min-width="150"
            >
              <template #default="scope">
                <a
                    v-if="scope.row.cds"
                    :href="scope.row.cds"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="download-link"
                >
                  <el-button
                      type="primary"
                      size="large"
                      class="download-button"
                  >
                    Download
                  </el-button>
                </a>
                <el-tag
                    v-else
                    type="info"
                    effect="plain"
                    size="large"
                    class="no-data-tag"
                >
                  No Data
                </el-tag>
              </template>
            </el-table-column>

            <!-- PEP -->
            <el-table-column
                label="PEP"
                align="center"
                min-width="150"
            >
              <template #default="scope">
                <a
                    v-if="scope.row.pep"
                    :href="scope.row.pep"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="download-link"
                >
                  <el-button
                      type="primary"
                      size="large"
                      class="download-button"
                  >
                    Download
                  </el-button>
                </a>
                <el-tag
                    v-else
                    type="info"
                    effect="plain"
                    size="large"
                    class="no-data-tag"
                >
                  No Data
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UpdateTitle from "@/components/More/Title/update.vue";
import { ElMessage } from "element-plus";

const genomeData = ref([]);

// 读取数据文件并填充表格
const loadGenomeData = async () => {
  try {
    const response = await fetch(new URL("@/assets/download/downdata.txt", import.meta.url));
    const text = await response.text();

    // 将文本数据解析为数组
    const lines = text.trim().split("\n");
    const headers = lines[0].split("\t"); // 第一行是表头
    const rows = lines.slice(1); // 其余是数据行

    // 将每一行数据解析为对象
    genomeData.value = rows.map((line) => {
      const values = line.split("\t");
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] || ""; // 如果值为空，则使用空字符串
      });
      return obj;
    });
  } catch (error) {
    console.error("Failed to load genome data:", error);
  }
};

// 加载数据文件
onMounted(() => {
  loadGenomeData();
});
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  /* padding: 20px 40px; */
  box-sizing: border-box;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 42px;
  font-weight: bold;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.table-card {
  margin-bottom: 30px;
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.header-tag {
  font-size: 16px;
  padding: 8px 16px;
}

.genome-id {
  font-family: 'Monaco', monospace;
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
}

.data-tag {
  font-size: 16px;
  padding: 8px 16px;
  font-weight: 500;
}

.no-data-tag {
  font-size: 16px;
  padding: 8px 16px;
  color: #909399;
}

.download-link {
  text-decoration: none;
}

.download-button {
  width: 130px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
}

.download-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

:deep(.el-card__header) {
  padding: 0 20px;
  border-bottom: 1px solid #ebeef5;
  background-color: #fff;
}

:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #f5f7fa !important;
}

:deep(.el-table__row) {
  transition: all 0.3s;
}

:deep(.el-table__row:hover) {
  background-color: #f5f7fa !important;
}

/* 响应式调整 */
@media screen and (max-width: 1400px) {
  .container {
    padding: 20px;
  }

  .page-title {
    font-size: 36px;
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 768px) {
  .page-title {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .header-title {
    font-size: 20px;
  }
}
</style>
