<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const profileOpen = ref(false)
const notifOpen = ref(false)

const profileRef = ref<HTMLElement | null>(null)
const notifRef = ref<HTMLElement | null>(null)

onClickOutside(profileRef, () => (profileOpen.value = false))
onClickOutside(notifRef, () => (notifOpen.value = false))

const authStore = useAuthStore()

const handlerLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header
    class="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- LEFT -->
        <div class="flex items-center gap-3">
          <button
            @click="$emit('toggle-sidebar')"
            class="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            ☰
          </button>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-4">
          <!-- SEARCH MOBILE -->
          <button class="md:hidden text-gray-500 dark:text-gray-300">🔍</button>

          <!-- NOTIFICATIONS -->

          <!-- PROFILE -->
          <div ref="profileRef" class="relative">
            <button @click="profileOpen = !profileOpen" class="flex items-center gap-2">
              <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full" />
              <span class="hidden sm:block text-sm">Usuario</span>
            </button>

            <div
              v-if="profileOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border rounded-lg shadow-lg"
            >
              <!-- <a class="block px-4 py-2 text-sm hover:bg-gray-100">Perfil</a>
              <a class="block px-4 py-2 text-sm hover:bg-gray-100">Configuración</a> -->
              <a
                class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                @click="handlerLogout"
                >Cerrar sesión</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
