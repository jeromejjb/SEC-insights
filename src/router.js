import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import CompanySearch from '@/components/CompanySearch.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import CareersPage from '@/components/CareersPage';
import RoadmapPage from '@/components/RoadmapPage';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/company-search/:ticker',
    name: 'CompanySearch',
    component: CompanySearch,
    props: true,
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/careers',
    name: 'CareersPage',
    component: CareersPage
  },
  {
    path: '/roadmap',
    name: 'RoadmapPage',
    component: RoadmapPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
