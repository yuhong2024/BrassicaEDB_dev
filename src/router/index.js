import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home/Home.vue';

import Browse from '../views/browse/IndexBrowse.vue';
import BrassicaCarinata from '../views/browse/BrassicaCarinata.vue';
import BrassicaJuncea from '../views/browse/BrassicaJuncea.vue';
import BrassicaNapus from '../views/browse/BrassicaNapus.vue';
import BrassicaNigra from '../views/browse/BrassicaNigra.vue';
import BrassicaOleracea from '../views/browse/BrassicaOleracea.vue';
import BrassicaRapa from '../views/browse/BrassicaRapa.vue';

import Search from '../views/search/IndexSearch.vue';
import HomologousGene from '../views/search/Homo.vue';
import Expression from '../views/search/Expression.vue';
import AlternativeSplicing from '../views/search/AS.vue';
import CoExpression from '../views/search/CoExpression.vue';

import TF from '../views/search/TF.vue';
import efp from '../views/search/efp.vue';
import pantranme from '../views/search/Pantranme.vue';

import Tools from '../views/tools/IndexTools.vue';
import Blast from '../views/tools/Blast.vue';
import Jbrowse from '../views/tools/Jbrowse.vue';
import qprimer from '../views/tools/qprimer.vue';
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
import SearchResult from '@/views/browse/SearchResult.vue';


import FeatureResult from '@/views/FeatureResult.vue';
import Analysis from '../views/analysis/indexanalysis.vue';
import go from '../views/analysis/go.vue';
import KEGGEnrichment from '../views/analysis/KEGGEnrichment.vue';
import deseq from '../views/analysis/deseq.vue';
import wgcna from '../views/analysis/wgcna.vue';




const routes = [
    { path: '/', component: Home, meta: { title: 'Home', breadcrumbs: ['Home'] } },
    { path: '/feature-result/:geneId', name: 'FeatureResult', component: FeatureResult, props: true },


    { path: '/search-result/:geneId', name: 'SearchResult', component: SearchResult, props: true },
    { path: '/browse', component: Browse, meta: { title: 'Browse', breadcrumbs: ['Home', 'Browse'] } },
    { path: '/browse/carinata', component: BrassicaCarinata, meta: { title: 'Brassica carinata', breadcrumbs: ['Home', 'browse', 'Brassica carinata'] } },
    { path: '/browse/juncea', component: BrassicaJuncea, meta: { title: 'Brassica juncea', breadcrumbs: ['Home', 'browse', 'Brassica juncea'] } },
    { path: '/browse/napus', component: BrassicaNapus, meta: { title: 'Brassica napus', breadcrumbs: ['Home', 'browse', 'Brassica napus'] } },
    { path: '/browse/nigra', component: BrassicaNigra, meta: { title: 'Brassica nigra', breadcrumbs: ['Home', 'browse', 'Brassica nigra'] } },
    { path: '/browse/oleracea', component: BrassicaOleracea, meta: { title: 'Brassica oleracea', breadcrumbs: ['Home', 'browse', 'Brassica oleracea'] } },
    { path: '/browse/rapa', component: BrassicaRapa, meta: { title: 'Brassica rapa', breadcrumbs: ['Home', 'browse', 'Brassica rapa'] } },

    // Analysis 路由
    { path: '/analysis', component: Analysis, meta: { title: 'Analysis', breadcrumbs: ['Home', 'Analysis'] } },
    { path: '/analysis/go', component: go, meta: { title: 'go', breadcrumbs: ['Home', ' Analysis', 'go'] } },
    { path: '/analysis/kegg', component: KEGGEnrichment, meta: { title: 'KEGG enrichment', breadcrumbs: ['Home', 'Analysis', 'KEGG enrichment'] } },
    { path: '/analysis/deseq', component: deseq, meta: { title: 'deseq', breadcrumbs: ['Home', 'Analysis', 'deseq'] } },
    { path: '/analysis/wgcna', component: wgcna, meta: { title: 'wgcna', breadcrumbs: ['Home', 'Analysis', 'wgcna'] } },

    //  Search 路由
    { path: '/search', component: Search, meta: { title: 'Search', breadcrumbs: ['Home', 'Search'] } },
    { path: '/search/homologous', component: HomologousGene, meta: { title: 'Homologous gene', breadcrumbs: ['Home', 'Search', 'Homologous gene'] } },
    { path: '/search/expression', component: Expression, meta: { title: 'Expression', breadcrumbs: ['Home', 'Search', 'Expression'] } },
    { path: '/search/splicing', component: AlternativeSplicing, meta: { title: 'Alternative splicing', breadcrumbs: ['Home', 'Search', 'Alternative splicing'] } },
    { path: '/search/tf', component: TF, meta: { title: 'TF', breadcrumbs: ['Home', 'Search', 'TF'] } },
    { path: '/search/pantranme', component: pantranme, meta: { title: 'coexpression', breadcrumbs: ['Home', 'Search', 'pantranme'] } },
    { path: '/search/efp', component: efp, meta: { title: 'efp', breadcrumbs: ['Home', 'Search', 'efp'] } },


    // tool路由
    { path: '/tools', component: Tools, meta: { title: 'Tools', breadcrumbs: ['Home', 'tools'] } },
    { path: '/tools/blast', component: Blast, meta: { title: 'Blast', breadcrumbs: ['Home', 'tools', 'Blast'] } },
    { path: '/tools/jbrowse', component: Jbrowse, meta: { title: 'Jbrowse', breadcrumbs: ['Home', 'tools', 'Jbrowse'] } },
    { path: '/tools/qprimer', component: qprimer, meta: { title: 'qprimer', breadcrumbs: ['Home', 'tools', 'qprimer'] } },
    { path: '/tools/seqfetch', component: seqfetch, meta: { title: 'seqfetch', breadcrumbs: ['Home', 'tools', 'seqfetch'] } },


    { path: '/download', component: Download, meta: { title: 'Download', breadcrumbs: ['Home', 'Download'] } },
    { path: '/download/summary', component: BasicData, meta: { title: 'summary', breadcrumbs: ['Home', 'summary', 'summary'] } },
    { path: '/download/data', component: GenomicData, meta: { title: 'data', breadcrumbs: ['Home', 'data', 'data'] } },
    { path: '/download/api', component: API, meta: { title: 'API', breadcrumbs: ['Home', 'Download', 'API'] } },

    { path: '/more', component: More, meta: { title: 'More', breadcrumbs: ['Home', 'More'] } },
    { path: '/more/help', component: Help, meta: { title: 'Help', breadcrumbs: ['Home', 'More', 'Help'] } },
    { path: '/more/links', component: Links, meta: { title: 'Links', breadcrumbs: ['Home', 'More', 'Links'] } },
    { path: '/more/about', component: About, meta: { title: 'About', breadcrumbs: ['Home', 'More', 'About'] } },
    { path: '/more/update', component: Update, meta: { title: 'Update.md', breadcrumbs: ['Home', 'More', 'Update.md'] } }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 如果有保存的位置，返回保存的滚动位置
        if (savedPosition) {
            return savedPosition;
        }

        // 否则，默认滚动到页面顶部
        return { top: 0 };
    }

});
export default router;
