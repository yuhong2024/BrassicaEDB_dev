//导航栏的右上角实现搜索首页的内容功能
<<template>
  <el-row align="middle" gutter="10" class="search-bar">
    <!-- 物种选择框 -->
    <el-col :span="8">
      <el-select v-model="selectedSpecies" placeholder="选择物种" style="width: 100%;">
        <el-option label="Species A" value="A"></el-option>
        <el-option label="Species B" value="B"></el-option>
        <el-option label="Species C" value="C"></el-option>
        <el-option label="Species D" value="D"></el-option>
        <el-option label="Species E" value="E"></el-option>
        <el-option label="Species F" value="F"></el-option>
      </el-select>
    </el-col>

    <!-- 基因ID输入框 -->
    <el-col :span="12">
      <el-input
          placeholder="请输入基因ID"
          v-model="searchQuery"
          @focus="clearDefaultValue"
          @blur="restoreDefaultValue"
          @keyup.enter="performSearch"
          style="width: 100%;"
      />
    </el-col>

    <!-- 搜索按钮 -->
    <el-col :span="4">
      <el-button
          type="primary"
          icon="el-icon-search"
          @click="performSearch"
          circle
          class="search-button"
      ></el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 默认实例ID
const defaultGeneId = 'BnaA01G0000100ZS';

// 搜索框输入值
const searchQuery = ref(defaultGeneId);

// 选择的物种
const selectedSpecies = ref('');

// 追踪是否为首次焦点
const isFirstFocus = ref(true);

// 在用户聚焦输入框时清除默认值
const clearDefaultValue = () => {
  if (isFirstFocus.value && searchQuery.value === defaultGeneId) {
    searchQuery.value = '';
  }
  isFirstFocus.value = false;
};

// 在输入框失去焦点时，如果没有输入内容则恢复默认值
const restoreDefaultValue = () => {
  if (!searchQuery.value) {
    searchQuery.value = defaultGeneId;
    isFirstFocus.value = true;
  }
};

// 执行搜索功能
const performSearch = async () => {
  if (!selectedSpecies.value) {
    ElMessage.warning('请选择物种');
    return;
  }

  if (!searchQuery.value) {
    ElMessage.warning('请输入基因ID');
    return;
  }

  try {
    const config = {
      method: 'get',
      url: `https://brassica.wangyuhong.cn/api/genefeaturesearch/?search=${searchQuery.value}`,
      headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        'Accept': '*/*',
        'Host': 'brassica.wangyuhong.cn',
        'Connection': 'keep-alive',
      },
    };

    const response = await axios(config);

    if (response.data && response.data.length > 0) {
      ElMessage.success('基因ID搜索成功');
      // 在此处处理或展示搜索结果
      console.log(response.data[0]);
    } else {
      ElMessage.error('未找到匹配的基因ID');
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);
    ElMessage.error('读取基因数据失败');
  }
};
</script>

<style scoped>
.search-bar {
  width: 66%; /* 缩小为原来的三分之二 */
}

.search-button {
  width: 36px; /* 调整按钮大小以适应图标显示 */
  height: 36px;
  padding: 0;
  margin-left: -8px; /* 调整间距以保证整体紧凑 */
}

.el-input {
  width: 100%;
}

.el-select {
  width: 100%;
}
</style>
