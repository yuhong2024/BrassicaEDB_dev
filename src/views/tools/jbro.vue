<template>
  <!--  <Jbro />-->
  <div id="jbrowse_linear_genome_view"></div>
</template>

<script setup lang="ts">
import Jbro from '@/components/Tools/Title/jbro.vue'; // 引入前面写好的 JBrowse 组件
import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view';
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {onMounted} from "vue";

const fetchConfig = async () => {
  try {
    const response = await fetch('/media/config/config.json');
    //本地测试
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error('Error fetching config:', error);
    return null;
  }
};

onMounted(async () => {
  const config = await fetchConfig();

  const assembly = config.assemblies[0];
  const tracks = config.tracks;
  const location = config.location;

  const state = createViewState({
    assembly: assembly,
    tracks: tracks,
    location: location,
    defaultSession: {
      name: config.defaultSession.name,
      margin: 0,
      view: config.defaultSession.views[0],
    }
  });

  const container = document.getElementById('jbrowse_linear_genome_view');
  const root = createRoot(container!);
  root.render(createElement(JBrowseLinearGenomeView, { viewState: state }));
});


</script>

<style scoped>
</style>