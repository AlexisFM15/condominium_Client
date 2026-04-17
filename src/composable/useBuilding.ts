import {
  getBuildingsAPI,
  getBuildingAPI,
  createBuildingAPI,
  updateBuildingAPI,
  deleteBuildingAPI,
} from '@/api/building'
import type { createBuildingDTO, idBuildingDTO, updateBuildingDTO } from '@/typings/building'
import { ref } from 'vue'

export function useBuilding() {
  const loading = ref(false)

  const getBuildingss = async () => {
    loading.value = true
    const res = await getBuildingsAPI()
    loading.value = false
    return res
  }

  const getOneBuilding = async (id: idBuildingDTO) => {
    loading.value = true
    const res = await getBuildingAPI(id)
    loading.value = false
    return res
  }

  const createBuilding = async (data: createBuildingDTO) => {
    loading.value = true
    const res = await createBuildingAPI(data)
    loading.value = false
    return res
  }

  const updateBuildings = async (data: updateBuildingDTO) => {
    loading.value = true
    const res = await updateBuildingAPI(data)
    loading.value = false
    return res
  }

  const deleteBuildings = async (id: idBuildingDTO) => {
    loading.value = true
    const res = await deleteBuildingAPI(id)
    loading.value = false
    return res
  }

  return {
    getBuildingss,
    getOneBuilding,
    createBuilding,
    updateBuildings,
    deleteBuildings,
  }
}
