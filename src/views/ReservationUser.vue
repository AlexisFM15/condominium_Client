<script setup lang="ts">
import { ref } from 'vue'
import Calendar from '@/components/ReservationCalendar.vue'

const selectedArea = ref('pool')

const areas = [
  { id: 'pool', name: 'Piscina' },
  { id: 'bbq', name: 'BBQ' },
  { id: 'salon', name: 'Salón' },
  { id: 'garden', name: 'garden' }
]

const reservations = [
  { reservation_date: '2026-05-10', area_id: 'pool' },
  { reservation_date: '2026-05-10', area_id: 'pool' },
  { reservation_date: '2026-05-15', area_id: 'bbq' }
]
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- selector de área -->
    <div class="flex gap-2">
      <button v-for="a in areas" :key="a.id" @click="selectedArea = a.id" class="px-3 py-1 rounded bg-gray-200"
        :class="selectedArea === a.id ? 'bg-violet-500 text-white' : ''">
        {{ a.name }}
      </button>
    </div>

    <!-- calendario -->
    <Calendar :reservations="reservations" :selectedArea="selectedArea" />

  </div>
</template>
