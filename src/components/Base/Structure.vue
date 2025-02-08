<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  genestructure: {
    type: Array,
    required: true
  },
  gene_id: {
    type: String,
    required: true
  }
});

const svgWidth = 1400;
const padding = 50;
const svgHeight = 200;
const rectHeight = 20;
const yOffset = 50;
const scaleLineY = 150;
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  type: "",
  message: "",
});

const parsedData = ref([]);

const processGeneStructure = () => {
  if (!props.genestructure) return;

  // 找到基因总长度范围（type为gene的项）
  const geneItem = props.genestructure.find(item => item.type === 'gene');
  if (!geneItem) return;

  const geneStart = parseInt(geneItem.start);
  const geneEnd = parseInt(geneItem.end);
  const totalLength = geneEnd - geneStart;

  // 只处理非gene类型的数据
  parsedData.value = props.genestructure
      .filter(item => item.type !== 'gene')
      .map(item => {
        const relativeStart = parseInt(item.start) - geneStart;
        const width = parseInt(item.end) - parseInt(item.start);
        const x = (relativeStart / totalLength) * (svgWidth - 2 * padding) + padding;
        const scaledWidth = (width / totalLength) * (svgWidth - 2 * padding);

        return {
          x,
          width: scaledWidth,
          type: item.type,
          message: item.position
        };
      });
};

// 生成500为单位的刻度
const generateTicks = () => {
  if (!props.genestructure || props.genestructure.length === 0) return [];

  const geneItem = props.genestructure.find(item => item.type === 'gene');
  if (!geneItem) return [];

  const start = parseInt(geneItem.start);
  const end = parseInt(geneItem.end);
  const step = 500;
  const tickCount = Math.ceil((end - start) / step);

  return Array.from({length: tickCount + 1}, (_, i) => ({
    x: (i * (svgWidth - 2 * padding) / tickCount) + padding,
    label: start + (i * step)
  }));
};

const tickMarks = ref([]);

watch(() => props.genestructure, () => {
  processGeneStructure();
  tickMarks.value = generateTicks();
}, {immediate: true});

const showTooltip = (item, event) => {
  tooltip.value = {
    visible: true,
    x: event.clientX + 10,
    y: event.clientY - 20,
    type: item.type,
    message: item.message
  };
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};
</script>

<template>
  <div class="chart-container">
    <h2 class="chart-title text-center">{{ gene_id }}</h2>

    <div class="svg-wrapper">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="svgWidth"
          :height="svgHeight"
          class="dynamic-svg"
      >
        <!-- 底层粗线 -->
        <line
            x1="50"
            :x2="svgWidth - 50"
            :y1="yOffset + rectHeight/2"
            :y2="yOffset + rectHeight/2"
            stroke="#989898"
            stroke-width="3"
        />

        <!-- 特征区域矩形 -->
        <g>
          <rect
              v-for="(item, index) in parsedData"
              :key="'rect-' + index"
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
              x1="50"
              :x2="svgWidth - 50"
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

<style scoped>
.chart-container {
  width: 100%;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.chart-title {
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.svg-wrapper {
  width: 100%;
  overflow-x: auto;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.tooltip {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 1000;
}
</style>