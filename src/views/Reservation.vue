<script setup lang="ts">
import ReservationForm from '@/components/ReservationForm.vue'

const reservations = [
  {
    id: 1,
    reservation_date: '2026-04-28',
    start_time: '14:00',
    end_time: '18:00'
  }
]

const handleSubmit = (data: any) => {
  console.log('RESERVA:', data)
}
</script>

<template>
  <div class="p-4">
    <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">

      <h2 class="text-lg font-semibold mb-4">
        Reservar área común
      </h2>

      <ReservationForm :reservations="reservations" @submit="handleSubmit" />

    </div>
  </div>
</template>
