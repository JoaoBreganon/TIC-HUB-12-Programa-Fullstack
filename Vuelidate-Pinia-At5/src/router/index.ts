import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ConsumerLayout from '../layouts/ConsumerLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true }
    },
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

/**
 * Navigation Guard global:
 * - Rotas com requiresAuth → redireciona para /login com query ?redirect=<rota_original>
 * - Rotas com requiresAdmin → verifica se é ADMIN
 * - Rotas guestOnly → se já logado, redireciona para Home
 */
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()

  // Se a rota requer autenticação e o usuário não está logado
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Se a rota requer admin e o usuário não é ADMIN
  if (to.meta.requiresAdmin && auth.userRole !== 'ADMIN') {
    next({ name: 'home' })
    return
  }

  // Se a rota é somente para guests (login) e o usuário já está logado
  if (to.meta.guestOnly && auth.isAuthenticated) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
