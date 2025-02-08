<template>
  <div class="statistics-panel card">
    <h2>Data Summary (All Six Species)</h2>
    <div class="statistics-cards">
      <el-card v-for="(item, index) in statistics" :key="index" class="statistics-card">
        <div class="card-content">
          <p>{{ item.name }}</p>
          <h3>{{ item.value }}</h3>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const statistics = ref([]);

// 格式化字节数据
function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

// 格式化碱基数据
function formatBases(bases) {
  const sizes = ['Bases', 'KiloBases', 'MegaBases', 'GigaBases', 'TB'];
  if (bases === 0) return '0 Base';
  const i = parseInt(Math.floor(Math.log(bases) / Math.log(1000)));
  return (bases / Math.pow(1000, i)).toFixed(2) + ' ' + sizes[i];
}

// 获取数据
onMounted(async () => {
  try {
    const response = await axios.get('https://brassica.wangyuhong.cn/api/homeboard/');
    const data = response.data.data_summary;
    statistics.value = [
      { name: 'BioProject', value: data.BioProject },
      { name: 'BioSample', value: data.BioSample },
      { name: 'Bases', value: formatBases(data.Bases) },
      { name: 'Bytes', value: formatBytes(data.Bytes) },
      { name: 'Tissue', value: data.Tissue },
      { name: 'Genome', value: data.Genome }
    ];
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<style scoped>
.statistics-panel {
  padding: 1rem;
  text-align: center;
  margin-bottom: 1px; /* 减少底部外边距 */
}

.statistics-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.statistics-card {
  flex: 1 1 150px;
  min-width: 200px;
  max-width: 250px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-content p {
  margin: 0;
  font-weight: bold;
}

.card-content h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #42b983;
  text-align: center;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .statistics-card {
    flex: 1 1 calc(50% - 2rem); /* 中等屏幕时每行显示2个卡片 */
  }
}

@media (max-width: 768px) {
  .statistics-card {
    flex: 1 1 calc(100% - 2rem); /* 小屏幕时每行显示1个卡片 */
  }

  .statistics-panel {
    padding: 1rem;
  }
}
.card-content p {
  margin: 0;
  font-weight: bold;
  font-size: 18px; /* 调整字体大小到16px */
  color: #333; /* 添加更清晰的字体颜色（可选） */
}


</style>
