<template>
  <div class="main-container">
    <!-- 左侧卡片：视频播放器 -->
    <el-card class="content-card left-card">
      <h2 class="video-title">Update & News</h2>
      <div class="video-wrapper">
        <video
            ref="videoPlayer"
            class="plyr"
            preload="metadata"
            :poster="adImage"
        >
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>
      </div>
    </el-card>

    <!-- 右侧卡片：Global Visitors -->
    <el-card class="content-card right-card">
      <h3 class="global-title">Global Visitors</h3>
      <p class="global-description">
        This feature shows the real-time global visitors and statistics about the usage.
      </p>
      <div class="visit-stats">
        <p><strong>Date and Time:</strong> {{ stats.date }}</p>
        <p><strong>Today's Visits:</strong> {{ stats.todayCount }}</p>
        <p><strong>Total Visits:</strong> {{ stats.totalCount }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // 引入 Plyr 样式

// 引入本地图片
import adImage from '@/assets/img/home/display/ad.png';

const videoPlayer = ref(null);

const stats = ref({
  date: '',
  todayCount: 0,
  totalCount: 0,
});

onMounted(() => {
  // 初始化 Plyr.js
  new Plyr(videoPlayer.value, {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
    autoplay: false,
    tooltips: {controls: true},
  });

  // 处理访问量统计
  loadVisitStats();
});

function loadVisitStats() {
  const startDate = '2024-12-01'; // 设置开始计数日期
  const currentDate = new Date().toLocaleDateString();

  // 获取本地存储的数据
  const storedDate = localStorage.getItem('visitDate');
  const todayVisits = localStorage.getItem('todayVisits') || 0;
  const totalVisits = localStorage.getItem('totalVisits') || 0;

  // 如果是新的日期，重置今日访问量
  if (storedDate !== currentDate) {
    localStorage.setItem('visitDate', currentDate);
    localStorage.setItem('todayVisits', 0);
  }

  // 如果是2024年12月1日后才开始计数，则更新统计
  if (currentDate >= startDate) {
    const newTodayVisits = parseInt(todayVisits) + 1;
    const newTotalVisits = parseInt(totalVisits) + 1;

    // 更新 localStorage
    localStorage.setItem('todayVisits', newTodayVisits);
    localStorage.setItem('totalVisits', newTotalVisits);

    // 更新统计数据
    stats.value.date = currentDate + ' ' + new Date().toLocaleTimeString();
    stats.value.todayCount = newTodayVisits;
    stats.value.totalCount = newTotalVisits;
  }
}
</script>

<style scoped>
.main-container {
  display: flex; /* 使用 Flexbox 布局 */
  width: 100%; /* 容器宽度占满整个父级 */
  gap: 20px; /* 两个卡片之间的间隔 */
  margin: 0; /* 去除多余的外边距 */
  padding: 0; /* 去除内边距 */
}

.content-card {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
}

.left-card {
  flex: 7; /* 左侧卡片占70% */
}

.right-card {
  flex: 3; /* 右侧卡片占30% */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.video-wrapper {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.plyr {
  width: 100%; /* 视频宽度占满卡片 */
  height: auto;
}

.video-title, .global-title {
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.global-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.visit-stats {
  margin-top: 20px;
  font-size: 1rem;
  color: #333;
}
</style>
