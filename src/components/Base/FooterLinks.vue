<template>
  <div class="footer-links">
    <div
        v-for="(category, index) in categories"
        :key="index"
        class="category-card"
    >
      <h3 class="category-title">{{ category.title }}</h3>
      <ul>
        <li v-for="(link, linkIndex) in category.links" :key="linkIndex">
          <!-- 使用 router-link 而不是 a 标签 -->
          <router-link :to="link.url">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    title: "Browse",
    links: [
      { name: "Brassica carinata", url: "/browse/carinata" },
      { name: "Brassica juncea", url: "/browse/juncea" },
      { name: "Brassica napus", url: "/browse/napus" },
      { name: "Brassica nigra", url: "/browse/nigra" },
      { name: "Brassica oleracea", url: "/browse/oleracea" },
      { name: "Brassica rapa", url: "/browse/rapa" },
    ],
  },
  {
    title: "Search",
    links: [
      { name: "Transcriptome Expression", url: "/search/expression" },
      { name: "Interspecific Homologous", url: "/search/homologous" },
      { name: "eFP-seq", url: "/search/efp" },
      { name: "TF Regulatory Network", url: "/search/tf" },
      { name: "Co-expression Network", url: "/search/coexpression" },
      { name: "Alternative Splicing", url: "/search/splicing" },

    ],

  },
  {
    title: "Tools",
    links: [
      { name: "qPrimer", url: "/tools/qprimer" },
      { name: "Seq-fetch", url: "/tools/seqfetch" },
      { name: "GO enrichment ", url: "/tools/go" },
      { name: "KEGG enrichment", url: "/tools/kegg" },
      { name: "Blast", url: "/tools/blast" },
      { name: "Jbrowse", url: "/tools/jbrowse" },
    ],
  },

  {
    title: "More",
    links: [
      { name: "About", url: "/more/About" },
      { name: "Help", url: "/more/help" },
      { name: "Links", url: "/more/links" },
      { name: "Update", url: "/more/update" },
    ],
  },



];
</script>

<style scoped>
.footer-links {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.category-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: 23%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.category-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 15px;
  transition: color 0.3s ease;
}

.category-title:hover {
  color: #007bff;
}

a,
.router-link {
  color: #28a745;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover,
.router-link:hover {
  color: #0056b3;
}

li {
  margin-bottom: 10px;
  list-style: none;
}
</style>
