<template>
  <div class="update-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>Update & News</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/more">More</el-breadcrumb-item>
          <el-breadcrumb-item>Update & News</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Update Timeline -->
    <el-card class="timeline-card">
      <h2>Update Timeline</h2>
      <el-timeline>
        <el-timeline-item v-for="(item, index) in updates" :key="index" :timestamp="item.date" placement="top">
          <p v-for="(desc, descIndex) in item.descriptions" :key="descIndex">{{ desc }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 假设的更新数据
const updates = ref([
  {
    date: 'May 2024',
    descriptions: [
      '5/31/2024: PLINK binary files have been added in the download module.'
    ]
  },
  {
    date: 'Feb 2024',
    descriptions: [
      '2/25/2024: New transcriptome data for Brassica species has been added.',
      '2/15/2024: Enhanced search functionality with fuzzy search option.'
    ]
  },
  {
    date: 'Nov 2023',
    descriptions: [
      '11/20/2023: Integrated KEGG pathway search for Brassica genes.',
      '11/05/2023: Improved data visualization tools.'
    ]
  },
  {
    date: 'Aug 2023',
    descriptions: [
      '8/18/2023: Added gene regulatory network search tool.',
      '8/10/2023: Enhanced user interface for mobile devices.'
    ]
  },
  {
    date: 'May 2023',
    descriptions: [
      '5/25/2023: BrassicaEDB manuscript published in a peer-reviewed journal.',
      '5/15/2023: Introduced real-time data updates for gene expression profiles.'
    ]
  },
  {
    date: 'Feb 2023',
    descriptions: [
      '2/20/2023: Updated gene ontology annotations.',
      '2/10/2023: Launched new API for external data integration.'
    ]
  },
  {
    date: 'Nov 2022',
    descriptions: [
      '11/25/2022: Added support for multi-species gene comparisons.',
      '11/10/2022: Improved database performance and speed.'
    ]
  },
  {
    date: 'Aug 2022',
    descriptions: [
      '8/20/2022: BrassicaEDB officially launched with initial datasets.',
      '8/10/2022: IAnimal now enables HTTPS protocol, it allows users to safely send information via the Web through encryption.'
    ]
  }
]);
</script>

<style scoped>
.update-page {
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
  border-bottom: 1px solid #ccc;
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

.timeline-card {
  margin-top: 20px;
}

.el-timeline-item__timestamp {
  font-weight: bold;
}
</style>
