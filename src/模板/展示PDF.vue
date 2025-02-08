<template>
  <div class="update-page">
    <UpdateTitle />

    <!-- PDF 查看器 -->
    <el-card class="pdf-container" shadow="hover">
      <iframe
          :src="pdfUrl"
          class="pdf-viewer"
          type="application/pdf"
          frameborder="0"
      ></iframe>
    </el-card>
  </div>
</template>

<script setup>
import UpdateTitle from '@/components/More/Title/update.vue';
import { ref } from 'vue';

// 获取 PDF 文件的 URL
const pdfUrl = new URL('@/assets/pdf/pcc.pdf', import.meta.url).href;
</script>

<style scoped>
.update-page {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
}

.pdf-container {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.pdf-viewer {
  width: 100%;
  height: 800px;  /* 设置固定高度 */
  border: none;
  border-radius: 4px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .pdf-viewer {
    height: 600px;  /* 移动端稍微降低高度 */
  }

  .pdf-container {
    padding: 10px;
  }
}
</style>