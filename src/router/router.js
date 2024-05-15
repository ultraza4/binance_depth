import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', redirect: '/Settings'},
  { path: '/Settings', component: () => import('../pages/SettingsPage.vue') },
  { path: '/OrderBook', component: () => import('../pages/OrderBookPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
