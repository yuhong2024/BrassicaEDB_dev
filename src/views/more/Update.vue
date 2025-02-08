<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';
import UpdateTitle from '@/components/More/Title/update.vue';

const renderedContent = ref('');

// 加载 Markdown 文件
const loadUpdateHistory = async () => {
  try {
    const response = await fetch(new URL('@/assets/md/Update.md', import.meta.url));
    const markdownText = await response.text();
    renderedContent.value = marked(markdownText);
  } catch (error) {
    console.error('Error loading update history:', error);
    renderedContent.value = '<p>Failed to load update history. Please try again later.</p>';
  }
};

onMounted(() => {
  loadUpdateHistory();
});
</script>

<template>
  <div class="update-page">
    <!-- 引入 Update.md 组件 -->
    <UpdateTitle />

    <!-- 更新日志内容 -->
    <el-card class="update-content" shadow="hover">
      <div v-html="renderedContent" class="markdown-content"></div>
    </el-card>
  </div>
</template>

<style scoped>
.update-page {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
}

.update-content {
  margin-top: 20px;
  padding: 20px;
}

/* Markdown 内容样式 */
:deep(.markdown-content) {
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
}

:deep(.markdown-content h1) {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

:deep(.markdown-content h2) {
  font-size: 1.6rem;
  color: #34495e;
  margin: 1.5rem 0 1rem;
}

:deep(.markdown-content h3) {
  font-size: 1.3rem;
  color: #455a64;
  margin: 1.2rem 0 0.8rem;
}

:deep(.markdown-content ul) {
  padding-left: 20px;
  margin-bottom: 1rem;
}

:deep(.markdown-content li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

:deep(.markdown-content p) {
  margin-bottom: 1rem;
}

/* 响应式布局 */
@media (max-width: 768px) {
  :deep(.markdown-content) {
    font-size: 1rem;
  }

  :deep(.markdown-content h1) {
    font-size: 1.8rem;
  }

  :deep(.markdown-content h2) {
    font-size: 1.4rem;
  }

  :deep(.markdown-content h3) {
    font-size: 1.2rem;
  }
}
</style>
