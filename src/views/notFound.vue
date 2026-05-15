<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div class="text-center max-w-md w-full">
      <h1 class="text-6xl font-bold text-violet-500">404</h1>

      <p class="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Página no encontrada
      </p>

      <p class="mt-2 text-gray-500 dark:text-gray-400">
        La ruta que buscas no existe o fue movida.
      </p>

      <div class="mt-6 flex gap-3 justify-center">
        <button @click="goHome" class="px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition">
          Ir al dashboard
        </button>

        <button @click="$router.back()"
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          Volver
        </button>
      </div>
    </div>
  </div>
</template>
