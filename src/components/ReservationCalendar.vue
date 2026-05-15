<script setup lang="ts">
import { computed, ref } from 'vue'
import ReservationModal from './ReservationModal.vue'

type Reservation = {
  reservation_date: string
  area_id: string
  start_time?: string
  end_time?: string
}

const props = defineProps<{
  reservations: Reservation[]
  selectedArea: string
}>()

const emit = defineEmits(['select-date'])

const today = new Date()
const current = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const modalOpen = ref(false)
const selectedDay = ref<any>(null)

// 🔥 estado LOCAL (esto es CLAVE)
const localReservations = ref<Reservation[]>([...props.reservations])

// 🔥 filtrar por área
const filtered = computed(() =>
  localReservations.value.filter(r => r.area_id === props.selectedArea)
)

// 🔥 mapa por fecha
const reservationMap = computed(() => {
  const map: Record<string, Reservation[]> = {}

  filtered.value.forEach(r => {
    if (!map[r.reservation_date]) map[r.reservation_date] = []
    map[r.reservation_date].push(r)
  })

  return map
})

// 🔥 generar días
const days = computed(() => {
  const start = new Date(current.value)
  const startDay = start.getDay()

  const startDate = new Date(start)
  startDate.setDate(start.getDate() - startDay)

  return Array.from({ length: 42 }).map((_, i) => {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)

    const dateStr = d.toISOString().split('T')[0]
    const reservations = reservationMap.value[dateStr] || []

    return {
      date: d,
      label: d.getDate(),
      currentMonth: d.getMonth() === current.value.getMonth(),
      isToday: d.toDateString() === today.toDateString(),
      reservations,
      status:
        reservations.length === 0
          ? 'free'
          : reservations.length < 3
            ? 'partial'
            : 'full'
    }
  })
})

// navegación
const prevMonth = () =>
  current.value = new Date(current.value.getFullYear(), current.value.getMonth() - 1, 1)

const nextMonth = () =>
  current.value = new Date(current.value.getFullYear(), current.value.getMonth() + 1, 1)

// 🔥 abrir modal (CORRECTO)
const openModal = (day: any) => {
  if (day.status === 'full') return

  selectedDay.value = day
  modalOpen.value = true
}

// 🔥 guardar reserva (REACTIVO REAL)
const addReservation = (data: any) => {
  const dateStr = selectedDay.value.date.toISOString().split('T')[0]

  localReservations.value.push({
    reservation_date: dateStr,
    area_id: props.selectedArea,
    start_time: data.start_time,
    end_time: data.end_time
  })

  modalOpen.value = false
}

// label
const monthLabel = computed(() =>
  current.value.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm w-full">

    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <button @click="prevMonth">←</button>
      <h2 class="font-semibold capitalize">{{ monthLabel }}</h2>
      <button @click="nextMonth">→</button>
    </div>

    <!-- WEEK -->
    <div class="grid grid-cols-7 text-xs text-gray-500 mb-2 text-center">
      <div v-for="d in ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']" :key="d">
        {{ d }}
      </div>
    </div>

    <!-- GRID -->
    <div class="grid grid-cols-7 gap-2">

      <div v-for="(day, i) in days" :key="i" @click="openModal(day)"
        class="relative group aspect-square flex items-center justify-center rounded-lg cursor-pointer text-sm transition-all duration-200"
        :class="[
          day.currentMonth ? '' : 'opacity-30',
          day.status === 'free' ? 'bg-green-50 hover:bg-green-100' : '',
          day.status === 'partial' ? 'bg-yellow-50 hover:bg-yellow-100' : '',
          day.status === 'full' ? 'bg-red-100 cursor-not-allowed' : '',
          day.isToday ? 'border border-violet-400' : ''
        ]">

        {{ day.label }}

        <!-- contador -->
        <span v-if="day.reservations.length"
          class="absolute bottom-1 right-1 text-[10px] bg-black/70 text-white px-1 rounded">
          {{ day.reservations.length }}
        </span>

        <!-- hover -->
        <div
          class="absolute z-10 hidden group-hover:block bottom-full mb-2 w-32 text-xs bg-black text-white p-2 rounded shadow">
          <div v-if="day.status === 'free'">Disponible</div>
          <div v-if="day.status === 'partial'">
            {{ day.reservations.length }} reservas
          </div>
          <div v-if="day.status === 'full'">No disponible</div>
        </div>

      </div>

    </div>

    <!-- MODAL -->
    <ReservationModal :open="modalOpen" :date="selectedDay?.date || null" @close="modalOpen = false"
      @confirm="addReservation" />

  </div>
</template>
