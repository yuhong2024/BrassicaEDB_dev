<template>
  <el-card class="input-card">
    <h2>Gene Expression</h2>
    <el-form :model="form" label-width="120px">
      <!-- Species Selection -->
      <el-form-item label="Species">
        <el-select v-model="form.selectedSpecies" placeholder="Select species" @change="onSpeciesChange">
          <el-option
              v-for="speciesOption in speciesOptions"
              :key="speciesOption"
              :label="speciesOption"
              :value="speciesOption"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- Gene ID Input -->
      <el-form-item label="Gene ID">
        <el-input
            v-model="form.geneIdsInput"
            type="textarea"
            placeholder="Please enter one Gene ID per line"
            style="width: 100%; min-height: 120px;"
            :rows="5"
        ></el-input>
        <div style="margin-top: 10px;">
          <el-button-group>
            <el-button
                v-for="geneId in exampleGenes[form.selectedSpecies]"
                :key="geneId"
                @click="addGeneId(geneId)"
            >
              {{ geneId }}
            </el-button>
          </el-button-group>
        </div>
      </el-form-item>


      <!-- Cascader Selection (Project Select) -->
      <el-form-item label="Project Select" v-if="form.selectedSpecies">
        <el-cascader
            v-model="selectedCascader"
            :options="cascaderOptions"
            placeholder="Select options"
            clearable
            @change="onCascaderChange"
        />
      </el-form-item>


      <!-- 示例项目按钮 -->
      <el-form-item>
        <el-button type="text" @click="fillExampleProject">Example Project: PRJNA601012</el-button>
      </el-form-item>

      <!-- Submit and Reset Button -->
      <el-form-item>
        <el-button type="primary" @click="submitQuery">Submit</el-button>
        <el-button @click="resetForm" type="danger">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

const emits = defineEmits<{
  (e: 'submitQuery', data: any): void;
  (e: 'resetQuery'): void;
}>();

const form = ref({
  selectedSpecies: null,
  geneIdsInput: '',
  bioproject: '',
  selectedMode: '',
  selectedTissue: '',
  selectedClassify: '',
  selectedTreatmentType: ''
});

const speciesOptions = ref([
  'Brassica napus', 'Brassica carinata', 'Brassica juncea',
  'Brassica nigra', 'Brassica oleracea', 'Brassica rapa'
]);

const exampleGenes = ref({
  'Brassica napus': ['BnaA01G0000100ZS\nBnaA01G0000200ZS\nBnaA01G0000300ZS'],
  // 'Brassica napus': ['BnaA01G0000100ZS', 'BnaA01G0000200ZS', 'BnaA01G0000300ZS'],
  'Brassica carinata': ['Bca101B1G000010', 'Bca101B1G000020', 'Bca101B1G000030'],
  'Brassica juncea': ['BjuVA01G00010', 'BjuVA01G00020', 'BjuVA01G00030'],
  'Brassica nigra': ['BniA01G0000100ZS', 'BniA01G0000200ZS', 'BniA01G0000300ZS'],
  'Brassica oleracea': ['Bol101B1G000010', 'Bol101B1G000020', 'Bol101B1G000030'],
  'Brassica rapa': ['BraVA01G00010', 'BraVA01G00020', 'BraVA01G00030']

});

const selectedCascader = ref(null);
const cascaderOptions = ref([]);
const originalData = ref([]);

// 添加基因ID到输入框
function addGeneId(geneId: string) {
  if (!form.value.geneIdsInput.includes(geneId)) {
    form.value.geneIdsInput += form.value.geneIdsInput ? `, ${geneId}` : geneId;
  }
}

// 提交数据
function submitQuery() {
  emits('submitQuery', {
    gene_ids: form.value.geneIdsInput.split(',').map(id => id.trim()), // 确保 gene_ids 是数组格式
    species: form.value.selectedSpecies,
    bioproject: form.value.bioproject,
    mode: form.value.selectedMode,
    tissue: form.value.selectedTissue,
    classify: form.value.selectedClassify,
    treatment_type: form.value.selectedTreatmentType
  });
}

// 重置表单
function resetForm() {
  form.value.selectedSpecies = null;
  form.value.geneIdsInput = '';
  form.value.bioproject = '';
  form.value.selectedMode = '';
  form.value.selectedTissue = '';
  form.value.selectedClassify = '';
  form.value.selectedTreatmentType = '';
  selectedCascader.value = null;
  emits('resetQuery');
}

// 加载数据集并生成选项
async function loadDataset() {
  try {
    const data = await import('@/assets/data/testproject.json');
    originalData.value = data.default;
  } catch (error) {
    console.error('Error loading dataset:', error);
  }
}

function generateCascaderOptions(species) {
  const speciesData = originalData.value.filter(item => item.Organism === species);
  const options = [];

  speciesData.forEach(item => {
    let modeOption = options.find(opt => opt.label === item.Mode);
    if (!modeOption) {
      modeOption = {
        label: item.Mode,
        value: item.Mode,
        children: []
      };
      options.push(modeOption);
    }

    let tissueOption = modeOption.children.find(opt => opt.label === item.Tissue);
    if (!tissueOption) {
      tissueOption = {
        label: item.Tissue,
        value: item.Tissue,
        children: []
      };
      modeOption.children.push(tissueOption);
    }

    let classifyOption = tissueOption.children.find(opt => opt.label === item.Classify);
    if (!classifyOption) {
      classifyOption = {
        label: item.Classify,
        value: item.Classify,
        children: []
      };
      tissueOption.children.push(classifyOption);
    }

    let treatmentOption = classifyOption.children.find(opt => opt.label === item.Treatment_type);
    if (!treatmentOption) {
      treatmentOption = {
        label: item.Treatment_type,
        value: item.Treatment_type,
        children: []
      };
      classifyOption.children.push(treatmentOption);
    }

    treatmentOption.children.push({
      label: `${item.BioProject} (${item.Description})`,
      value: item.BioProject
    });
  });

  cascaderOptions.value = options;
}

function onSpeciesChange(species) {
  selectedCascader.value = null;
  form.value.bioproject = '';
  form.value.selectedMode = '';
  form.value.selectedTissue = '';
  form.value.selectedClassify = '';
  form.value.selectedTreatmentType = '';

  if (species) {
    generateCascaderOptions(species);
  }
}

function onCascaderChange(value) {
  if (value && value.length) {
    const lastSelected = value[value.length - 1];
    form.value.bioproject = lastSelected;

    const selectedItem = originalData.value.find(item => item.BioProject === lastSelected);
    if (selectedItem) {
      form.value.selectedMode = selectedItem.Mode;
      form.value.selectedTissue = selectedItem.Tissue;
      form.value.selectedClassify = selectedItem.Classify;
      form.value.selectedTreatmentType = selectedItem.Treatment_type;
    }
  }
}

// 组件加载时初始化数据
loadDataset();
</script>
