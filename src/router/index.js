import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/LoginView.vue')
    }, 
    {
      path: '/stok',
      name: 'stok',
      component: () => import('../views/Stok.vue')
    },    
    {
      path: '/pemesanan',
      name: 'pemesanan',
      component: () => import('../views/Pemesanan.vue')
    },    
    {
      path: '/pemesanan-ps',
      name: 'pemesanan-ps',
      component: () => import('../views/PemesananUser.vue')
    },        
  ]
})

export default router
