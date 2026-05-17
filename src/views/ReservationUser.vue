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
console.log(user.user.user?.id)

onMounted(async () => {
  await useArea.fetchArea()
  await useReservations.fetchScheduleArea()
})
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- selector de área -->
    <div class="flex gap-2">
      <button v-for="a in useArea.Areas" :key="a.id" @click="selectedArea = a.id" class="px-3 py-1 rounded bg-gray-200"
        :class="selectedArea === a.id ? 'bg-violet-500 text-white' : ''">
        {{ a.name }}
      </button>
    </div>

    <!-- calendario -->
    <Calendar :reservations="useReservations.ScheduleAreas" :selectedArea="selectedArea" :user="user.user.user?.id" />

  </div>
</template>
