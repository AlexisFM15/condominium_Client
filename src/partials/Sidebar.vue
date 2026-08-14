<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 📱 mobile: mostrar / ocultar
const sidebarOpen = ref(false)

// 💻 desktop: colapsado / expandido
const sidebarCollapsed = ref(false)

// dropdown
const dashboardOpen = ref(false)

const dashboardOpenOP = ref(false)

const dashboardOpenADM = ref(false)

// 🔥 persistencia
onMounted(() => {
  const savedCollapsed = localStorage.getItem('sidebar-collapsed')
  if (savedCollapsed !== null) {
    sidebarCollapsed.value = savedCollapsed === 'true'
  }

  // abrir menú según ruta
  if (route.fullPath.includes('dashboard') || route.fullPath === '/') {
    dashboardOpen.value = true
  }
})

watch(sidebarCollapsed, (val) => {
  localStorage.setItem('sidebar-collapsed', String(val))
})

// toggles
const toggleSidebar = () => (sidebarOpen.value = true)
const closeSidebar = () => (sidebarOpen.value = false)
const toggleCollapse = () => (sidebarCollapsed.value = !sidebarCollapsed.value)
const toggleDashboard = () => (dashboardOpen.value = !dashboardOpen.value)
const toggleDashboardOP = () => (dashboardOpenOP.value = !dashboardOpenOP.value)
const toggleDashboardADM = () => (dashboardOpenADM.value = !dashboardOpenADM.value)
</script>

<template>
  <!-- 🔥 BOTÓN GLOBAL (SIEMPRE visible) -->
  <button
    class="fixed top-4 left-4 z-[9999] bg-white p-2 rounded shadow lg:hidden"
    @click="toggleSidebar"
  >
    ☰
  </button>

  <!-- overlay mobile -->
  <div v-if="sidebarOpen" class="fixed inset-0 bg-black/40 z-40 lg:hidden" @click="closeSidebar" />

  <!-- SIDEBAR -->
  <aside
    class="z-50 left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col"
    :class="[
      // 📱 mobile
      'fixed lg:static',

      // animación mobile
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',

      // tamaño
      sidebarCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between p-4">
      <button @click="toggleCollapse" class="text-gray-500 hover:text-gray-800">☰</button>
    </div>

    <!-- NAV -->
    <nav class="flex-1 px-2 overflow-auto">
      <!-- DASHBOARD -->
      <div>
        <button
          @click="toggleDashboard"
          class="w-full flex items-center justify-between p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <div class="flex items-center gap-3">
            <svg
              class="w-5 h-5"
              :class="route.fullPath.includes('dashboard') ? 'text-blue-600' : 'text-gray-400'"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
            </svg>

            <span v-if="!sidebarCollapsed" class="text-sm font-medium"> Menú </span>
          </div>

          <svg
            v-if="!sidebarCollapsed"
            class="w-3 h-3 transition-transform"
            :class="dashboardOpen ? 'rotate-180' : ''"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M6 9L1 4h10L6 9z" />
          </svg>
        </button>

        <!-- submenu -->
        <div v-show="dashboardOpen && !sidebarCollapsed" class="ml-8">
          <router-link to="/">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Inicio
            </div>
          </router-link>

          <router-link to="/dashboard/reservation">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Reservaciones
            </div>
          </router-link>

          <router-link to="/dashboard/poll">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Encuestas
            </div>
          </router-link>

          <router-link to="/dashboard/reportar-incidencia">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('reportar-incidencia')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Reportar Incidencias
            </div>
          </router-link>


        </div>
      </div>

      <!-- DASHBOARD -->
      <div>
        <button
          @click="toggleDashboardOP"
          class="w-full flex items-center justify-between p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <div class="flex items-center gap-3">
            <svg
              class="w-5 h-5"
              :class="route.fullPath.includes('dashboard') ? 'text-blue-600' : 'text-gray-400'"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
            </svg>

            <span v-if="!sidebarCollapsed" class="text-sm font-medium"> Menú OP </span>
          </div>

          <svg
            v-if="!sidebarCollapsed"
            class="w-3 h-3 transition-transform"
            :class="dashboardOpenOP ? 'rotate-180' : ''"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M6 9L1 4h10L6 9z" />
          </svg>
        </button>

        <!-- submenu -->
        <div v-show="dashboardOpenOP && !sidebarCollapsed" class="ml-8">
          <router-link to="/dashboard/paybill">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Pagar factura
            </div>
          </router-link>

          <router-link to="/dashboard/draftbill">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Borrador factura
            </div>
          </router-link>

          <router-link to="/dashboard/createpoll">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Crear votación
            </div>
          </router-link>

          <router-link to="/dashboard/closepoll">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Cerrar votación
            </div>
          </router-link>
        </div>
      </div>

      <!-- DASHBOARD Admin -->
      <div>
        <button
          @click="toggleDashboardADM"
          class="w-full flex items-center justify-between p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <div class="flex items-center gap-3">
            <svg
              class="w-5 h-5"
              :class="route.fullPath.includes('admin') ? 'text-blue-600' : 'text-gray-400'"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
            </svg>

            <span v-if="!sidebarCollapsed" class="text-sm font-medium"> Menú ADM </span>
          </div>

          <svg
            v-if="!sidebarCollapsed"
            class="w-3 h-3 transition-transform"
            :class="dashboardOpenADM ? 'rotate-180' : ''"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M6 9L1 4h10L6 9z" />
          </svg>
        </button>

        <!-- submenu -->
        <div v-show="dashboardOpenADM && !sidebarCollapsed" class="ml-8">
          <router-link to="/dashboard/admin/apartment">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Apartamento
            </div>
          </router-link>

          <router-link to="/dashboard/admin/area">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Area
            </div>
          </router-link>

          <router-link to="/dashboard/admin/bill">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Factura
            </div>
          </router-link>

          <router-link to="/dashboard/admin/building">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('analytics')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Edificio
            </div>
          </router-link>

          <router-link to="/dashboard/admin/balance">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Balance
            </div>
          </router-link>

          <router-link to="/dashboard/admin/condominium">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Condominios
            </div>
          </router-link>

          <router-link to="/dashboard/admin/incidencia">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath.includes('admin/incidencia')
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Incidencias
            </div>
          </router-link>

          <router-link to="/dashboard/admin/payment">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              pagos
            </div>
          </router-link>

          <router-link to="/dashboard/admin/reservation">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Reservaciones
            </div>
          </router-link>

          <router-link to="/dashboard/admin/service">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Servicios
            </div>
          </router-link>

          <router-link to="/dashboard/admin/user">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Usuarios
            </div>
          </router-link>

          <router-link to="/dashboard/admin/poll">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Votación
            </div>
          </router-link>

          <router-link to="/dashboard/admin/vote">
            <div
              class="text-sm cursor-pointer"
              :class="
                route.fullPath === '/'
                  ? 'text-violet-500'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              "
            >
              Votos
            </div>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- FOOTER -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <button @click="toggleCollapse" class="w-full text-sm text-gray-500 hover:text-gray-800">
        {{ sidebarCollapsed ? 'v1.0' : 'v1.0' }}
      </button>
    </div>
  </aside>
</template>
