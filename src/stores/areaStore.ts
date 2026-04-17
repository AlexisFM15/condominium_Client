import { useArea } from '@/composable/useArea'
import type { createAreaDTO, idAreaDTO, updateAreaDTO, AreaDTO } from '@/typings/area'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAreaStore = defineStore('area', () => {
  const Areas = ref<AreaDTO[]>([])

  const { getAreass, getOneArea, createArea, updateAreas, deleteAreas } = useArea()

  const fetchArea = async () => {
    Areas.value = await getAreass()
  }

  const getOne = async (id: idAreaDTO) => {
    Areas.value = await getOneArea(id)
  }

  const createAreaS = async (data: createAreaDTO) => {
    await createArea(data)
    Areas.value.push({ ...data })
  }

  const updateArea = async (data: updateAreaDTO) => {
    await updateAreas(data)
    Areas.value = Areas.value.filter((Area) => Area.id !== data.id)
    Areas.value.push({ ...data } as AreaDTO)
  }

  const deleteArea = async (id: idAreaDTO) => {
    await deleteAreas(id)
  }
  return { Areas, fetchArea, getOne, createAreaS, updateArea, deleteArea }
})
