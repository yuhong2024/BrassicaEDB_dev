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
import HelpTitle from '@/components/More/Title/help.vue';

const renderedContent = ref('');
const toc = ref([]);

// 加载 Markdown 文件
const loadMarkdownFile = async () => {
  try {
    const markdownFile = await fetch(new URL('@/assets/md/Help.md', import.meta.url));
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
/* 页面主容器样式 */
.page-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 左侧目录样式 */
.toc {
  flex: 0 0 250px;
  padding: 15px 10px;
  background-color: #f5f7fa;
  border-radius: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  margin: 0;
}

.toc-title {
  font-size: 1.8rem; /* 更大的目录标题 */
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc li {
  margin-bottom: 15px;
  font-size: 1.3rem; /* 更大的目录项 */
}

.toc a {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 1.3rem; /* 更大的链接字体 */
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
  flex: 1;
  padding: 20px 30px; /* 增加内边距 */
  background-color: #ffffff;
  border-radius: 0;
  box-shadow: none;
  overflow-x: hidden;
  margin: 0;
  max-width: calc(100% - 250px);
}

/* Markdown 内容样式 */
.markdown-content {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  line-height: 2; /* 增加行高 */
  font-size: 1.4rem; /* 更大的正文字体 */
  color: #333;
}

.markdown-content h1 {
  font-size: 2.6rem; /* 更大的一级标题 */
  color: #42b983;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
}

.markdown-content h2 {
  font-size: 2.2rem; /* 更大的二级标题 */
  color: #409eff;
  margin-top: 2.2rem;
  margin-bottom: 1.5rem;
}

.markdown-content h3 {
  font-size: 1.8rem; /* 更大的三级标题 */
  color: #66b1ff;
  margin-top: 1.8rem;
  margin-bottom: 1.2rem;
}

.markdown-content p {
  margin: 1.5rem 0; /* 增加段落间距 */
  line-height: 2;
}

/* 图片容器样式 */
.markdown-content p:has(img) {
  width: 100%;
  margin: 1.5rem 0; /* 增加图片上下间距 */
  padding: 0;
  text-align: center;
}

/* 图片样式优化 */
.markdown-content img {
  max-width: 100%;
  width: auto;
  height: auto;
  display: inline-block;
  margin: 0.8rem auto;
  object-fit: contain;
}

/* 特大图片的特殊处理 */
.markdown-content img[src*="202412182021"],
.markdown-content img[src*="202501092235"],
.markdown-content img[src*="202501092159"],
.markdown-content img[src*="202501092208"],
.markdown-content img[src*="202501092206"],
.markdown-content img[src*="202501092205"] {
  max-width: 100%;
}

/* 响应式布局调整 */
@media (max-width: 1400px) {
  .markdown-content img {
    max-width: 75%;
  }
}

@media (max-width: 1200px) {
  .markdown-container {
    max-width: calc(100% - 200px);
  }

  .markdown-content img {
    max-width: 70%;
  }
}

@media (max-width: 768px) {
  .markdown-container {
    max-width: 100%;
  }

  .markdown-content img {
    max-width: 85%;
  }

  .markdown-content {
    font-size: 1.2rem; /* 小屏幕上的字体 */
  }

  .markdown-content h1 {
    font-size: 2.2rem;
  }

  .markdown-content h2 {
    font-size: 1.8rem;
  }

  .markdown-content h3 {
    font-size: 1.6rem;
  }
}
</style>