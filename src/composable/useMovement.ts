import {
  getMovementsAPI,
  getMovementAPI,
  createMovementAPI,
  updateMovementAPI,
  deleteMovementAPI,
} from '@/api/movement'
import type { createMovementDTO, idMovementDTO, updateMovementDTO } from '@/typings/movement'
import { ref } from 'vue'

export function useMovement() {
  const loading = ref(false)

  const getMovementss = async () => {
    loading.value = true
    const res = await getMovementsAPI()
    loading.value = false
    return res
  }

  const getOneMovement = async (id: idMovementDTO) => {
    loading.value = true
    const res = await getMovementAPI(id)
    loading.value = false
    return res
  }

  const createMovement = async (data: createMovementDTO) => {
    loading.value = true
    const res = await createMovementAPI(data)
    loading.value = false
    return res
  }

  const updateMovements = async (data: updateMovementDTO) => {
    loading.value = true
    const res = await updateMovementAPI(data)
    loading.value = false
    return res
  }

  const deleteMovements = async (id: idMovementDTO) => {
    loading.value = true
    const res = await deleteMovementAPI(id)
    loading.value = false
    return res
  }

  return {
    getMovementss,
    getOneMovement,
    createMovement,
    updateMovements,
    deleteMovements,
  }
}
