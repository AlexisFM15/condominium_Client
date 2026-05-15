<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['submit'])

const form = ref({
  description: '',
  expires_at: '',
  poll_result: 0,
  status: 'ACTIVE'
})

const loading = ref(false)

const isValid = computed(() => {
  return (
    form.value.description.trim() &&
    form.value.expires_at
  )
})

const submit = async () => {
  if (!isValid.value) return

  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    emit('submit', { ...form.value })

    form.value = {
      description: '',
      expires_at: '',
      poll_result: 0,
      status: 'ACTIVE'
    }

  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 max-w-lg mx-auto">

    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      Crear votación
    </h2>

    <div class="space-y-4">

      <textarea v-model="form.description" placeholder="Descripción de la votación"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <input v-model="form.expires_at" type="date" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <input v-model.number="form.poll_result" type="number" placeholder="Resultado inicial (opcional)"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <select v-model="form.status" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
        <option value="ACTIVE">Activa</option>
        <option value="CLOSED">Cerrada</option>
      </select>

      <button @click="submit" :disabled="!isValid || loading" class="w-full py-2 rounded-xl text-white transition"
        :class="isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'">
        <span v-if="loading">Creando...</span>
        <span v-else>Crear votación</span>
      </button>

    </div>
  </div>
</template>
