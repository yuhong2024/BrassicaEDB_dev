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
    title: "Gene feature",
    links: [
      { name: "Brassica carinata", url: "/genefeature/brassicacarinata" },
      { name: "Brassica juncea", url: "/genefeature/juncea" },
      { name: "Brassica napus", url: "/genefeature/napus" },
      { name: "Brassica nigra", url: "/genefeature/nigra" },
      { name: "Brassica oleracea", url: "/genefeature/oleracea" },
      { name: "Brassica rapa", url: "/genefeature/rapa" },
    ],
  },
  {
    title: "Search",
    links: [
      { name: "Homologous gene", url: "/search/homologous" },
      { name: "Expression", url: "/search/expression" },
      { name: "Alternative splicing", url: "/search/splicing" },
      { name: "Co-expression", url: "/search/coexpression" },
      { name: "TF", url: "/search/tf" },
    ],
  },
  {
    title: "Tools",
    links: [
      { name: "Blast", url: "/tools/blast" },
      { name: "Jbrowse", url: "/tools/jbrowse" },
      { name: "Primer", url: "/tools/primer" },
      { name: "eFP-seq", url: "/tools/efpseq" },
      { name: "Co-expression", url: "/tools/coexpression" },
      { name: "Seq-fetch", url: "/tools/seqfetch" },
      { name: "KEGG enrichment", url: "/tools/seqfetch" },
    ],
  },
  {
    title: "Download",
    links: [
      { name: "Basic data", url: "/download/basicdata" },
      { name: "Genomic data", url: "/download/genomicdata" },
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
