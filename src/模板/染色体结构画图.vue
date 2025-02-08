<template>
    <div class="chart-container">
      <!-- 添加物种选择 -->
      <div class="species-select">
        <el-select v-model="selectedSpecies" placeholder="Select Species">
          <el-option
            v-for="species in speciesList"
            :key="species.value"
            :label="species.label"
            :value="species.value"
          />
        </el-select>
      </div>
  
      <!-- 图标题 -->
      <h2 class="chart-title">Gene Feature Visualization</h2>
  
      <!-- 图和比例尺容器 -->
      <div class="svg-wrapper">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :width="svgWidth"
            :height="svgHeight"
            class="dynamic-svg"
        >
  
          <!-- 渲染基线 -->
          <line
              x1="0"
              :x2="svgWidth"
              :y1="yOffset + rectHeight / 2"
              :y2="yOffset + rectHeight / 2"
              stroke="#989898"
              stroke-width="3"
          />
  
  
          <!-- 后渲染特征矩形，确保在基线上方 -->
          <g>
            <rect
                v-for="(item, index) in parsedData"
                :key="index"
                :x="item.x"
                :y="yOffset"
                :width="item.width"
                :height="rectHeight"
                :fill="item.type === 'CDS' ? '#b8ddb1' : '#ffd59a'"
                @mouseover="showTooltip(item, $event)"
                @mouseout="hideTooltip"
            />
          </g>
  
  
          <!-- 比例尺 -->
          <g>
            <line
                x1="0"
                :x2="svgWidth"
                :y1="scaleLineY"
                :y2="scaleLineY"
                stroke="#000"
                stroke-width="1"
            />
            <g v-for="(tick, index) in tickMarks" :key="index">
              <line
                  :x1="tick.x"
                  :x2="tick.x"
                  :y1="scaleLineY - 5"
                  :y2="scaleLineY + 5"
                  stroke="#000"
                  stroke-width="1"
              />
              <text
                  :x="tick.x"
                  :y="scaleLineY + 20"
                  text-anchor="middle"
                  font-size="12px"
              >
                {{ tick.label }}
              </text>
            </g>
          </g>
        </svg>
      </div>
  
  
  
      <!-- 图例 -->
      <div class="legend">
        <div class="legend-item">
          <span class="legend-color" style="background-color: #b8ddb1;"></span>
          <span>CDS</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background-color: #ffd59a;"></span>
          <span>UTR</span>
        </div>
      </div>
  
  
  
      <!-- Tooltip -->
      <div
          v-if="tooltip.visible"
          class="tooltip"
          :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <p><strong>Structure:</strong> {{ tooltip.type }}</p>
        <p><strong>Position:</strong> {{ tooltip.message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const svgWidth = 1400; // SVG总宽度
  const padding = 50;    // 添加两侧内边距
  const svgHeight = 200; // SVG总高度
  const rectHeight = 20; // 特征矩形高度
  const yOffset = 50; // 图中基因特征的垂直偏移
  const scaleLineY = 150; // 比例尺线的位置
  const tooltip = ref({
    visible: false,
    x: 0,
    y: 0,
    type: "",
    message: "",
  });
  
  const parsedData = ref([
    { x: 0, width: 200, type: "UTR", message: "GWHDTZS00000001.9355..9594" },
    { x: 240, width: 230, type: "CDS", message: "GWHDTZS00000001.9595..9825" },
    { x: 567, width: 92, type: "CDS", message: "GWHDTZS00000001.9922..10014" },
    { x: 807, width: 74, type: "CDS", message: "GWHDTZS00000001.10162..10236" },
    { x: 1000, width: 83, type: "CDS", message: "GWHDTZS00000001.10355..10438" },
    { x: 1154, width: 79, type: "CDS", message: "GWHDTZS00000001.10509..10588" },
    { x: 1319, width: 702, type: "CDS", message: "GWHDTZS00000001.10674..11376" },
  ]);
  
  const tickMarks = ref(
      Array.from({ length: 12 }, (_, i) => ({
        x: (i * svgWidth) / 11,
        label: i * 500,
      }))
  );
  
  // 添加物种选择相关的数据
  const selectedSpecies = ref('');
  const speciesList = [
    {
      label: 'Brassica napus',
      value: 'brassica_napus'
    },
    {
      label: 'Brassica oleracea',
      value: 'brassica_oleracea'
    },
    {
      label: 'Brassica rapa',
      value: 'brassica_rapa'
    }
  ];
  
  const showTooltip = (item, event) => {
    tooltip.value = {
      visible: true,
      x: event.clientX + 10,
      y: event.clientY - 20,
      type: item.type,
      message: item.message,
    };
  };
  
  const hideTooltip = () => {
    tooltip.value.visible = false;
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .chart-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .svg-wrapper {
    width: 100%;
    overflow-x: auto;
    margin-bottom: 20px;
  }
  
  .dynamic-svg {
    display: block;
    margin: 0 auto;
  }
  
  .legend {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .legend-color {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .tooltip {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    z-index: 100;
    pointer-events: none; /* 防止tooltip拦截鼠标事件 */
  }
  
  .tooltip p {
    margin: 4px 0;
  }
  
  .species-select {
    margin-bottom: 15px;  /* 与基因ID输入框保持间距 */
  }
  
  .el-select {
    width: 100%;  /* 或者设置具体宽度 */
  }
  </style>
  