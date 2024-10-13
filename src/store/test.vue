<template>
  <div class="nav-container">
    <div class="logo-container" @click="goHome">
      <img src="../../assets/img/logos/logo1.svg" alt="Logo" class="logo" />
      <h1>BrassicaEDB</h1>
    </div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#ffffff"
        text-color="#333333"
        active-text-color="#42b983"
        @select="handleSelect"
        router
    >
      <el-menu-item index="/">
        <font-awesome-icon :icon="['fas', 'home']" />
        Home
      </el-menu-item>
      <el-sub-menu index="/genefeature">
        <template #title>
          <font-awesome-icon :icon="['fas', 'dna']" />
          Gene Feature
        </template>
        <el-menu-item index="/genefeature/brassicacarinata">Brassica carinata</el-menu-item>
        <el-menu-item index="/genefeature/juncea">Brassica juncea</el-menu-item>
        <el-menu-item index="/genefeature/napus">Brassica napus</el-menu-item>
        <el-menu-item index="/genefeature/nigra">Brassica nigra</el-menu-item>
        <el-menu-item index="/genefeature/oleracea">Brassica oleracea</el-menu-item>
        <el-menu-item index="/genefeature/rapa">Brassica rapa</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/analysis">
        <template #title>
          <font-awesome-icon :icon="['fas', 'flask']" />
          Analysis
        </template>
        <el-menu-item index="/analysis/homologous">Homologous gene</el-menu-item>
        <el-menu-item index="/analysis/expression">Expression</el-menu-item>
        <el-menu-item index="/analysis/splicing">Alternative splicing</el-menu-item>
        <el-menu-item index="/analysis/coexpression">Co-expression</el-menu-item>
        <el-menu-item index="/analysis/tf">TF</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/tools">
        <template #title>
          <font-awesome-icon :icon="['fas', 'cogs']" />
          Tools
        </template>
        <el-menu-item index="/tools/blast">Blast</el-menu-item>
        <el-menu-item index="/tools/jbrowse">Jbrowse</el-menu-item>
        <el-menu-item index="/tools/primer">Primer</el-menu-item>
        <el-menu-item index="/tools/efpseq">eFP-seq</el-menu-item>
        <el-menu-item index="/tools/coexpression">Co-expression</el-menu-item>
        <el-menu-item index="/tools/seqfetch">KEGG Enrichment</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/download">
        <template #title>
          <font-awesome-icon :icon="['fas', 'download']" />
          Download
        </template>
        <el-menu-item index="/download/basicdata">Basic data</el-menu-item>
        <el-menu-item index="/download/genomicdata">Genomic data</el-menu-item>
        <el-menu-item index="/download/api">API</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/more">
        <template #title>
          <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
          More
        </template>
        <el-menu-item index="/more/help">Help</el-menu-item>
        <el-menu-item index="/more/links">Links</el-menu-item>
        <el-menu-item index="/more/about">About</el-menu-item>
        <el-menu-item index="/more/update">Update</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="search-container">
      <SearchComponent />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import SearchComponent from './SearchComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faDna, faFlask, faCogs, faDownload, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faDna, faFlask, faCogs, faDownload, faEllipsisH);

const activeIndex = ref('/');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const goHome = () => {
  window.location.href = '/';
};
</script>


<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #42b983, #8fd3f4); /* 渐变背景 */
  padding: 15px 30px;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  width: 50px; /* 调整Logo大小 */
  vertical-align: middle;
  margin-right: 15px;
}

h1 {
  display: inline;
  font-family: 'Roboto', sans-serif;
  font-size: 26px;
  font-weight: 800; /* 加粗字体 */
  color: #ffffff; /* 字体颜色为白色 */
  margin: 0;
}

.el-menu-demo {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: 'Roboto', sans-serif;
  background-color: transparent !important; /* 使菜单背景透明以显示渐变背景 */
}

.el-menu-demo >>> .el-menu-item,
.el-menu-demo >>> .el-sub-menu__title {
  margin: 0 20px;
  font-size: 18px; /* 增大字体 */
  font-weight: 600; /* 加粗字体 */
  color: #ffffff; /* 菜单项文字颜色为白色 */
  transition: color 0.3s, background-color 0.3s; /* 添加颜色与背景过渡效果 */
  display: flex;
  align-items: center;
}

.el-menu-demo >>> .el-menu-item >>> .fa,
.el-menu-demo >>> .el-sub-menu__title >>> .fa {
  margin-right: 8px; /* 增加图标与文字之间的间距 */
}

.el-menu-demo >>> .el-menu-item:hover,
.el-menu-demo >>> .el-sub-menu__title:hover {
  color: #ffe66d !important; /* 鼠标悬停时的颜色更新为黄色 */
  background-color: rgba(255, 255, 255, 0.2) !important; /* 添加悬停背景效果 */
}

.el-menu-demo >>> .el-menu-item.is-active,
.el-menu-demo >>> .el-sub-menu__title.is-active {
  color: #ffe66d !important; /* 活动菜单项颜色更新 */
  border-bottom: 3px solid #ffe66d; /* 活动项下划线 */
}

.submenu-title {
  color: #ffffff; /* 字体颜色更新为白色 */
  text-decoration: none;
  transition: color 0.3s;
}

.submenu-title:hover {
  color: #ffe66d; /* 鼠标悬停时的颜色更新为黄色 */
}

.search-container {
  display: flex;
  align-items: center;
  padding-right: 50px; /* 适当调整右侧搜索栏的空间 */
}

.el-menu-demo >>> .el-sub-menu__title .el-menu--popup {
  background: linear-gradient(135deg, #42b983, #8fd3f4); /* 子菜单背景渐变 */
  border: none; /* 去除默认边框 */
}
</style>
