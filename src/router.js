import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import CompanySearch from '@/components/CompanySearch.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy';
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
