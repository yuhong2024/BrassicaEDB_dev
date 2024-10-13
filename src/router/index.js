import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home/Home.vue';






import GeneFeature from '../views/genefeature/IndexGeneFeature.vue';
import BrassicaCarinata from '../views/genefeature/BrassicaCarinata.vue';
import BrassicaJuncea from '../views/genefeature/BrassicaJuncea.vue';
import BrassicaNapus from '../views/genefeature/BrassicaNapus.vue';
import BrassicaNigra from '../views/genefeature/BrassicaNigra.vue';
import BrassicaOleracea from '../views/genefeature/BrassicaOleracea.vue';
import BrassicaRapa from '../views/genefeature/BrassicaRapa.vue';

import Search from '../views/search/IndexSearch.vue';
import HomologousGene from '../views/search/HomologousGene.vue';
import Expression from '../views/search/Expression.vue';
import AlternativeSplicing from '../views/search/AlternativeSplicing.vue';
import CoExpression from '../views/search/CoExpression.vue';
import TF from '../views/search/TF.vue';

import Tools from '../views/tools/IndexTools.vue';
import Blast from '../views/tools/Blast.vue';
import Jbrowse from '../views/tools/Jbrowse.vue';
import qprimer from '../views/tools/qprimer.vue';
import efp from '../views/tools/efp.vue';
import go from '../views/tools/go.vue';
import KEGGEnrichment from '../views/tools/KEGGEnrichment.vue';
import seqfetch from '../views/tools/seqfetch.vue';
import hmmer from '../views/tools/hmmer.vue';




import Download from '../views/download/IndexDownload.vue';
import BasicData from '../views/download/summary.vue';
import GenomicData from '../views/download/data.vue';
import API from '../views/download/Api.vue';

import More from '../views/more/IndexMore.vue';
import Help from '../views/more/Help.vue';
import Links from '../views/more/Links.vue';
import About from '../views/more/About.vue';
import Update from '../views/more/Update.vue';
import SearchResult from '@/views/SearchResult.vue';



import Analysis from '../views/analysis/indexanalysis.vue';
import differ from '../views/analysis/differ.vue';
import network from '../views/analysis/network.vue';
import coexpression from '../views/analysis/coexpression.vue';




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


    // Analysis 路由
    { path: '/analysis', component: Analysis, meta: { title: 'Analysis', breadcrumbs: ['Home', 'Analysis'] } },
    { path: '/analysis/differ', component: differ, meta: { title: 'differ', breadcrumbs: ['Home', 'Analysis', 'differ'] } },
    { path: '/analysis/network', component: network, meta: { title: 'network', breadcrumbs: ['Home', 'Analysis', 'network'] } },
    { path: '/analysis/coexpression', component: coexpression, meta: { title: 'coexpression', breadcrumbs: ['Home', 'Analysis', 'coexpression'] } },



    //  Search 路由
    { path: '/search', component: Search, meta: { title: 'Search', breadcrumbs: ['Home', 'Search'] } },
    { path: '/search/homologous', component: HomologousGene, meta: { title: 'Homologous gene', breadcrumbs: ['Home', 'Search', 'Homologous gene'] } },
    { path: '/search/expression', component: Expression, meta: { title: 'Expression', breadcrumbs: ['Home', 'Search', 'Expression'] } },
    { path: '/search/splicing', component: AlternativeSplicing, meta: { title: 'Alternative splicing', breadcrumbs: ['Home', 'Search', 'Alternative splicing'] } },
    { path: '/search/coexpression', component: CoExpression, meta: { title: 'Co-expression', breadcrumbs: ['Home', 'Search', 'Co-expression'] } },
    { path: '/search/tf', component: TF, meta: { title: 'TF', breadcrumbs: ['Home', 'Search', 'TF'] } },

    // tool路由
    { path: '/tools', component: Tools, meta: { title: 'Tools', breadcrumbs: ['Home', 'Tools'] } },
    { path: '/tools/blast', component: Blast, meta: { title: 'Blast', breadcrumbs: ['Home', 'Tools', 'Blast'] } },
    { path: '/tools/jbrowse', component: Jbrowse, meta: { title: 'Jbrowse', breadcrumbs: ['Home', 'Tools', 'Jbrowse'] } },
    { path: '/tools/qprimer', component: qprimer, meta: { title: 'qprimer', breadcrumbs: ['Home', 'Tools', 'aprimer'] } },
    { path: '/tools/efp', component: efp, meta: { title: 'efp', breadcrumbs: ['Home', 'Tools', 'efp'] } },
    { path: '/tools/go', component: go, meta: { title: 'go', breadcrumbs: ['Home', 'Tools', 'go'] } },
    { path: '/tools/kegg', component: KEGGEnrichment, meta: { title: 'KEGG enrichment', breadcrumbs: ['Home', 'Tools', 'KEGG enrichment'] } },
    { path: '/tools/seqfetch', component: seqfetch, meta: { title: 'seqfetch', breadcrumbs: ['Home', 'Tools', 'seqfetch'] } },
    { path: '/tools/hmmer', component: hmmer, meta: { title: 'hmmer', breadcrumbs: ['Home', 'Tools', 'hmmer'] } },


    { path: '/download', component: Download, meta: { title: 'Download', breadcrumbs: ['Home', 'Download'] } },
    { path: '/download/summary', component: BasicData, meta: { title: 'summary', breadcrumbs: ['Home', 'summary', 'summary'] } },
    { path: '/download/data', component: GenomicData, meta: { title: 'data', breadcrumbs: ['Home', 'data', 'data'] } },
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
