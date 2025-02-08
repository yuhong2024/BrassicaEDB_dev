<template>
  <UpdateTitle />
  <div class="container">
    <h1 class="page-title">Genome Data Downloads</h1>

    <el-card class="table-card" shadow="hover">
      <el-table :data="genomeData" stripe style="width: 100%; font-size: 16px;">
        <!-- Genome ID -->
        <el-table-column
            prop="Genome ID"
            label="Genome ID"
            min-width="200"
            show-overflow-tooltip
        ></el-table-column>

        <!-- Species -->
        <el-table-column
            prop="Species"
            label="Species"
            min-width="180"
            show-overflow-tooltip
        ></el-table-column>

        <!-- Subgenome -->
        <el-table-column
            prop="Subgenome"
            label="Subgenome"
            min-width="100"
            show-overflow-tooltip
        ></el-table-column>

        <!-- Genome -->
        <el-table-column
            label="Genome"
            align="center"
            min-width="150"
        >
          <template #default="scope">
            <span
                v-if="scope.row.genome"
                class="download-link"
                @click="handleDownload(scope.row.genome)"
            >
              Download
            </span>
            <span v-else>暂无数据</span>
          </template>
        </el-table-column>

        <!-- GTF -->
        <el-table-column
            label="GTF"
            align="center"
            min-width="150"
        >
          <template #default="scope">
            <span
                v-if="scope.row.gtf"
                class="download-link"
                @click="handleDownload(scope.row.gtf)"
            >
              Download
            </span>
            <span v-else>暂无数据</span>
          </template>
        </el-table-column>

        <!-- CDS -->
        <el-table-column
            label="CDS"
            align="center"
            min-width="150"
        >
          <template #default="scope">
            <span
                v-if="scope.row.cds"
                class="download-link"
                @click="handleDownload(scope.row.cds)"
            >
              Download
            </span>
            <span v-else>暂无数据</span>
          </template>
        </el-table-column>

        <!-- PEP -->
        <el-table-column
            label="PEP"
            align="center"
            min-width="150"
        >
          <template #default="scope">
            <span
                v-if="scope.row.pep"
                class="download-link"
                @click="handleDownload(scope.row.pep)"
            >
              Download
            </span>
            <span v-else>暂无数据</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UpdateTitle from "@/components/More/Title/update.vue";

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

// 文件下载方法
const handleDownload = (url) => {
  if (url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = true;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    console.error("No URL provided for download.");
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
  margin: 0 auto;
  padding: 4px;
}

.page-title {
  text-align: center;
  margin-bottom: 28px;
  font-size: 32px; /* 增大字体 */
  font-weight: bold;
}

.table-card {
  padding: 20px;
}

.download-link {
  color: #409eff;
  font-size: 16px; /* 增大字体 */
  cursor: pointer;
}

.download-link:hover {
  color: #66b1ff;
}

/* 强制不换行，超出内容用省略号显示 */
.el-table th,
.el-table td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px; /* 增大字体 */
}
</style>
