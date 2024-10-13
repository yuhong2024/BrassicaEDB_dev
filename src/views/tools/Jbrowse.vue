<template>
  <div class="container">
    <!-- 直接写在当前页面的面包屑导航栏 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>JBrowse</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Introduction Section -->
    <el-card class="intro-card">
      <div class="intro-content">
        <img src="@/assets/img/home/tools/jbrowse.png" alt="JBrowse Image" class="intro-image" />
        <div class="intro-text">
          <h2>JBrowse</h2>
          <p>
            JBrowse is a powerful and fast genome browser used for visualizing genome sequences, annotations, and variant data.
            Explore genome data interactively with JBrowse.
            <cite><a href="https://genomebiology.biomedcentral.com/articles/10.1186/s13059-023-02914-z" target="_blank">Source</a></cite>
          </p>
        </div>
      </div>
    </el-card>

    <!-- JBrowse Embedded -->
    <div class="jbrowse-embed">
      <iframe src="https://jbrowse.org/code/jb2/v2.15.1/?session=share-Y28HlJXq4_&password=6IuXo" width="100%" height="800px" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script setup>
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'JBrowse', path: '/tools/jbrowse' }
];
</script>

<style scoped>
/* 主容器样式 */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* Introduction 样式 */
.intro-card {
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  align-items: center;
}

.intro-image {
  width: 120px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
}

.intro-text h2 {
  margin: 0;
  font-size: 24px;
}

.intro-text p {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
}

/* JBrowse 嵌入式 iframe 样式 */
.jbrowse-embed {
  margin-top: 20px;
}
</style>
