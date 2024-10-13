<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <el-link v-for="item in items" :key="item.name" :underline="false" :href="item.path" class="link">
      {{ item.name }}
    </el-link>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.box-card {
  text-align: left;
  padding: 10px;
  margin: 10px;
}

.link {
  display: block;
  margin: 5px 0;
  color: #42b983;
  font-weight: bold;
  font-size: 16px;
}

.link:hover {
  color: #336699;
  text-decoration: underline;
}

.el-card__header {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.el-card {
  padding: 20px;
  border-radius: 10px;
}
</style>
