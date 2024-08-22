<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <BreadcrumbHeader :title="pageTitle" :breadcrumbs="breadcrumbs" />

    <!-- 顶部标题 -->
    <div class="header">
      <h1>{{ pageTitle }}</h1>
    </div>

    <!-- 说明部分 -->
    <div class="instructions">
      <h4>Instructions</h4>
      <p>In WebApollo, copy/paste the given gene region from the end of page 8. Then double click a gene prediction model...</p>
    </div>

    <!-- BLAST 表单 -->
    <div class="blast-section">
      <h2>Run BLAST Analysis</h2>
      <form @submit.prevent="submitBlastForm">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="database">Database:</label>
            <select v-model="blastForm.database" class="form-control" id="database" name="database">
              <option value="nt">nt</option>
              <option value="nr">nr</option>
              <option value="refseq_protein">refseq_protein</option>
              <option value="swissprot">swissprot</option>
              <option value="local">Arabidopsis Database</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="program">Select BLAST Program:</label>
            <select v-model="blastForm.program" class="form-control" id="program" name="program">
              <option value="blastn">blastn (Nucleotide BLAST)</option>
              <option value="blastp">blastp (Protein BLAST)</option>
              <option value="blastx">blastx (Translated BLAST)</option>
              <option value="tblastn">tblastn (Protein to Nucleotide BLAST)</option>
              <option value="tblastx">tblastx (Translated BLAST)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="sequence">Enter Query Sequence:</label>
          <textarea v-model="blastForm.sequence" class="form-control" id="sequence" name="sequence" rows="4" placeholder="Enter sequence here"></textarea>
        </div>
        <div class="form-group">
          <label for="upload_file">Or Upload Sequence File:</label>
          <input @change="handleFileUpload" type="file" class="form-control-file" id="upload_file" name="upload_file">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="evalue">E-value Threshold:</label>
            <input v-model="blastForm.evalue" type="text" class="form-control" id="evalue" name="evalue" placeholder="Enter E-value threshold (e.g., 1e-5)">
          </div>
          <div class="form-group col-md-3">
            <label for="best_hit">Best Hit:</label>
            <input v-model="blastForm.bestHit" type="text" class="form-control" id="best_hit" name="best_hit" placeholder="Enter Best Hit (e.g., 1)">
          </div>
          <div class="form-group col-md-3">
            <label for="best_match">Best Match:</label>
            <input v-model="blastForm.bestMatch" type="text" class="form-control" id="best_match" name="best_match" placeholder="Enter Best Match (e.g., 90)">
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Run BLAST</button>
      </form>
    </div>

    <!-- 结果部分 -->
    <div v-if="blastResults.length" class="results-section">
      <h2>BLAST Results</h2>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Query ID</th>
          <th>Subject ID</th>
          <th>Identity</th>
          <th>Align Length</th>
          <th>Mismatches</th>
          <th>Gaps</th>
          <th>Query Start</th>
          <th>Query End</th>
          <th>Subject Start</th>
          <th>Subject End</th>
          <th>E-value</th>
          <th>Bit Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result, index) in blastResults" :key="index">
          <td>{{ result.query_id }}</td>
          <td>{{ result.subject_id }}</td>
          <td>{{ result.identity }}</td>
          <td>{{ result.align_length }}</td>
          <td>{{ result.mismatches }}</td>
          <td>{{ result.gaps }}</td>
          <td>{{ result.query_start }}</td>
          <td>{{ result.query_end }}</td>
          <td>{{ result.subject_start }}</td>
          <td>{{ result.subject_end }}</td>
          <td>{{ result.evalue }}</td>
          <td>{{ result.bit_score }}</td>
        </tr>
        </tbody>
      </table>

      <!-- 下载按钮 -->
      <button @click="downloadResults" class="btn btn-success">Download Results</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import BreadcrumbHeader from '@/components/genefeature/basepage/BreadcrumbHeader.vue';

const pageTitle = 'Blast';
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Blast', path: '/tools/Blast' }
];

const blastForm = ref({
  database: 'nt',
  sequence: '',
  upload_file: null,
  program: 'blastn',
  evalue: '1e-5',
  bestHit: '0',
  bestMatch: '0'
});

const blastResults = ref([]); // 用于保存BLAST分析的结果
let downloadUrl = ''; // 保存结果文件的下载链接

const submitBlastForm = async () => {
  const formData = new FormData();
  Object.keys(blastForm.value).forEach(key => {
    formData.append(key, blastForm.value[key]);
  });

  try {
    const response = await axios.post('https://brassica.wangyuhong.cn/api/analysis/blast/', formData, {
      responseType: 'blob' // 期待服务器返回一个文件
    });

    // 创建一个URL供下载使用
    const url = window.URL.createObjectURL(new Blob([response.data]));
    downloadUrl = url;

    // 解析文件数据
    const reader = new FileReader();
    reader.readAsText(response.data);
    reader.onload = function() {
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

    console.log('BLAST search submitted', response.data);
  } catch (error) {
    console.error('Error submitting BLAST form:', error);
  }
};

const handleFileUpload = (event) => {
  blastForm.value.upload_file = event.target.files[0];
};

// 下载结果的功能
const downloadResults = () => {
  if (downloadUrl) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'blast_results.txt'); // 设置下载文件的默认名称
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px; /* 宽度增加到1200px */
  margin: 0 auto;
  padding: 20px;
}

.instructions {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  margin-bottom: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.blast-section {
  margin-bottom: 40px;
}

.results-section {
  margin-top: 40px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

textarea, input[type="text"], select {
  width: 100%;
}

.table {
  margin-top: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-success {
  margin-top: 20px;
}
</style>
