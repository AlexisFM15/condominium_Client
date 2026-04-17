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
    Buildings.value.push({ ...data })
  }

  const updateBuilding = async (data: updateBuildingDTO) => {
    await updateBuildings(data)
    Buildings.value = Buildings.value.filter((Building) => Building.id !== data.id)
    Buildings.value.push({ ...data } as BuildingDTO)
  }

  const deleteBuilding = async (id: idBuildingDTO) => {
    await deleteBuildings(id)
  }
  return { Buildings, fetchBuilding, getOne, createBuildingS, updateBuilding, deleteBuilding }
})
