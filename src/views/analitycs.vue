<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'

const sidebarOpen = ref(true)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
    <!-- MAIN -->
    <main class="flex-1 p-4 overflow-auto">
      <div class="w-full h-full">
        <div class="w-full h-full bg-white dark:bg-gray-800 rounded-xl p-6">
          ANALITICAS
        </div>
      </div>
    </main>

  </div>
</template>
