<template>
  <div class="page-container">
    <!-- 左侧目录导航 -->
    <aside class="toc">
      <h3 class="toc-title">Table of Contents</h3>
      <ul>
        <li v-for="item in toc" :key="item.id" :class="`toc-level-${item.level}`">
          <a href="#" @click.prevent="scrollTo(item.id)">{{ item.text }}</a>
        </li>
      </ul>
    </aside>

    <!-- Markdown 内容区域 -->
    <main class="markdown-container">
      <div class="help-page">
        <HelpTitle />
      </div>
      <div v-html="renderedContent" class="markdown-content"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { marked } from 'marked';
import HelpTitle from '@/components/More/Title/about.vue';

const renderedContent = ref('');
const toc = ref([]);

// 加载 Markdown 文件
const loadMarkdownFile = async () => {
  try {
    const markdownFile = await fetch(new URL('@/assets/md/About.md', import.meta.url));
    const markdownText = await markdownFile.text();
    renderedContent.value = marked(markdownText);

    await nextTick(); // 确保 DOM 渲染完成
    generateTOC(); // 动态生成目录
  } catch (error) {
    console.error('Error loading markdown file:', error);
    renderedContent.value = '<p>Failed to load content. Please try again later.</p>';
  }
};

// 动态生成目录
const generateTOC = () => {
  const headers = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3');
  toc.value = Array.from(headers).map((header) => {
    const id = header.innerText.replace(/\s+/g, '-').toLowerCase(); // 基于标题文本生成唯一 ID
    header.id = id; // 为标题设置 ID
    return {
      id,
      text: header.innerText,
      level: parseInt(header.tagName[1]), // 提取标题级别
    };
  });
};

// 平滑滚动到指定标题
const scrollTo = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

// 页面加载时调用
onMounted(() => {
  loadMarkdownFile();
});
</script>



<style scoped>
/* 页面主容器 */
.page-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-width: 99%; /* 内容宽度占比容器99% */
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 左侧目录样式 */
.toc {
  flex: 0 0 12%; /* 目录宽度占20% */
  max-width: 250px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  height: max-content;
  overflow-y: auto; /* 目录滚动条 */
}

.toc-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc li {
  margin-bottom: 10px;
}

.toc a {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.toc a:hover {
  color: #66b1ff;
}

/* 不同级别标题的缩进 */
.toc-level-2 {
  margin-left: 20px;
}

.toc-level-3 {
  margin-left: 40px;
}

/* Markdown 内容容器 */
.markdown-container {
  flex: 1; /* 内容区域自适应 */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word; /* 防止内容溢出 */
}

/* Markdown 内容样式 */
.markdown-content {
  line-height: 1.8;
  font-size: 1rem;
  color: #333;
}

.markdown-content h1 {
  font-size: 2rem;
  color: #42b983;
  margin-top: 1.5rem;
}

.markdown-content h2 {
  font-size: 1.6rem;
  color: #409eff;
  margin-top: 1.2rem;
}

.markdown-content h3 {
  font-size: 1.4rem;
  color: #66b1ff;
  margin-top: 1rem;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .page-container {
    flex-direction: column; /* 切换为上下堆叠 */
  }

  .toc {
    flex: 0 0 auto;
    max-width: 100%;
    margin-bottom: 20px;
  }

  .markdown-container {
    padding: 15px;
  }

  .markdown-content {
    font-size: 0.9rem;
  }

  .markdown-content h1 {
    font-size: 1.8rem;
  }

  .markdown-content h2 {
    font-size: 1.4rem;
  }

  .markdown-content h3 {
    font-size: 1.2rem;
  }
}
</style>