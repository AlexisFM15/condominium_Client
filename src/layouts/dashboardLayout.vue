<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import WelcomeModal from '@/components/welcomeModal.vue'
import { useAuthStore } from '@/stores/authStore'

const sidebarOpen = ref(true)
const authStore = useAuthStore()
</script>

<template>
  <div class="flex h-screen w-full">
    <Sidebar :sidebarOpen="sidebarOpen" />

    <div class="flex flex-col flex-1 w-full">
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="flex-1 p-6 overflow-auto w-full">
        <router-view />
      </main>
    </div>

    <WelcomeModal v-if="authStore.showWelcomeModal" />
  </div>
</template>
