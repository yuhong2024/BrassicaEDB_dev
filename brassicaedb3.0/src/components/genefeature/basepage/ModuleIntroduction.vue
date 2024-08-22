<!--<template>-->
<!--  <el-card class="box-card">-->
<!--    <el-row>-->
<!--      <el-col :span="4">-->
<!--        <img :src="logo" alt="Module Logo" class="module-logo">-->
<!--      </el-col>-->
<!--      <el-col :span="20">-->
<!--        <p>{{ text }}</p>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </el-card>-->
<!--</template>-->

<!--<script setup>-->
<!--import { defineProps } from 'vue';-->

<!--const props = defineProps({-->
<!--  logo: {-->
<!--    type: String,-->
<!--    required: true-->
<!--  },-->
<!--  text: {-->
<!--    type: String,-->
<!--    required: true-->
<!--  }-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.box-card {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.module-logo {-->
<!--  width: 100%;-->
<!--  height: auto;-->
<!--}-->

<!--p {-->
<!--  color: #666;-->
<!--}-->
<!--</style>-->


<template>
  <div class="module-introduction">
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.module-introduction {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}
</style>

