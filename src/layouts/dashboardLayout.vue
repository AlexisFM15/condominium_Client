<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import { useUserStore } from '@/stores/userStore.ts'
import welcomeModal from '@/components/welcomeModal.vue'

const sidebarOpen = ref(true)
const userStore = useUserStore()

onMounted(async()=>{
await userStore.getDashboard()
})
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

    <welcomeModal  v-if="userStore.showWelcomeModal" />
  </div>
</template>
