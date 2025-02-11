<script setup>
</script>

<template>
  <div class="about-container">
    <el-card class="about-card">
      <!-- BEDB 数据库介绍 -->
      <h2>About BrassicaEDB</h2>
      <p>
        BrassciaEDB is a comprehensive, multi-omics database designed for Brassica crops. It integrates advanced gene
        expression data with multi-omics visualization tools to empower researchers in exploring the functional
        roles of genes in Brassica species.
      </p>
      <p>
        BrassicaEDB aims to provide a robust platform for data mining, hypothesis generation, and omics-based research,
        enabling seamless access to various types of omics data for Brassica crops.
      </p>

      <!-- 论文引用部分 -->
      <h3>Publication</h3>
      <p>
        Chao H, Li T, Luo C, Huang H, Ruan Y, Li X, Niu Y, Fan Y, Sun W, Zhang K, Li J, Qu C, Lu K.
        <i>BrassicaEDB: A Gene Expression Database for Brassica Crops.</i>
        <b>Int. J. Mol. Sci.</b> 2020, 21, 5831.
        <a href="https://www.mdpi.com/1422-0067/21/16/5831" target="_blank">View Full-Text</a>
      </p>

      <!-- Contact Section -->
      <div class="section">
        <h3 class="contact-title">Contact Us</h3>
        <div class="gallery-section">
          <div class="gallery-container">
            <div class="image-section">
              <div class="images-row">
                <img src="@/assets/img/home/display/image1.png" alt="BEDB Overview" class="gallery-image overview" />
                <img src="@/assets/img/home/display/Hi.jpg" alt="BEDB Team" class="gallery-image qrcode" />
              </div>
            </div>

            <div class="contributor-section">
              <h4 class="contributor-title">Contributors</h4>
              <div class="contributor-grid">
                <div class="contributor-item">
                  <span class="name">Li xiaodong</span>
                  <a href="mailto:lxd1997xy@163.com" class="email">(lxd1997xy@163.com)</a>
                </div>
                <div class="contributor-item">
                  <span class="name">Meng Boyu</span>
                  <a href="mailto:1340516624@qq.com" class="email">(1340516624@qq.com)</a>
                </div>
                <div class="contributor-item">
                  <span class="name">Wang Yuhong</span>
                  <a href="mailto:wyhstar@email.swu.edu.cn" class="email">(wyhstar@email.swu.edu.cn)</a>
                </div>
                <div class="contributor-item">
                  <span class="name">Wang Xueying</span>
                  <a href="mailto:1500758738@qq.com" class="email">(1500758738@qq.com)</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.about-card {
  margin: 20px auto;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #f9f9f9;
}
.about-card h2 {
  font-size: 2.6rem;
  margin-bottom: 25px;
  color: #333;
}
.about-card h3 {
  font-size: 2.2rem;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #333;
}
.about-card p {
  font-size: 1.4rem;
  line-height: 2;
  margin-bottom: 20px;
  color: #555;
}
.about-card a {
  color: #409eff;
  text-decoration: none;
}
.about-card a:hover {
  text-decoration: underline;
}

.gallery-section {
  margin-top: 20px;
  width: 100%;
}

.gallery-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.image-section {
  flex: 0 0 auto;
}

.images-row {
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.gallery-image {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.gallery-image.overview {
  width: 350px;
  height: 220px;
  object-fit: cover;
}

.gallery-image.qrcode {
  width: 220px;
  height: 220px;
  object-fit: contain;
}

.contributor-section {
  flex: 1;
  margin-top: 0;
  padding-top: 0;
}

.contributor-title {
  font-size: 20px;
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: 500;
}

.contributor-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px 30px;
}

.contributor-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
}

.name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.email {
  font-size: 1.3rem;
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email:hover {
  color: #409EFF;
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .gallery-container {
    flex-direction: column;
    align-items: center;
  }

  .contributor-section {
    padding-left: 0;
    margin-top: 30px;
    width: 100%;
    max-width: 600px;
  }

  .contributor-grid {
    gap: 15px 20px;
  }
}

@media (max-width: 768px) {
  .images-row {
    flex-direction: column;
    align-items: center;
  }

  .gallery-image.overview,
  .gallery-image.qrcode {
    width: 100%;
    max-width: 350px;
    height: auto;
  }

  .gallery-image.qrcode {
    aspect-ratio: 1/1;
  }

  .contributor-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .contributor-item {
    align-items: center;
  }

  .about-card h2 {
    font-size: 2.2rem;
  }

  .about-card h3 {
    font-size: 1.8rem;
  }

  .about-card p {
    font-size: 1.2rem;
  }

  .contributor-section h4 {
    font-size: 1.8rem;
  }

  .name {
    font-size: 1.4rem;
  }

  .email {
    font-size: 1.1rem;
  }
}

.contact-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
  text-align: left;
  padding-left: 20px;
}
</style>
