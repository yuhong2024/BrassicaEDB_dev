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

