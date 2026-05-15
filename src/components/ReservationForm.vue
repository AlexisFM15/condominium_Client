<script setup lang="ts">
import { ref, computed } from 'vue'
import Flatpickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

type Reservation = {
  id: number | string
  reservation_date: string | Date
  start_time: string
  end_time: string
}

const props = defineProps<{
  reservations: Reservation[]
}>()

const emit = defineEmits<{
  (e: 'submit', payload: {
    reservation_date: Date
    start_time: string
    end_time: string
  }): void
}>()

const selectedDate = ref<Date | null>(null)
const startTime = ref('')
const endTime = ref('')
const error = ref('')

// 🔥 fechas ocupadas
const occupiedDates = computed(() =>
  props.reservations.map(r =>
    new Date(r.reservation_date).toISOString().split('T')[0]
  )
)

// config calendario
const config = computed(() => ({
  dateFormat: 'Y-m-d',
  minDate: 'today',
  disable: [
    (date: Date) => {
      const d = date.toISOString().split('T')[0]
      return occupiedDates.value.includes(d)
    }
  ]
}))

// validar conflicto
const hasConflict = () => {
  if (!selectedDate.value) return false

  const dateStr = selectedDate.value.toISOString().split('T')[0]

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

  if (!selectedDate.value || !startTime.value || !endTime.value) {
    error.value = 'Completa todos los campos'
    return
  }

  if (hasConflict()) {
    error.value = 'Horario ocupado'
    return
  }

  emit('submit', {
    reservation_date: selectedDate.value,
    start_time: startTime.value,
    end_time: endTime.value
  })
}
</script>

<template>
  <div class="space-y-4">

    <!-- fecha -->
    <div>
      <label class="text-sm text-gray-600">Fecha</label>
      <Flatpickr v-model="selectedDate" :config="config"
        class="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
    </div>

    <!-- horas -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="text-sm text-gray-600">Inicio</label>
        <input type="time" v-model="startTime" class="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
      </div>

      <div>
        <label class="text-sm text-gray-600">Fin</label>
        <input type="time" v-model="endTime" class="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
      </div>
    </div>

    <!-- error -->
    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>

    <!-- botón -->
    <button @click="submit" class="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-lg">
      Reservar
    </button>

  </div>
</template>
