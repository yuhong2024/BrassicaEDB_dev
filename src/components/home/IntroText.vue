<template>
  <div class="intro-text">
    <div class="text-overlay">
      <h1>BrassicaEDB—A Gene Expression Database for Brassica Crops</h1>
      <p>The transcriptome level provides Brassica researchers with a comprehensive and user-friendly interactive tool for gene expression profiling data, the Brassica Expression Database (BrassicaEDB).</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

/* 介绍文本容器样式 */
.intro-text {
  width: 100%;
  height: 400px; /* 设置合适的高度 */
  background-image: url('@/assets/img/home/display/ad.png'); /* 背景图片路径 */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  position: relative; /* 使文本层可绝对定位 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 文本覆盖层 */
.text-overlay {
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景，确保文字可读性 */
  padding: 2rem;
  border-radius: 10px; /* 圆角效果 */
  text-align: center;
  max-width: 800px; /* 限制宽度以保证美观 */
}

/* 标题样式 */
.intro-text h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #ffffff; /* 白色字体，清晰可见 */
}

/* 描述文本样式 */
.intro-text p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ffffff; /* 白色字体，清晰可见 */
  max-width: 100%;
  margin: 0 auto;
}
</style>
