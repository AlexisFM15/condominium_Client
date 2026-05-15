import { useAuthStore } from '@/stores/authStore'
import type { Router } from 'vue-router'

export function setupAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)

    if (!requiresAuth) return true

    try {
      if (!requiresAuth) return true

      const authStore = useAuthStore()
      if (!authStore.user) {
        await authStore.getMe()
      }
      return true
    } catch {
      return { path: '/login' }
    }
  })
}
