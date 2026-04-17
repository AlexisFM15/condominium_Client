import { useMovement } from '@/composable/useMovement'
import type {
  createMovementDTO,
  idMovementDTO,
  updateMovementDTO,
  MovementDTO,
} from '@/typings/movement'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovementStore = defineStore('movement', () => {
  const Movements = ref<MovementDTO[]>([])

  const { getMovementss, getOneMovement, createMovement, updateMovements, deleteMovements } =
    useMovement()

  const fetchMovement = async () => {
    Movements.value = await getMovementss()
  }

  const getOne = async (id: idMovementDTO) => {
    Movements.value = await getOneMovement(id)
  }

  const createMovementS = async (data: createMovementDTO) => {
    await createMovement(data)
    Movements.value.push({ ...data })
  }

  const updateMovement = async (data: updateMovementDTO) => {
    await updateMovements(data)
    Movements.value = Movements.value.filter((Movement) => Movement.id !== data.id)
    Movements.value.push({ ...data } as MovementDTO)
  }

  const deleteMovement = async (id: idMovementDTO) => {
    await deleteMovements(id)
  }
  return { Movements, fetchMovement, getOne, createMovementS, updateMovement, deleteMovement }
})
