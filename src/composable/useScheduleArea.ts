import {
  getScheduleAreasAPI,
  getScheduleAreaAPI,
  createScheduleAreaAPI,
  updateScheduleAreaAPI,
  deleteScheduleAreaAPI,
} from '@/api/scheduleArea'
import type {
  createScheduleAreaDTO,
  idScheduleAreaDTO,
  updateScheduleAreaDTO,
} from '@/typings/scheduleArea'
import { ref } from 'vue'

export function useScheduleArea() {
  const loading = ref(false)

  const getScheduleAreass = async () => {
    loading.value = true
    const res = await getScheduleAreasAPI()
    loading.value = false
    return res
  }

  const getOneScheduleArea = async (id: idScheduleAreaDTO) => {
    loading.value = true
    const res = await getScheduleAreaAPI(id)
    loading.value = false
    return res
  }

  const createScheduleArea = async (data: createScheduleAreaDTO) => {
    loading.value = true
    const res = await createScheduleAreaAPI(data)
    loading.value = false
    return res
  }

  const updateScheduleAreas = async (data: updateScheduleAreaDTO) => {
    loading.value = true
    const res = await updateScheduleAreaAPI(data)
    loading.value = false
    return res
  }

  const deleteScheduleAreas = async (id: idScheduleAreaDTO) => {
    loading.value = true
    const res = await deleteScheduleAreaAPI(id)
    loading.value = false
    return res
  }

  return {
    getScheduleAreass,
    getOneScheduleArea,
    createScheduleArea,
    updateScheduleAreas,
    deleteScheduleAreas,
  }
}
