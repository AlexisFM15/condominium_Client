<script setup lang="ts">
import type { ScheduleAreaDTO } from '@/typings/scheduleArea'
import { ref, computed } from 'vue'

type Tab = 'incidents' | 'agenda'

type Incident = {
  id: number | string
  title: string
  createdAt: string | Date
  status: 'open' | 'pending' | 'resolved'
}

const props = defineProps<{
  incidents: Incident[]
  agendas: ScheduleAreaDTO[]
}>()

const activeTab = ref<Tab>('incidents')

const timeAgo = (date: string | Date) => {
  const now = new Date()
  const d = new Date(date)
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diff < 60) return `hace ${diff} seg`
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`

  return d.toLocaleDateString()
}

const formatSchedule = (item: ScheduleAreaDTO) => {
  const date = new Date(item.reservation_date)

  const day = date.toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'short'
  })

  return `${day} · ${item.start_time} - ${item.end_time}`
}

const statusColor = {
  open: 'bg-red-100 text-red-600',
  pending: 'bg-yellow-100 text-yellow-600',
  resolved: 'bg-green-100 text-green-600'
}

const incidents = computed(() => props.incidents)
const agendas = computed(() => props.agendas)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 h-full flex flex-col shadow-sm">

    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
      Actividades
    </h2>

    <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-3">
      <button @click="activeTab = 'incidents'" class="flex-1 text-xs py-1 rounded-md transition" :class="activeTab === 'incidents'
        ? 'bg-white dark:bg-gray-800 text-violet-500 shadow'
        : 'text-gray-500'">
        Incidencias
      </button>

      <button @click="activeTab = 'agenda'" class="flex-1 text-xs py-1 rounded-md transition" :class="activeTab === 'agenda'
        ? 'bg-white dark:bg-gray-800 text-violet-500 shadow'
        : 'text-gray-500'">
        Agenda
      </button>
    </div>

    <div class="flex-1 overflow-auto space-y-2 pr-1">

      <!-- INCIDENCIAS -->
      <template v-if="activeTab === 'incidents'">

        <div v-for="item in incidents" :key="item.id"
          class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <div class="flex flex-col">

            <p class="text-sm text-gray-800 dark:text-gray-100 truncate">
              {{ item.title }}
            </p>

            <span class="text-xs text-gray-400">
              {{ timeAgo(item.createdAt) }}
            </span>
          </div>

          <span class="text-xs px-2 py-1 rounded-full" :class="statusColor[item.status]">
            {{ item.status }}
          </span>
        </div>

      </template>

      <!-- AGENDA -->
      <template v-else>

        <div v-for="item in agendas" :key="item.id"
          class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <div class="flex flex-col">

            <p class="text-sm text-gray-800 dark:text-gray-100 truncate">
              {{ item.area.name }}
            </p>

            <span class="text-xs text-gray-400">
              {{ formatSchedule(item) }}
            </span>
          </div>

          <span v-if="item.status" class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
            {{ item.status }}
          </span>
        </div>

      </template>

    </div>
  </div>
</template>
