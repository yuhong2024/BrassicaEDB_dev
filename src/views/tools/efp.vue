<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h1>{{ pageTitle }}</h1>
      </div>
      <div class="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- eFP 表达地图卡片 -->
    <el-card class="efp-card" shadow="hover">
      <div id="svg-container" ref="svgContainer"></div>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'EFPPage',
  setup() {
    const pageTitle = 'eFP Gene Expression Map';
    const breadcrumbs = ref([
      { name: 'Home', path: '/' },
      { name: 'Tools', path: '/tools' },
      { name: 'eFP Map', path: '/tools/efp-map' }
    ]);

    // 加载 SVG 和数据处理
    const expressionData = ref([]);
    const classifyData = ref([]);
    const svgContainer = ref(null);

    const loadSVG = async () => {
      try {
        const response = await fetch('/eFP.svg');
        const svgText = await response.text();
        svgContainer.value.innerHTML = svgText;
        updateColorWithClassifyData(); // 更新颜色
      } catch (error) {
        console.error('Failed to load SVG:', error);
      }
    };

    const loadExpressionData = () => {
      expressionData.value = [
        { sample: 'Germinating_seed__Seed_germination__Greenhouse__12_HAG', FPKM: 26.49 },
        { sample: 'Cotyledons__Seed_germination__Greenhouse__24_HAG', FPKM: 28.1 },
        // 更多数据...
      ];
    };

    const loadClassifyData = async () => {
      try {
        const response = await axios.get('/eFP.classify.txt');
        const data = response.data.split('\n').slice(1);
        classifyData.value = data.map(line => {
          const [sample, description, tissue, stage] = line.split('\t');
          return { sample, description, tissue, stage };
        });
      } catch (error) {
        console.error('Failed to load classify data:', error);
      }
    };

    const updateColorWithClassifyData = () => {
      const elements = document.querySelectorAll('svg g');
      elements.forEach(element => {
        const tissue = getTissueFromClassify(element.id);
        if (tissue) {
          const FPKM = getFPKMForSample(tissue);
          const colorIntensity = Math.min(Math.floor(FPKM / 100 * 255), 255);
          const color = `rgb(${colorIntensity}, ${255 - colorIntensity}, ${colorIntensity})`;
          element.style.fill = color;
        }
      });
    };

    const getTissueFromClassify = (elementId) => {
      const classify = classifyData.value.find(c => c.sample === elementId);
      return classify ? classify.tissue : null;
    };

    const getFPKMForSample = (sampleId) => {
      const sampleData = expressionData.value.find(sample => sample.sample === sampleId);
      return sampleData ? sampleData.FPKM : 0;
    };

    onMounted(() => {
      loadSVG();
      loadExpressionData();
      loadClassifyData();
    });

    return {
      pageTitle,
      breadcrumbs,
      svgContainer
    };
  }
};
</script>

<style scoped>
/* 全局容器样式 */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 面包屑导航栏样式 */
.breadcrumb-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.breadcrumb-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.breadcrumb-right nav {
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  padding: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

/* eFP 地图卡片样式 */
.efp-card {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

#svg-container {
  width: 100%;
  height: auto;
}
</style>