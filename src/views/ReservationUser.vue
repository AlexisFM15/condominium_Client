<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Calendar from '@/components/ReservationCalendar.vue'
import { useAreaStore } from '@/stores/areaStore'
import { useScheduleAreaStore } from '@/stores/scheduleAreaStore'
import { useAuthStore } from '@/stores/authStore'

const selectedArea = ref()
const useArea = useAreaStore()
const useReservations = useScheduleAreaStore()
const user = useAuthStore()

computed(() => useAuthStore().user)

onMounted(async () => {
  await useArea.fetchArea()
  await useReservations.fetchScheduleArea()
})
</script>

<template>
  <div class="p-4 space-y-4">
    <!-- selector de área -->
    <div>
      <span class="text-lg font-semibold text-gray-700"> Seleccione un área </span>
      <p class="text-sm text-gray-500">
        Elija el área que desea reservar para ver su disponibilidad.
      </p>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button
        v-for="a in useArea.Areas"
        :key="a.id"
        @click="selectedArea = a.id"
        class="px-4 py-2 rounded-lg border transition-all duration-200"
        :class="
          selectedArea === a.id
            ? 'bg-violet-500 text-white border-violet-500 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        "
      >
        {{ a.name }}
      </button>
    </div>

    <Calendar
      :reservations="useReservations.ScheduleAreas"
      :selectedArea="selectedArea"
      :user="user.user.user?.id"
    />
  </div>
</template>
