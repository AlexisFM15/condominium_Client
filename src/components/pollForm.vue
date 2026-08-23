<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { usePollStore } from '@/stores/pollStore'
import { useUserStore } from '@/stores/userStore'

const pollStore = usePollStore()
const useUser = useUserStore()

const form = ref({
  title: '',
  description: '',
  expires_at: '',
  status: 'Abierta',
})

const loading = ref(false)

const isValid = computed(() => {
  return (
    form.value.title.trim().length > 0 &&
    form.value.description.trim().length > 0 &&
    form.value.expires_at.length > 0
  )
})

const submit = async () => {
  if (!isValid.value) return

  loading.value = true

  try {
    await pollStore.createPollS({
      title: form.value.title,
      description: form.value.description,
      expires_at: form.value.expires_at,
      status: form.value.status,
      userId: useUser.dashboard?.user.id,
    })

    form.value = {
      title: '',
      description: '',
      expires_at: '',
      status: 'Abierta',
    }
  } catch (error) {
    console.error('Error creando la votación:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await useUser.getDashboard()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 max-w-lg mx-auto">
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Crear votación</h2>

    <div class="space-y-4">
      <!-- Título -->
      <input
        v-model="form.title"
        type="text"
        placeholder="Título de la votación"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
      />

      <!-- Descripción -->
      <textarea
        v-model="form.description"
        placeholder="Descripción de la votación"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
      />

      <!-- Fecha y hora de expiración -->
      <input
        v-model="form.expires_at"
        type="datetime-local"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
      />

      <!-- Estado -->
      <select v-model="form.status" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
        <option value="Abierta">Abierta</option>
        <option value="Cerrada">Cerrada</option>
      </select>

      <!-- Crear -->
      <button
        @click="submit"
        :disabled="!isValid || loading"
        class="w-full py-2 rounded-xl text-white transition"
        :class="
          isValid && !loading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        "
      >
        <span v-if="loading">Creando...</span>
        <span v-else>Crear votación</span>
      </button>
    </div>
  </div>
</template>
