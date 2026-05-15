import { createRouter, createWebHistory } from 'vue-router'
// layouts
import AdminLayout from '@/layouts/dashboardLayout.vue'

// pages
// import Login from '@/pages/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import notFound from '@/views/notFound.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginForm from '@/components/loginForm.vue'
import Reservation from '@/views/Reservation.vue'
import ReservationUser from '@/views/ReservationUser.vue'
import Poll from '@/views/poll.vue'
import PaymentView from '@/views/PaymentView.vue'
import Mock from '@/views/mock.vue'
// import UpdateDrafts from '@/views/updateDrafts.vue'
import Mock2 from '@/views/mock2.vue'
import PollForm from '@/components/pollForm.vue'
import Mock3 from '@/views/mock3.vue'
import AdminPoll from '@/views/adminPoll.vue'
import ApartmentvView from '@/views/admin/apartmentvView.vue'
import AreaView from '@/views/admin/AreaView.vue'
import BillView from '@/views/admin/billView.vue'
import BuildingView from '@/views/admin/buildingView.vue'
import { setupAuthGuard } from './guard/auth'
// import '../router/guard/auth'

const routes = [
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        component: Dashboard,
      },
      {
        path: 'dashboard/reservation2',
        component: Reservation,
      },
      {
        path: 'dashboard/reservation',
        component: ReservationUser,
      },
      {
        path: 'dashboard/poll',
        component: Poll,
      },
      {
        path: '/dashboard/payment',
        component: PaymentView,
      },
      {
        path: '/dashboard/paybill',
        component: Mock,
      },
      {
        path: '/dashboard/draftbill',
        component: Mock2,
      },
      {
        path: '/dashboard/createpoll',
        component: PollForm,
      },
      {
        path: '/dashboard/closepoll',
        component: Mock3,
      },
      {
        path: '/dashboard/admin/poll',
        component: AdminPoll,
      },
      {
        path: '/dashboard/admin/apartment',
        component: ApartmentvView,
      },
      {
        path: '/dashboard/admin/area',
        component: AreaView,
      },
      {
        path: '/dashboard/admin/bill',
        component: BillView,
      },
      {
        path: '/dashboard/admin/building',
        component: BuildingView,
      },
      {
        path: 'dashboard/analytics',
        component: () => import('@/views/analitycs.vue'),
      },
    ],
  },

  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: LoginForm,
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    component: notFound,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupAuthGuard(router)

export default router
