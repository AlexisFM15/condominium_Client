import {
  getCondominiumsAPI,
  getCondominiumAPI,
  createCondominiumAPI,
  updateCondominiumAPI,
  deleteCondominiumAPI,
} from '@/api/condominum'
import type {
  createCondominiumDTO,
  idCondominiumDTO,
  updateCondominiumDTO,
} from '@/typings/condominium'
import { ref } from 'vue'

export function useCondominium() {
  const loading = ref(false)

  const getCondominiumss = async () => {
    loading.value = true
    const res = await getCondominiumsAPI()
    loading.value = false
    return res
  }

  const getOneCondominium = async (id: idCondominiumDTO) => {
    loading.value = true
    const res = await getCondominiumAPI(id)
    loading.value = false
    return res
  }

  const createCondominium = async (data: createCondominiumDTO) => {
    loading.value = true
    const res = await createCondominiumAPI(data)
    loading.value = false
    return res
  }

  const updateCondominiums = async (data: updateCondominiumDTO) => {
    loading.value = true
    const res = await updateCondominiumAPI(data)
    loading.value = false
    return res
  }

  const deleteCondominiums = async (id: idCondominiumDTO) => {
    loading.value = true
    const res = await deleteCondominiumAPI(id)
    loading.value = false
    return res
  }

  return {
    getCondominiumss,
    getOneCondominium,
    createCondominium,
    updateCondominiums,
    deleteCondominiums,
  }
}
