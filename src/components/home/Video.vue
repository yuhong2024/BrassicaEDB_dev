<template>
  <div class="news-container">
    <h1 class="title">Videos</h1>

    <!-- 平台选择标签 -->
    <div class="platform-selector">
      <div
          class="platform-tab"
          :class="{ active: activePlatform === 'bilibili' }"
          @click="activePlatform = 'bilibili'"
      >
        <el-icon><VideoPlay /></el-icon>
        Bilibili
      </div>
      <div
          class="platform-tab"
          :class="{ active: activePlatform === 'youtube' }"
          @click="activePlatform = 'youtube'"
      >
        <el-icon><VideoPlay /></el-icon>
        Youtube
      </div>
    </div>

    <!-- 视频内容区域 -->
    <div class="video-content">
      <!-- Bilibili 视频 -->
      <div class="video-grid" v-if="activePlatform === 'bilibili'">
        <div class="video-row">
          <div class="video-container">
            <iframe
                src="//player.bilibili.com/player.html?bvid=BV1kPNoeNEmc&page=1&autoplay=0"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
            ></iframe>
          </div>
          <div class="video-container">
            <iframe
                src="//player.bilibili.com/player.html?bvid=BV1kPNoeNE8q&page=1&autoplay=0"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
            ></iframe>
          </div>
        </div>
        <div class="video-row">
          <div class="video-container">
            <iframe
                src="//player.bilibili.com/player.html?bvid=BV1kPNoeNE8S&page=1&autoplay=0"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
            ></iframe>
          </div>
          <div class="video-container">
            <iframe
                src="//player.bilibili.com/player.html?bvid=BV1kPNoeNE8Z&page=1&autoplay=0"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
            ></iframe>
          </div>
        </div>
        <div class="video-row">
          <div class="video-container">
            <iframe
                src="//player.bilibili.com/player.html?bvid=BV1rNNoeeEEH&page=1&autoplay=0"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- YouTube 视频 -->
      <div class="video-grid" v-else>
        <div class="video-row">
          <div class="video-container">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ZivzP1orWsc?rel=0&autoplay=0"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
          </div>
          <div class="video-container">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YyPq3dwZcCU?rel=0&autoplay=0"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="video-row">
          <div class="video-container">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/oaQP7-G1d4A?rel=0&autoplay=0"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VideoPlay } from '@element-plus/icons-vue';

const activePlatform = ref('bilibili');
</script>

<style scoped>
.news-container {
  width: 100%;
  max-width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.platform-selector {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  width: 100%;
}

.platform-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1rem;
  color: #666;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.platform-tab.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
}

.platform-tab .el-icon {
  font-size: 20px;
}

.video-content {
  width: 100%;
}

.video-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.video-container {
  flex: 1;
  position: relative;
  padding-top: 28.125%; /* 16:9 比例的一半，因为每行两个视频 */
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  width: 50%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .news-container {
    padding: 20px;
  }

  .video-row {
    flex-direction: column;
  }

  .video-container {
    width: 100%;
    padding-top: 56.25%; /* 在移动端恢复为标准 16:9 比例 */
    margin-bottom: 20px;
  }
}
</style>
