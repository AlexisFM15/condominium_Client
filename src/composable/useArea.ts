import { getAreasAPI, getAreaAPI, createAreaAPI, updateAreaAPI, deleteAreaAPI } from '@/api/area'
import type { createAreaDTO, idAreaDTO, updateAreaDTO } from '@/typings/area'
import { ref } from 'vue'

export function useArea() {
  const loading = ref(false)

  const getAreass = async () => {
    loading.value = true
    const res = await getAreasAPI()
    loading.value = false
    return res
  }

  const getOneArea = async (id: idAreaDTO) => {
    loading.value = true
    const res = await getAreaAPI(id)
    loading.value = false
    return res
  }

  const createArea = async (data: createAreaDTO) => {
    loading.value = true
    const res = await createAreaAPI(data)
    loading.value = false
    return res
  }

  const updateAreas = async (data: updateAreaDTO) => {
    loading.value = true
    const res = await updateAreaAPI(data)
    loading.value = false
    return res
  }

  const deleteAreas = async (id: idAreaDTO) => {
    loading.value = true
    const res = await deleteAreaAPI(id)
    loading.value = false
    return res
  }

  return {
    getAreass,
    getOneArea,
    createArea,
    updateAreas,
    deleteAreas,
  }
}
