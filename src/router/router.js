import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', redirect: 'binance_depth/Settings'},
  { path: 'binance_depth/Settings', component: import('../pages/SettingsPage.vue') },
  { path: 'binance_depth/OrderBook', component: import('../pages/OrderBookPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
