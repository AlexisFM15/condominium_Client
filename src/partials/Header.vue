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
            class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white lg:hidden transition"
          >
            ☰
          </button>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-4">
          <!-- SEARCH MOBILE -->
          <button
            class="md:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition"
          >
            🔍
          </button>

          <!-- PROFILE -->
          <div ref="profileRef" class="relative">
            <button
              @click="profileOpen = !profileOpen"
              class="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <!-- AVATAR -->
              <div
                class="w-9 h-9 rounded-full overflow-hidden border-2 border-[#3BA0D2] flex-shrink-0"
              >
                <img
                  src="https://i.pravatar.cc/40"
                  class="w-full h-full object-cover"
                  alt="Perfil"
                />
              </div>

              <!-- NAME -->
              <span
                class="hidden sm:block text-sm font-semibold text-[#3BA0D2] max-w-[150px] truncate"
              >
                {{ authStore.user?.name }}
              </span>

              <!-- ARROW -->
              <svg
                class="hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': profileOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- DROPDOWN -->
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div
                v-if="profileOpen"
                class="absolute right-0 mt-3 w-64 overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl"
              >
                <!-- USER INFO -->
                <div
                  class="px-4 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3BA0D2] flex-shrink-0"
                    >
                      <img
                        src="https://i.pravatar.cc/40"
                        class="w-full h-full object-cover"
                        alt="Perfil"
                      />
                    </div>

                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-[#3BA0D2] truncate">
                        {{ authStore.user?.name }}
                      </p>

                      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {{ authStore.user?.email }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- MENU -->
                <div class="p-2">
                  <!-- PERFIL -->
                  <button
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19a6 6 0 00-12 0m6-8a4 4 0 100-8 4 4 0 000 8zm6-2h6m-3-3v6"
                      />
                    </svg>

                    <span>Mi perfil</span>
                  </button>

                  <!-- LOGOUT -->
                  <button
                    @click="handlerLogout"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>

                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
