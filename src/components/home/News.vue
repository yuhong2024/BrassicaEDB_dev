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
      <h2 class="global-title">Global Visitors</h2>
      <p class="global-description">
        Real-time global visitors and usage statistics.
      </p>

      <!-- Clustrmaps 访问统计 -->
      <div class="visitor-map" ref="mapContainer"></div>

      <div class="visit-stats">
        <p><strong>Date and Time:</strong> {{ currentDateTime }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import adImage from '@/assets/img/home/display/ad.png';

const videoPlayer = ref(null);
const mapContainer = ref(null);
const currentDateTime = ref('');

const stats = ref({
  todayCount: 0,
  totalCount: 0
});

// 更新当前时间
const updateDateTime = () => {
  const now = new Date();
  currentDateTime.value = now.toLocaleString();
};

// 初始化 Clustrmaps
const initClustrmaps = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'clustrmaps';
  script.src = '//cdn.clustrmaps.com/map_v2.js?cl=2456d9&w=400&t=tt&d=7QquNvfAS3DeD0uQ7inLeT4Zturel7azIoX5nYldeAw&co=e1eaf0&ct=4d2020';
  mapContainer.value.appendChild(script);
};

onMounted(() => {
  // 初始化视频播放器
  new Plyr(videoPlayer.value, {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
    autoplay: false,
    tooltips: { controls: true },
  });

  // 初始化访问统计地图
  initClustrmaps();

  // 更新时间
  updateDateTime();
  const timeInterval = setInterval(updateDateTime, 1000);

  // 清理定时器
  onUnmounted(() => {
    clearInterval(timeInterval);
  });
});
</script>

<style scoped>
.main-container {
  display: flex;
  gap: 15px; /* 减少卡片间距 */
  padding: 0;
  margin: 0;
  width: 100%;
}

.content-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px; /* 减少内边距 */
  margin: 0;
  background-color: #fff;
}

.left-card {
  flex: 7;
}

.right-card {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 改为顶部对齐 */
  gap: 15px; /* 添加内部元素间距 */
}

.video-title, .global-title {
  font-size: 1.8rem; /* 增大标题字体 */
  font-weight: bold;
  color: #333;
  margin: 0 0 15px 0;
}

.global-description {
  font-size: 1.2rem; /* 增大描述文字 */
  color: #555;
  line-height: 1.4;
  margin: 0;
}

.video-wrapper {
  border-radius: 8px;
  overflow: hidden;
  margin: 0;
}

.plyr {
  width: 100%;
  aspect-ratio: 16/9; /* 保持视频比例 */
}

.visitor-map {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visit-stats {
  margin-top: auto; /* 将时间推到底部 */
  font-size: 1.1rem; /* 增大时间字体 */
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 6px;
}

.visit-stats p {
  margin: 0;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
  }

  .left-card, .right-card {
    width: 100%;
  }

  .visitor-map {
    width: 100%;
    max-width: 400px;
  }
}
</style>
