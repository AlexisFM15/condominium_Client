import { useScheduleArea } from '@/composable/useScheduleArea'
import type {
  createScheduleAreaDTO,
  idScheduleAreaDTO,
  updateScheduleAreaDTO,
  ScheduleAreaDTO,
} from '@/typings/scheduleArea'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScheduleAreaStore = defineStore('scheduleArea', () => {
  const ScheduleAreas = ref<ScheduleAreaDTO[]>([])

  const {
    getScheduleAreass,
    getOneScheduleArea,
    createScheduleArea,
    updateScheduleAreas,
    deleteScheduleAreas,
  } = useScheduleArea()

  const fetchScheduleArea = async () => {
    ScheduleAreas.value = await getScheduleAreass()
  }

  const getOne = async (id: idScheduleAreaDTO) => {
    ScheduleAreas.value = await getOneScheduleArea(id)
  }

  const createScheduleAreaS = async (data: createScheduleAreaDTO) => {
    const reservations = await createScheduleArea(data)
    ScheduleAreas.value.push(reservations)
  }

  const updateScheduleArea = async (data: updateScheduleAreaDTO) => {
    await updateScheduleAreas(data)
    ScheduleAreas.value = ScheduleAreas.value.filter((ScheduleArea) => ScheduleArea.id !== data.id)
    ScheduleAreas.value.push({ ...data } as ScheduleAreaDTO)
  }

  const deleteScheduleArea = async (id: idScheduleAreaDTO) => {
    await deleteScheduleAreas(id)
    fetchScheduleArea()
  }
  return {
    ScheduleAreas,
    fetchScheduleArea,
    getOne,
    createScheduleAreaS,
    updateScheduleArea,
    deleteScheduleArea,
  }
})
