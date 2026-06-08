<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import type { ScheduleAreaDTO } from '@/typings/scheduleArea'
import { useScheduleAreaStore } from '@/stores/scheduleAreaStore'

const useScheduleArea = useScheduleAreaStore()
const data = ref<ScheduleAreaDTO[]>([])

console.log(data)
const columns = [
  { key: 'area.name', label: 'Área' },
  { key: 'reservation_date', label: 'Fecha reserva' },
  { key: 'start_time', label: 'Inicio' },
  { key: 'end_time', label: 'Fin' },
  { key: 'status', label: 'Estado' },
  { key: 'user.email', label: 'Usuario' },
]

const create = async (item: any) => {
  await useScheduleArea.createScheduleAreaS(item)
}

const update = async (item: any) => {
  await useScheduleArea.updateScheduleArea(item)
}

const remove = async (item: any) => {
  await useScheduleArea.deleteScheduleArea(item)
}

onMounted(async () => {
  await useScheduleArea.fetchScheduleArea()
  data.value = useScheduleArea.ScheduleAreas
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
