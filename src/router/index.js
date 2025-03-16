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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
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
    {
      path: '/nota',
      name: 'nota',
      component: () => import('../views/Nota.vue')
    },    
    {
      path: '/nota-detail',
      name: 'nota-detail',
      component: () => import('../views/NotaDetail.vue')
    },    
    {
      path: '/print',
      name: 'print',
      component: () => import('../views/Print.vue'),
      props: (route) => ({ id: parseInt(route.query.id), 
        index: parseInt(route.query.index) })
    },    
  ]
})

export default router
