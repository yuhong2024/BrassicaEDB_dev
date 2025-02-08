<template>
  <div class="container">

    <blast />
    <!-- BLAST 分析卡片 -->
    <el-card class="blast-card" shadow="hover">
      <h2>Run BLAST Analysis</h2>
      <form @submit.prevent="submitBlastForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Database">
              <el-select v-model="blastForm.database" placeholder="Select Database">
                <el-option label="nt" value="nt"></el-option>
                <el-option label="nr" value="nr"></el-option>
                <el-option label="refseq_protein" value="refseq_protein"></el-option>
                <el-option label="swissprot" value="swissprot"></el-option>
                <el-option label="Arabidopsis Database" value="local"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Select BLAST Program">
              <el-select v-model="blastForm.program" placeholder="Select BLAST Program">
                <el-option label="blastn (Nucleotide BLAST)" value="blastn"></el-option>
                <el-option label="blastp (Protein BLAST)" value="blastp"></el-option>
                <el-option label="blastx (Translated BLAST)" value="blastx"></el-option>
                <el-option label="tblastn (Protein to Nucleotide BLAST)" value="tblastn"></el-option>
                <el-option label="tblastx (Translated BLAST)" value="tblastx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Enter Query Sequence">
          <el-input v-model="blastForm.sequence" type="textarea" rows="4" placeholder="Enter sequence here"></el-input>
        </el-form-item>

        <el-form-item label="Or Upload Sequence File">
          <el-upload class="upload-demo" action="" :on-change="handleFileUpload" :show-file-list="false">
            <el-button>Upload File</el-button>
          </el-upload>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="E-value Threshold">
              <el-input v-model="blastForm.evalue" placeholder="Enter E-value threshold"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Best Hit">
              <el-input v-model="blastForm.bestHit" placeholder="Enter Best Hit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Best Match">
              <el-input v-model="blastForm.bestMatch" placeholder="Enter Best Match"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-button type="primary" native-type="submit" block>Run BLAST</el-button>
      </form>
    </el-card>

    <!-- BLAST 结果部分卡片 -->
    <el-card v-if="blastResults.length" class="results-card" shadow="hover">
      <h2>BLAST Results</h2>
      <el-table :data="blastResults" style="width: 100%">
        <el-table-column prop="query_id" label="Query ID"></el-table-column>
        <el-table-column prop="subject_id" label="Subject ID"></el-table-column>
        <el-table-column prop="identity" label="Identity"></el-table-column>
        <el-table-column prop="align_length" label="Align Length"></el-table-column>
        <el-table-column prop="mismatches" label="Mismatches"></el-table-column>
        <el-table-column prop="gaps" label="Gaps"></el-table-column>
        <el-table-column prop="query_start" label="Query Start"></el-table-column>
        <el-table-column prop="query_end" label="Query End"></el-table-column>
        <el-table-column prop="subject_start" label="Subject Start"></el-table-column>
        <el-table-column prop="subject_end" label="Subject End"></el-table-column>
        <el-table-column prop="evalue" label="E-value"></el-table-column>
        <el-table-column prop="bit_score" label="Bit Score"></el-table-column>
      </el-table>

      <el-button @click="downloadResults" type="success" block>Download Results</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import blast from "@/components/Tools/Title/blast.vue";

const blastForm = ref({
  database: 'nt',
  sequence: '',
  upload_file: null,
  program: 'blastn',
  evalue: '1e-5',
  bestHit: '0',
  bestMatch: '0'
});

const blastResults = ref([]);
let downloadUrl = '';

const submitBlastForm = async () => {
  const formData = new FormData();
  Object.keys(blastForm.value).forEach(key => {
    formData.append(key, blastForm.value[key]);
  });

  try {
    const response = await axios.post('https://brassica.wangyuhong.cn/api/analysis/blast/', formData, {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    downloadUrl = url;

    const reader = new FileReader();
    reader.readAsText(response.data);
    reader.onload = function () {
      const text = reader.result;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      blastResults.value = lines.map(line => {
        const columns = line.split('\t');
        return {
          query_id: columns[0],
          subject_id: columns[1],
          identity: columns[2],
          align_length: columns[3],
          mismatches: columns[4],
          gaps: columns[5],
          query_start: columns[6],
          query_end: columns[7],
          subject_start: columns[8],
          subject_end: columns[9],
          evalue: columns[10],
          bit_score: columns[11]
        };
      });
    };
  } catch (error) {
    console.error('Error submitting BLAST form:', error);
  }
};

const handleFileUpload = (event) => {
  blastForm.value.upload_file = event.target.files[0];
};

const downloadResults = () => {
  if (downloadUrl) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'blast_results.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 输入框样式 */
textarea, input[type="text"], select {
  width: 100%;
  background-color: #e3f2fd;
  color: #333;
  border: 1px solid #90caf9;
}

/* 表格和按钮样式 */
.el-table th, .el-table td {
  background-color: #e3f2fd;
  color: #333;
}

.el-button--primary {
  background-color: #29b6f6;
  border-color: #29b6f6;
  color: #ffffff;
}

.el-button--primary:hover {
  background-color: #0288d1;
  border-color: #0288d1;
}

.el-button--success {
  background-color: #66bb6a;
  border-color: #66bb6a;
  color: #ffffff;
}

.el-button--success:hover {
  background-color: #43a047;
  border-color: #43a047;
}
</style>
