import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home/Home.vue';
import GeneFeature from '../views/genefeature/IndexGeneFeature.vue';
import Search from '../views/search/IndexSearch.vue';
import Tools from '../views/tools/IndexTools.vue';
import Download from '../views/download/IndexDownload.vue';
import More from '../views/more/IndexMore.vue';
import BrassicaCarinata from '../views/genefeature/BrassicaCarinata.vue';
import BrassicaJuncea from '../views/genefeature/BrassicaJuncea.vue';
import BrassicaNapus from '../views/genefeature/BrassicaNapus.vue';
import BrassicaNigra from '../views/genefeature/BrassicaNigra.vue';
import BrassicaOleracea from '../views/genefeature/BrassicaOleracea.vue';
import BrassicaRapa from '../views/genefeature/BrassicaRapa.vue';
import HomologousGene from '../views/search/HomologousGene.vue';
import Expression from '../views/search/Expression.vue';
import AlternativeSplicing from '../views/search/AlternativeSplicing.vue';
import CoExpression from '../views/search/CoExpression.vue';
import TF from '../views/search/TF.vue';
import Blast from '../views/tools/Blast.vue';
import Jbrowse from '../views/tools/Jbrowse.vue';
import Primer from '../views/tools/Primer.vue';
import EFpSeq from '../views/tools/EFpSeq.vue';
import CoExpressionSeqFetch from '../views/tools/CoExpressionSeqFetch.vue';
import KEGGEnrichment from '../views/tools/KEGGEnrichment.vue';
import BasicData from '../views/download/BasicData.vue';
import GenomicData from '../views/download/GenomicData.vue';
import API from '../views/download/Api.vue';
import Help from '../views/more/Help.vue';
import Links from '../views/more/Links.vue';
import About from '../views/more/About.vue';
import Update from '../views/more/Update.vue';
import SearchResult from '@/views/SearchResult.vue';

import Analysis from '../views/analysis/indexanalysis.vue';
import GeneticDifferencesBetweenSpecies from '../views/analysis/geneticdifferencesbetweenspecies.vue';
import InterspeciesCoExpression from '../views/analysis/interspeciescoexpression.vue';
import RegulatoryNetworkPrediction from '../views/analysis/regulatorynetworkprediction.vue';
import PageA from '../views/analysis/a.vue';
import PageB from '../views/analysis/b.vue';





