<script setup lang="ts">
import { ref, computed } from 'vue'

type Poll = {
  id: string
  description: string
  expires_at: string
  status: 'ACTIVE' | 'CLOSED'
  poll_result: number
}

const props = withDefaults(defineProps<{ polls: Poll[] }>(), {
  polls: () => []
})

const pollsList = ref([...props.polls])
const selectedPoll = ref<Poll | null>(null)
const loading = ref(false)

const search = ref('')

// 🔎 filtro
const filteredPolls = computed(() =>
  pollsList.value.filter(p =>
    p.description.toLowerCase().includes(search.value.toLowerCase())
  )
)

// ✅ solo se pueden cerrar si están activas
const canClose = computed(() =>
  selectedPoll.value && selectedPoll.value.status === 'ACTIVE'
)

const selectPoll = (poll: Poll) => {
  selectedPoll.value = poll
}

const closePoll = async () => {
  if (!canClose.value || !selectedPoll.value) return

  loading.value = true

  try {
    // 🔥 mock
    await new Promise(resolve => setTimeout(resolve, 1000))

    // actualizar estado local
    const index = pollsList.value.findIndex(p => p.id === selectedPoll.value!.id)
    if (index !== -1) {
      pollsList.value[index].status = 'CLOSED'
    }

    selectedPoll.value = null

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

      <input v-model="search" placeholder="Buscar votación"
        class="w-full mb-3 border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <div v-for="poll in filteredPolls" :key="poll.id" @click="selectPoll(poll)"
        class="p-3 mb-2 rounded-xl cursor-pointer border hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="selectedPoll?.id === poll.id ? 'bg-blue-100 dark:bg-blue-900' : ''">
        <p class="font-medium">{{ poll.description }}</p>
        <p class="text-sm text-gray-500">
          Expira: {{ poll.expires_at }}
        </p>
        <p class="text-sm">
          Estado:
          <span :class="poll.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'">
            {{ poll.status }}
          </span>
        </p>
      </div>
    </div>

    <!-- PANEL -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold mb-4 text-gray-800 dark:text-gray-100">Cerrar votación</h2>

      <div v-if="selectedPoll" class="space-y-4">

        <div class="text-sm">
          <p><strong>Descripción:</strong> {{ selectedPoll.description }}</p>
          <p><strong>Resultado:</strong> {{ selectedPoll.poll_result }}</p>
          <p><strong>Estado:</strong> {{ selectedPoll.status }}</p>
        </div>

        <button @click="closePoll" :disabled="!canClose || loading" class="w-full py-2 rounded-xl text-white transition"
          :class="canClose ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'">
          <span v-if="loading">Cerrando...</span>
          <span v-else>Cerrar votación</span>
        </button>

      </div>

      <div v-else class="text-gray-500">
        Selecciona una votación
      </div>
    </div>

  </div>
</template>
