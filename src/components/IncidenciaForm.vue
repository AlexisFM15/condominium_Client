<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIncidenciaStore } from '@/stores/incidenciaStore'
import { useCondominiumStore } from '@/stores/condominiumStore'
import type { createIncidenciaDTO } from '@/typings/incidencia'
import { useUserStore } from '@/stores/userStore'

const incidenciaStore = useIncidenciaStore()
const condominiumStore = useCondominiumStore()
const useUser = useUserStore()
// const dashboard = JSON.parse(localStorage.getItem('dashboard') || 'null')

// const condominiums = computed(() => condominiumStore.Condominiums)

const sent = ref(false)

const form = ref({
  title: '',
  description: '',
  condominiumId: 0,
})

const save = async () => {
  const payload: createIncidenciaDTO = {
    title: form.value.title,
    description: form.value.description,
    condominiumId: useUser.dashboard?.building.condominium.id,
  }

  await incidenciaStore.createIncidenciaS(payload)

  form.value = {
    title: '',
    description: '',
    condominiumId: 0,
  }

  sent.value = true
  setTimeout(() => (sent.value = false), 3000)
}

onMounted(async () => {
  await useUser.getDashboard()
  await condominiumStore.fetchCondominium()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 max-w-lg mx-auto">
    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">Reportar Incidencia</h2>

    <div v-if="sent" class="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl">
      ¡Incidencia reportada con éxito!
    </div>

    <div class="space-y-4">
      <input
        v-model="form.title"
        placeholder="Título"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
      />

      <textarea
        v-model="form.description"
        placeholder="Descripción"
        rows="4"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
      />
    </div>

    <div class="flex justify-end mt-6">
      <button
        @click="save"
        :disabled="!form.title || !form.description"
        class="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl"
      >
        Enviar
      </button>
    </div>
  </div>
</template>
