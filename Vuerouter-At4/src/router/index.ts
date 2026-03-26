import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ConsumerLayout from '../layouts/ConsumerLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ConsumerLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product-details',
          component: () => import('../views/ProductDetailsView.vue'),
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/CheckoutView.vue'),
          meta: { requiresAuth: true, layout: 'consumer' }
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/AdminDashboardView.vue'),
        }
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    alert('Acesso negado: Você precisa estar logado para acessar esta página.')
    next('/')
  } else if (to.meta.requiresAdmin && auth.userRole !== 'ADMIN') {
    alert('Acesso negado: Apenas administradores podem acessar o painel.')
    next('/')
  } else {
    next()
  }
})

export default router
