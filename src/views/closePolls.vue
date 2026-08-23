<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { PollDTO } from '@/typings/poll'
import { usePollStore } from '@/stores/pollStore'

const pollStore = usePollStore()

const selectedPoll = ref<PollDTO | null>(null)
const loading = ref(false)
const search = ref('')

// 📥 Obtener votaciones
onMounted(async () => {
  try {
    await pollStore.fetchPoll()

    console.log('Votaciones obtenidas:', pollStore.Polls)
  } catch (error) {
    console.error('Error obteniendo votaciones:', error)
  }
})

// 🔎 Filtrar
const filteredPolls = computed(() =>
  pollStore.Polls.filter((poll) =>
    `${poll.title ?? ''} ${poll.description}`.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

// ✅ Solo abiertas
const canClose = computed(() => selectedPoll.value?.status === 'Abierta')

const selectPoll = (poll: PollDTO) => {
  selectedPoll.value = poll
}

// 🔒 Cerrar
const closePoll = async () => {
  if (!selectedPoll.value?.id) return

  loading.value = true

  try {
    await pollStore.closePollS(selectedPoll.value.id)

    await pollStore.fetchPoll()

    selectedPoll.value = null
  } catch (error) {
    console.error('Error cerrando votación:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <!-- LISTA -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
      <h2 class="font-bold mb-4 text-gray-800 dark:text-gray-100">Votaciones</h2>

      <input
        v-model="search"
        placeholder="Buscar votación"
        class="w-full mb-3 border rounded-xl px-3 py-2 dark:bg-gray-700"
      />

      <div
        v-for="poll in filteredPolls"
        :key="poll.id"
        @click="selectPoll(poll)"
        class="p-3 mb-2 rounded-xl cursor-pointer border hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="selectedPoll?.id === poll.id ? 'bg-blue-100 dark:bg-blue-900' : ''"
      >
        <p v-if="poll.title" class="font-semibold text-gray-800 dark:text-gray-100">
          {{ poll.title }}
        </p>

        <p class="font-medium text-gray-800 dark:text-gray-100">
          {{ poll.description }}
        </p>

        <p class="text-sm text-gray-500">Expira: {{ poll.expires_at }}</p>

        <p class="text-sm">
          Estado:

          <span :class="poll.status === 'Abierta' ? 'text-green-500' : 'text-red-500'">
            {{ poll.status }}
          </span>
        </p>
      </div>

      <p v-if="filteredPolls.length === 0" class="text-gray-500 text-center py-4">
        No hay votaciones
      </p>
    </div>

    <!-- PANEL -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold mb-4 text-gray-800 dark:text-gray-100">Cerrar votación</h2>

      <div v-if="selectedPoll" class="space-y-4">
        <div class="text-sm text-gray-700 dark:text-gray-200">
          <p v-if="selectedPoll.title">
            <strong>Título:</strong>
            {{ selectedPoll.title }}
          </p>

          <p>
            <strong>Descripción:</strong>
            {{ selectedPoll.description }}
          </p>

          <p>
            <strong>Votos a favor:</strong>
            {{ selectedPoll.votesFor }}
          </p>

          <p>
            <strong>Votos en contra:</strong>
            {{ selectedPoll.votesAgainst }}
          </p>

          <p>
            <strong>Expira:</strong>
            {{ selectedPoll.expires_at }}
          </p>

          <p>
            <strong>Estado:</strong>
            {{ selectedPoll.status }}
          </p>
        </div>

        <button
          @click="closePoll"
          :disabled="!canClose || loading"
          class="w-full py-2 rounded-xl text-white transition"
          :class="
            canClose && !loading ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
          "
        >
          <span v-if="loading">Cerrando...</span>
          <span v-else>Cerrar votación</span>
        </button>
      </div>

      <div v-else class="text-gray-500">Selecciona una votación</div>
    </div>
  </div>
</template>
