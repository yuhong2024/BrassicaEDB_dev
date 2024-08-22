<template>
  <div class="more-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>More</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item>More</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Cards Section -->
    <el-row :gutter="20">
      <!-- Help Card -->
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <el-icon class="card-icon"><HelpFilled /></el-icon>
          <h3>Help</h3>
          <p>Get assistance and answers to your questions.</p>
          <el-button type="primary" @click="navigateTo('help')">Learn More</el-button>
        </el-card>
      </el-col>

      <!-- Links Card -->
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <el-icon class="card-icon"><Link /></el-icon>
          <h3>Links</h3>
          <p>Explore related resources and tools.</p>
          <el-button type="primary" @click="navigateTo('links')">Explore</el-button>
        </el-card>
      </el-col>

      <!-- About Card -->
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <el-icon class="card-icon"><InfoFilled /></el-icon>
          <h3>About</h3>
          <p>Learn more about the BrassicaEDB project.</p>
          <el-button type="primary" @click="navigateTo('about')">Discover</el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- Update Card -->
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <el-icon class="card-icon"><RefreshRight /></el-icon>
          <h3>Update</h3>
          <p>Check out the latest updates and news.</p>
          <el-button type="primary" @click="navigateTo('update')">View Updates</el-button>
        </el-card>
      </el-col>

      <!-- Placeholder for Future Expansion -->
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <el-icon class="card-icon"><Plus /></el-icon>
          <h3>More</h3>
          <p>Additional features coming soon...</p>
          <el-button type="primary">Coming Soon</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { HelpFilled, Link, InfoFilled, RefreshRight, Plus } from '@element-plus/icons-vue';

const router = useRouter();

const navigateTo = (page) => {
  router.push(`/more/${page}`);
};
</script>

<style scoped>
.more-page {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

.card {
  text-align: center;
  padding: 20px;
}

.card-icon {
  font-size: 60px;
  margin-bottom: 10px;
  color: #409eff;
}

.card h3 {
  margin: 10px 0;
}

.card p {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}
</style>
