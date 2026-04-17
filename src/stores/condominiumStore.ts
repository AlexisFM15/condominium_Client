import { useCondominium } from '@/composable/useCondominium'
import type {
  createCondominiumDTO,
  idCondominiumDTO,
  updateCondominiumDTO,
  CondominiumDTO,
} from '@/typings/condominium'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCondominiumStore = defineStore('condominium', () => {
  const Condominiums = ref<CondominiumDTO[]>([])

  const {
    getCondominiumss,
    getOneCondominium,
    createCondominium,
    updateCondominiums,
    deleteCondominiums,
  } = useCondominium()

  const fetchCondominium = async () => {
    Condominiums.value = await getCondominiumss()
  }

  const getOne = async (id: idCondominiumDTO) => {
    Condominiums.value = await getOneCondominium(id)
  }

  const createCondominiumS = async (data: createCondominiumDTO) => {
    await createCondominium(data)
    Condominiums.value.push({ ...data })
  }

  const updateCondominium = async (data: updateCondominiumDTO) => {
    await updateCondominiums(data)
    Condominiums.value = Condominiums.value.filter((Condominium) => Condominium.id !== data.id)
    Condominiums.value.push({ ...data } as CondominiumDTO)
  }

  const deleteCondominium = async (id: idCondominiumDTO) => {
    await deleteCondominiums(id)
  }
  return {
    Condominiums,
    fetchCondominium,
    getOne,
    createCondominiumS,
    updateCondominium,
    deleteCondominium,
  }
})
