<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  reservations: any[]
  selectedDate: Date | null
}>()

const emit = defineEmits(['submit'])

const startTime = ref('')
const endTime = ref('')
const error = ref('')

// validar conflicto
const hasConflict = () => {
  if (!props.selectedDate) return false

  const dateStr = props.selectedDate.toISOString().split('T')[0]

  return props.reservations.some(r => {
    const rDate = new Date(r.reservation_date).toISOString().split('T')[0]

    if (rDate !== dateStr) return false

    return (
      startTime.value < r.end_time &&
      endTime.value > r.start_time
    )
  })
}

const submit = () => {
  error.value = ''

  if (!props.selectedDate || !startTime.value || !endTime.value) {
    error.value = 'Completa todo'
    return
  }

  if (hasConflict()) {
    error.value = 'Horario ocupado'
    return
  }

  emit('submit', {
    reservation_date: props.selectedDate,
    start_time: startTime.value,
    end_time: endTime.value
  })
}
</script>

<template>
  <div v-if="selectedDate" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mt-4">

    <p class="text-sm text-gray-500 mb-3">
      {{ selectedDate.toLocaleDateString() }}
    </p>

    <div class="grid grid-cols-2 gap-3">
      <input type="time" v-model="startTime" class="p-2 border rounded-lg" />
      <input type="time" v-model="endTime" class="p-2 border rounded-lg" />
    </div>

    <p v-if="error" class="text-red-500 text-sm mt-2">
      {{ error }}
    </p>

    <button @click="submit" class="mt-3 w-full bg-violet-500 text-white py-2 rounded-lg">
      Reservar
    </button>

  </div>
</template>
