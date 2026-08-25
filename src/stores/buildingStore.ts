import { useBuilding } from '@/composable/useBuilding'
import type {
  createBuildingDTO,
  idBuildingDTO,
  updateBuildingDTO,
  BuildingDTO,
} from '@/typings/building'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBuildingStore = defineStore('building', () => {
  const Buildings = ref<BuildingDTO[]>([])

  const { getBuildingss, getOneBuilding, createBuilding, updateBuildings, deleteBuildings } =
    useBuilding()

  const fetchBuilding = async () => {
    Buildings.value = await getBuildingss()
  }

  const getOne = async (id: idBuildingDTO) => {
    Buildings.value = await getOneBuilding(id)
  }

  const createBuildingS = async (data: createBuildingDTO) => {
    await createBuilding(data)
    await fetchBuilding()
  }

  const updateBuilding = async (data: updateBuildingDTO) => {
    await updateBuildings(data)
    await fetchBuilding()
  }

  const deleteBuilding = async (id: idBuildingDTO) => {
    await deleteBuildings(id)
    await fetchBuilding()
  }
  return { Buildings, fetchBuilding, getOne, createBuildingS, updateBuilding, deleteBuilding }
})
