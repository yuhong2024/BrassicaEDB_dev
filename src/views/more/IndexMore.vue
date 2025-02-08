<template>
  <div class="more-page">
    <!-- 引用统一的导航栏组件 -->
    <Breadcrumb title="More" />

    <!-- 卡片部分 -->
    <el-row :gutter="10" justify="start">
      <el-col
          v-for="(card, index) in cards"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
      >
        <el-card
            class="card"
            shadow="hover"
            @click="navigateTo(card.route)"
            :style="{ cursor: card.disabled ? 'not-allowed' : 'pointer' }"
        >
          <el-icon class="card-icon">
            <component :is="card.icon" />
          </el-icon>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <el-button
              type="primary"
              :disabled="card.disabled"
              :style="{ cursor: card.disabled ? 'not-allowed' : 'pointer' }"
          >
            {{ card.buttonText }}
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/More/Title/more.vue";
import {
  HelpFilled,
  Link,
  InfoFilled,
  RefreshRight,
  Plus,
  Download,
} from "@element-plus/icons-vue";

const router = useRouter();

// 卡片数据
const cards = [
  {
    title: "Help",
    description: "Get assistance and answers to your questions.",
    buttonText: "Learn More",
    icon: HelpFilled,
    route: "help",
    disabled: false,
  },
  {
    title: "Links",
    description: "Explore related resources and tools.",
    buttonText: "Explore",
    icon: Link,
    route: "links",
    disabled: false,
  },
  {
    title: "About",
    description: "Learn more about the BrassicaEDB project.",
    buttonText: "Discover",
    icon: InfoFilled,
    route: "about",
    disabled: false,
  },
  {
    title: "Update",
    description: "Check out the latest updates and news.",
    buttonText: "View Updates",
    icon: RefreshRight,
    route: "update",
    disabled: false,
  },
  {
    title: "Update",
    description: "Check out the latest updates and news.",
    buttonText: "View Updates",
    icon: RefreshRight,
    route: "update",
    disabled: false,
  },
  {
    title: "Download",
    description: "Download data  from our database.",
    buttonText: "Download",
    icon: Download,
    route: "download",
    disabled: false,
  },
  {
    title: "API",
    description: "Access  through RESTful API interface.",
    buttonText: "View APIs",
    icon: Link,
    route: "api",
    disabled: false,
  },
  

   {
    title: "More",
    description: "Additional features coming soon...",
    buttonText: "Coming Soon",
    icon: Plus,
    route: "",
    disabled: true,
  },
 



];

// 路由跳转
const navigateTo = (route) => {
  if (!route || cards.find((card) => card.route === route)?.disabled) return;
  router.push(`/more/${route}`);
};
</script>

<style scoped>
/* 主容器样式 */
.more-page {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0; /* 减少空白 */
}

/* 卡片样式 */
.card {
  text-align: center;
  padding: 10px 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 40px; /* 减小图标尺寸 */
  color: #409eff;
  margin-bottom: 5px; /* 减少间距 */
}

.card h3 {
  margin: 10px 0 5px 0; /* 上下间距减少 */
  font-size: 1.2rem;
  font-weight: bold;
}

.card p {
  margin-bottom: 10px;
  font-size: 0.9rem; /* 缩小字体 */
  color: #606266;
}

.el-button {
  width: 100%;
  font-size: 0.9rem; /* 按钮字体缩小 */
}

.el-button:disabled {
  background-color: #dcdfe6;
  border-color: #dcdfe6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .card-icon {
    font-size: 36px; /* 小屏幕下的图标更小 */
  }

  .card h3 {
    font-size: 1rem; /* 标题字体更小 */
  }

  .card p {
    font-size: 0.8rem; /* 描述字体更小 */
  }
}

.el-col {
  margin-bottom: 25px;
}
</style>
