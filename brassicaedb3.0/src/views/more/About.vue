<template>
  <div class="about-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
      <div class="breadcrumb-left">
        <h2>About BrassicaEDB</h2>
      </div>
      <div class="breadcrumb-right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item to="/more">More</el-breadcrumb-item>
          <el-breadcrumb-item>About</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- Community Forum Section -->
    <el-card class="forum-card">
      <h2>BrassicaEDB Community Forum</h2>
      <p>
        Welcome to the BrassicaEDB Community Forum! Engage with other researchers, share your findings, ask questions, and provide feedback to improve the BrassicaEDB. Our developers are here to help and respond to your queries in real-time.
      </p>

      <!-- Forum Categories -->
      <el-row :gutter="20" class="forum-categories">
        <el-col :span="8">
          <el-card shadow="hover" class="hover-card" @click="selectCategory('General Discussion')">
            <h3>General Discussion</h3>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="hover-card" @click="selectCategory('Gene Expression')">
            <h3>Gene Expression</h3>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="hover-card" @click="selectCategory('Feature Requests')">
            <h3>Feature Requests</h3>
          </el-card>
        </el-col>
      </el-row>

      <!-- Discussion Threads -->
      <el-card class="thread-card" v-if="selectedCategory">
        <h3>{{ selectedCategory }} Threads</h3>
        <el-list>
          <el-list-item v-for="thread in threads" :key="thread.id">
            <h4>{{ thread.title }}</h4>
            <p>{{ thread.content }}</p>
            <el-button type="text" @click="viewThread(thread.id)">View Thread</el-button>
          </el-list-item>
        </el-list>
        <el-input v-model="newThreadTitle" placeholder="New Thread Title"></el-input>
        <el-input type="textarea" v-model="newThreadContent" placeholder="New Thread Content"></el-input>
        <el-button type="primary" @click="createThread">Post New Thread</el-button>
      </el-card>

      <!-- Comments Section -->
      <el-card class="comments-card" v-if="selectedThread">
        <h3>Comments for: {{ selectedThread.title }}</h3>
        <el-list>
          <el-list-item v-for="comment in selectedThread.comments" :key="comment.id">
            <p><strong>{{ comment.user }}:</strong> {{ comment.text }}</p>
          </el-list-item>
        </el-list>
        <el-input type="textarea" v-model="newComment" placeholder="Add a comment"></el-input>
        <el-button type="primary" @click="addComment">Post Comment</el-button>
      </el-card>
    </el-card>

    <!-- Database Introduction Section -->
    <el-card class="intro-card">
      <h2>About BrassicaEDB</h2>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>
            <strong>BrassicaEDB</strong> is a comprehensive gene expression database specifically designed for Brassica crops. Developed to support researchers worldwide, BrassicaEDB integrates large-scale RNA sequencing (RNA-Seq) data, providing a detailed view of gene expression profiles across various Brassica species.
          </p>
          <h3>Research Background</h3>
          <p>
            The BrassicaEDB was constructed following the publication of our landmark paper, which analyzed over 940 samples from various tissues and stages of Brassica crops. This database represents a significant advancement in Brassica research, offering tools for gene expression analysis, coexpression network building, and more.
          </p>
          <h3>Key Features</h3>
          <el-card class="feature-card" shadow="always">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card shadow="hover" class="hover-card">
                  <h4>Comprehensive Expression Data</h4>
                  <p>Explore large-scale RNA-Seq datasets.</p>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="hover-card">
                  <h4>Intuitive Interface</h4>
                  <p>User-friendly design for seamless analysis.</p>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="hover-card">
                  <h4>Advanced Tools</h4>
                  <p>Perform complex analyses with a few clicks.</p>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-image
              src="src/assets/img/test/tf.jpg"
              fit="cover"
              class="intro-image"
          />
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <h3>Citation</h3>
      <p>
        To reference BrassicaEDB in your research, please use the following citation:
      </p>
      <blockquote>
        Haoyu Chao, Tian Li, Chaoyu Luo, et al. BrassicaEDB: A Gene Expression Database for Brassica Crops. Int. J. Mol. Sci. 2020, 21, 5831.
      </blockquote>
      <el-divider></el-divider>
      <h3>Future Directions</h3>
      <p>
        We are committed to expanding the BrassicaEDB to include additional species, more comprehensive data, and enhanced analytical tools, making this an indispensable resource for the Brassica research community.
      </p>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Forum data management
const selectedCategory = ref('');
const threads = reactive([
  { id: 1, title: 'Getting Started with BrassicaEDB', content: 'How do I begin?', comments: [] },
  { id: 2, title: 'Gene Expression Analysis', content: 'Discussion on expression data.', comments: [] },
]);

const selectedThread = ref(null);
const newThreadTitle = ref('');
const newThreadContent = ref('');
const newComment = ref('');

// Select forum category
const selectCategory = (category) => {
  selectedCategory.value = category;
  selectedThread.value = null;  // Clear selected thread when changing categories
};

// View specific thread
const viewThread = (id) => {
  selectedThread.value = threads.find(thread => thread.id === id);
};

// Create new thread
const createThread = () => {
  if (newThreadTitle.value && newThreadContent.value) {
    threads.push({
      id: threads.length + 1,
      title: newThreadTitle.value,
      content: newThreadContent.value,
      comments: []
    });
    newThreadTitle.value = '';
    newThreadContent.value = '';
  }
};

// Add new comment to thread
const addComment = () => {
  if (newComment.value && selectedThread.value) {
    selectedThread.value.comments.push({
      id: selectedThread.value.comments.length + 1,
      user: 'User',
      text: newComment.value
    });
    newComment.value = '';
  }
};
</script>

<style scoped>
.about-page {
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
}

.breadcrumb-left h2 {
  margin: 0;
  font-weight: bold;
}

.breadcrumb-right .el-breadcrumb {
  font-size: 16px;
}

.forum-card,
.intro-card {
  margin-bottom: 20px;
}

.forum-categories {
  margin-top: 20px;
}

.hover-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.thread-card,
.comments-card {
  margin-top: 20px;
}

.thread-card h3,
.comments-card h3 {
  margin-bottom: 10px;
}

.comments-card {
  background-color: #f9f9f9;
  padding: 20px;
}

.feature-card {
  margin-top: 20px;
}

.intro-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.el-divider {
  margin: 20px 0;
}
</style>