const routes = [
    { path: '/', component: Home, meta: { title: 'Home', breadcrumbs: ['Home'] } },
    { path: '/search-result/:geneId', name: 'SearchResult', component: SearchResult, props: true },
    { path: '/genefeature', component: GeneFeature, meta: { title: 'Gene feature', breadcrumbs: ['Home', 'Gene feature'] } },
    { path: '/genefeature/brassicacarinata', component: BrassicaCarinata, meta: { title: 'Brassica carinata', breadcrumbs: ['Home', 'Gene feature', 'Brassica carinata'] } },
    { path: '/genefeature/juncea', component: BrassicaJuncea, meta: { title: 'Brassica juncea', breadcrumbs: ['Home', 'Gene feature', 'Brassica juncea'] } },
    { path: '/genefeature/napus', component: BrassicaNapus, meta: { title: 'Brassica napus', breadcrumbs: ['Home', 'Gene feature', 'Brassica napus'] } },
    { path: '/genefeature/nigra', component: BrassicaNigra, meta: { title: 'Brassica nigra', breadcrumbs: ['Home', 'Gene feature', 'Brassica nigra'] } },
    { path: '/genefeature/oleracea', component: BrassicaOleracea, meta: { title: 'Brassica oleracea', breadcrumbs: ['Home', 'Gene feature', 'Brassica oleracea'] } },
    { path: '/genefeature/rapa', component: BrassicaRapa, meta: { title: 'Brassica rapa', breadcrumbs: ['Home', 'Gene feature', 'Brassica rapa'] } },

    { path: '/analysis', component: Analysis, meta: { title: 'Analysis', breadcrumbs: ['Home', 'Analysis'] } },
    // Analysis 路由
    { path: '/analysis', component: Analysis, meta: { title: 'Analysis', breadcrumbs: ['Home', 'Analysis'] } },
    { path: '/analysis/a', component: PageA, meta: { title: 'Page A', breadcrumbs: ['Home', 'Analysis', 'Page A'] } },
    { path: '/analysis/b', component: PageB, meta: { title: 'Page B', breadcrumbs: ['Home', 'Analysis', 'Page B'] } },

    { path: '/analysis/genetic-differences', component: GeneticDifferencesBetweenSpecies, meta: { title: 'Genetic Differences Between Species', breadcrumbs: ['Home', 'Analysis', 'Genetic Differences Between Species'] } },
    { path: '/analysis/interspecies-coexpression', component: InterspeciesCoExpression, meta: { title: 'Interspecies Co-expression', breadcrumbs: ['Home', 'Analysis', 'Interspecies Co-expression'] } },
    { path: '/analysis/regulatory-network-prediction', component: RegulatoryNetworkPrediction, meta: { title: 'Regulatory Network Prediction', breadcrumbs: ['Home', 'Analysis', 'Regulatory Network Prediction'] } },

    // 修改后的 Search 路由
    { path: '/search', component: Search, meta: { title: 'Search', breadcrumbs: ['Home', 'Search'] } },
    { path: '/search/homologous', component: HomologousGene, meta: { title: 'Homologous gene', breadcrumbs: ['Home', 'Search', 'Homologous gene'] } },
    { path: '/search/expression', component: Expression, meta: { title: 'Expression', breadcrumbs: ['Home', 'Search', 'Expression'] } },
    { path: '/search/splicing', component: AlternativeSplicing, meta: { title: 'Alternative splicing', breadcrumbs: ['Home', 'Search', 'Alternative splicing'] } },
    { path: '/search/coexpression', component: CoExpression, meta: { title: 'Co-expression', breadcrumbs: ['Home', 'Search', 'Co-expression'] } },
    { path: '/search/tf', component: TF, meta: { title: 'TF', breadcrumbs: ['Home', 'Search', 'TF'] } },

    { path: '/tools', component: Tools, meta: { title: 'Tools', breadcrumbs: ['Home', 'Tools'] } },
    { path: '/tools/blast', component: Blast, meta: { title: 'Blast', breadcrumbs: ['Home', 'Tools', 'Blast'] } },
    { path: '/tools/jbrowse', component: Jbrowse, meta: { title: 'Jbrowse', breadcrumbs: ['Home', 'Tools', 'Jbrowse'] } },
    { path: '/tools/primer', component: Primer, meta: { title: 'Primer', breadcrumbs: ['Home', 'Tools', 'Primer'] } },
    { path: '/tools/efpseq', component: EFpSeq, meta: { title: 'eFP-seq', breadcrumbs: ['Home', 'Tools', 'eFP-seq'] } },
    { path: '/tools/coexpression', component: CoExpressionSeqFetch, meta: { title: 'Co-expression', breadcrumbs: ['Home', 'Tools', 'Co-expression'] } },
    { path: '/tools/seqfetch', component: KEGGEnrichment, meta: { title: 'KEGG enrichment', breadcrumbs: ['Home', 'Tools', 'KEGG enrichment'] } },

    { path: '/download', component: Download, meta: { title: 'Download', breadcrumbs: ['Home', 'Download'] } },
    { path: '/download/basicdata', component: BasicData, meta: { title: 'Basic data', breadcrumbs: ['Home', 'Download', 'Basic data'] } },
    { path: '/download/genomicdata', component: GenomicData, meta: { title: 'Genomic data', breadcrumbs: ['Home', 'Download', 'Genomic data'] } },
    { path: '/download/api', component: API, meta: { title: 'API', breadcrumbs: ['Home', 'Download', 'API'] } },

    { path: '/more', component: More, meta: { title: 'More', breadcrumbs: ['Home', 'More'] } },
    { path: '/more/help', component: Help, meta: { title: 'Help', breadcrumbs: ['Home', 'More', 'Help'] } },
    { path: '/more/links', component: Links, meta: { title: 'Links', breadcrumbs: ['Home', 'More', 'Links'] } },
    { path: '/more/about', component: About, meta: { title: 'About', breadcrumbs: ['Home', 'More', 'About'] } },
    { path: '/more/update', component: Update, meta: { title: 'Update', breadcrumbs: ['Home', 'More', 'Update'] } }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
