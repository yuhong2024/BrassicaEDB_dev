<template>
  <div class="nav-container">
    <div class="logo-container" @click="goHome">
      <img src="../../assets/img/logos/header/logo_left.svg" alt="Logo" class="logo" />
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
      <!-- Home -->
      <el-menu-item index="/">
        <router-link to="/" class="menu-item-link" exact-active-class="exact-active-link">
          <font-awesome-icon :icon="['fas', 'home']" class="menu-icon" />
          <span>Home</span>
        </router-link>
      </el-menu-item>

      <!-- Gene Feature -->
      <el-sub-menu index="/genefeature">
        <template #title>
          <router-link to="/genefeature" class="submenu-title" exact-active-class="exact-active-link">
            <font-awesome-icon :icon="['fas', 'dna']" class="menu-icon" />
            <span>Gene Feature</span>
          </router-link>
        </template>
        <el-menu-item index="/genefeature/brassicacarinata">Brassica carinata</el-menu-item>
        <el-menu-item index="/genefeature/juncea">Brassica juncea</el-menu-item>
        <el-menu-item index="/genefeature/napus">Brassica napus</el-menu-item>
        <el-menu-item index="/genefeature/nigra">Brassica nigra</el-menu-item>
        <el-menu-item index="/genefeature/oleracea">Brassica oleracea</el-menu-item>
        <el-menu-item index="/genefeature/rapa">Brassica rapa</el-menu-item>
      </el-sub-menu>

      <!-- Search -->
      <el-sub-menu index="/search">
        <template #title>
          <router-link to="/search" class="submenu-title" exact-active-class="exact-active-link">
            <font-awesome-icon :icon="['fas', 'search']" class="menu-icon" />
            <span>Search</span>
          </router-link>
        </template>
        <el-menu-item index="/search/homologous">Homologous gene</el-menu-item>
        <el-menu-item index="/search/expression">Expression</el-menu-item>
        <el-menu-item index="/search/splicing">Alternative splicing</el-menu-item>
        <el-menu-item index="/search/coexpression">Co-expression</el-menu-item>
        <el-menu-item index="/search/tf">TF</el-menu-item>
      </el-sub-menu>

      <!-- Tools -->
      <el-sub-menu index="/tools">
        <template #title>
          <router-link to="/tools" class="submenu-title" exact-active-class="exact-active-link">
            <font-awesome-icon :icon="['fas', 'cogs']" class="menu-icon" />
            <span>Tools</span>
          </router-link>
        </template>
        <el-menu-item index="/tools/blast">Blast</el-menu-item>
        <el-menu-item index="/tools/jbrowse">Jbrowse</el-menu-item>
        <el-menu-item index="/tools/primer">Primer</el-menu-item>
        <el-menu-item index="/tools/efpseq">eFP-seq</el-menu-item>
        <el-menu-item index="/tools/coexpression">Co-expression</el-menu-item>
        <el-menu-item index="/tools/seqfetch">KEGG Enrichment</el-menu-item>
      </el-sub-menu>

      <!-- Analysis -->
      <el-sub-menu index="/analysis">
        <template #title>
          <router-link to="/analysis" class="submenu-title">
            <font-awesome-icon :icon="['fas', 'cogs']" class="menu-icon" />
            <span>Analysis</span>
          </router-link>
        </template>
        <el-menu-item index="/tools/blast">Blast</el-menu-item>
        <el-menu-item index="/tools/jbrowse">Jbrowse</el-menu-item>
        <el-menu-item index="/tools/primer">Primer</el-menu-item>
        <el-menu-item index="/tools/seqfetch">KEGG Enrichment</el-menu-item>
      </el-sub-menu>

      <!-- Download -->
      <el-sub-menu index="/download">
        <template #title>
          <router-link to="/download" class="submenu-title" exact-active-class="exact-active-link">
            <font-awesome-icon :icon="['fas', 'download']" class="menu-icon" />
            <span>Download</span>
          </router-link>
        </template>
        <el-menu-item index="/download/basicdata">Basic data</el-menu-item>
        <el-menu-item index="/download/genomicdata">Genomic data</el-menu-item>
        <el-menu-item index="/download/api">API</el-menu-item>
      </el-sub-menu>

      <!-- More -->
      <el-sub-menu index="/more">
        <template #title>
          <router-link to="/more" class="submenu-title" exact-active-class="exact-active-link">
            <font-awesome-icon :icon="['fas', 'ellipsis-h']" class="menu-icon" />
            <span>More</span>
          </router-link>
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

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faDna, faSearch, faCogs, faDownload, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faDna, faSearch, faCogs, faDownload, faEllipsisH);

const activeIndex = ref('/');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const goHome = () => {
  window.location.href = '/';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg,  #8fd3f4 , #42b983); /* 渐变背景 */
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
  width: 220px; /* 调整Logo大小 */
  vertical-align: middle;
  margin-right: 15px;
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
  margin: 0 15px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff; /* 菜单项文字颜色为白色 */
  transition: color 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
}

.el-menu-demo >>> .el-menu-item:hover,
.el-menu-demo >>> .el-sub-menu__title:hover {
  color: #ffe66d !important; /* 鼠标悬停时的颜色更新为黄色 */
  background-color: rgba(255, 255, 255, 0.2) !important; /* 添加悬停背景效果 */
}

.el-menu-demo >>> .fa,
.el-menu-demo >>> .menu-icon {
  margin-right: 8px; /* 控制图标与文字之间的间距 */
  font-size: 18px; /* 图标大小与文字匹配 */
  display: inline-flex;
  align-items: center; /* 保持图标与文字垂直居中对齐 */
}

.el-menu-demo >>> .el-menu-item.is-active,
.el-menu-demo >>> .el-sub-menu__title.is-active {
  color: #ffe66d !important;
  border-bottom: none; /* 移除下划线 */
}

.el-menu-demo >>> .el-sub-menu__title {
  display: flex;
  align-items: center;
}

.submenu-title {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
  display: flex;
  align-items: center;
}

.submenu-title:hover {
  color: #ffe66d;
}

.search-container {
  display: flex;
  align-items: center;
  padding-right: 50px;
}

.el-menu-demo >>> .el-sub-menu__title .el-menu--popup {
  background: linear-gradient(135deg, #42b983, #8fd3f4); /* 子菜单背景渐变 */
  border: none; /* 去除默认边框 */
}

.menu-item-link {
  display: flex;
  align-items: center; /* 确保图标和文字都在同一行并垂直居中 */
  text-decoration: none !important; /* 移除下划线 */
}

.menu-item-link:hover,
.menu-item-link.exact-active-link {
  color: inherit; /* 使用活动菜单项默认颜色 */
}

.menu-item-link.exact-active-link {
  color: #ffffff; /* 恢复为白色 */
}
</style>
