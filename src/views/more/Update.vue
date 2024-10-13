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
        date: 'Oct 2024',
        descriptions: [
          '10/01/2024: Refined UI with enhanced card-style layouts and responsive design for all data display pages.',
          '10/01/2024: Navigation structure standardized across all pages, including help, links, and transcript expression modules.'
        ]
      },
      {
        date: 'Sep 2024',
        descriptions: [
          '9/25/2024: Introduced interactive search function for gene expression data, allowing users to filter by species and bioproject.',
          '9/15/2024: Added animation effects for link cards and search results to enhance user experience.',
          '9/05/2024: Fully integrated breadcrumb navigation across all pages, improving usability and consistent page flow.'
        ]
      },
      {
        date: 'Aug 2024',
        descriptions: [
          '8/30/2024: Launched new "Help" section with interactive BrassicaGPT module to assist users with database queries.',
          '8/20/2024: Optimized mobile responsiveness, ensuring seamless data interaction on all devices.',
          '8/10/2024: Improved performance of the large search input box for website links with real-time filtering.'
        ]
      },
      {
        date: 'Jul 2024',
        descriptions: [
          '7/25/2024: Redesigned the "Links" page with enhanced visuals, animations, and card-style display for external resources.',
          '7/15/2024: Added fade-in animations for smoother page transitions in the gene expression and co-expression modules.',
          '7/05/2024: Introduced new responsive navigation with custom breadcrumb functionality for better user flow.'
        ]
      },
      {
        date: 'Jun 2024',
        descriptions: [
          '6/28/2024: Launched redesigned "Transcript Expression" page with interactive charts, including trend plots, heatmaps, and bar plots.',
          '6/15/2024: Introduced real-time visual feedback for search results using transition animations and dynamic card layouts.',
          '6/05/2024: Improved data loading times for large datasets by optimizing API requests in gene expression queries.'
        ]
      },
      {
        date: 'May 2024',
        descriptions: [
          '5/31/2024: PLINK binary files have been added in the download module.',
          '5/20/2024: Updated page layouts for better scalability and performance on different screen sizes.',
          '5/10/2024: Added carousel animation for image-based content on the co-expression and transcription factor pages.'
        ]
      },
      {
        date: 'Apr 2024',
        descriptions: [
          '4/25/2024: New interactive charts for transcriptomic data visualization, including gene expression boxplots and scatterplots.',
          '4/15/2024: Enhanced the navigation experience with hover and focus animations for better accessibility.',
          '4/05/2024: Integrated feedback on page layouts, ensuring all pages follow consistent design principles and mobile responsiveness.'
        ]
      },
      {
        date: 'Mar 2024',
        descriptions: [
          '3/31/2024: Optimized data tables with interactive sorting and filtering for the transcript and project pages.',
          '3/20/2024: Introduced search and quick-selection features for gene IDs on all data input forms.',
          '3/10/2024: Added new species options to the species selection dropdown in the transcript expression query form.'
        ]
      }
    ]
);
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
