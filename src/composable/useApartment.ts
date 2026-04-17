import {
  getApartmentsAPI,
  getApartmentAPI,
  createApartmentAPI,
  updateApartmentAPI,
  deleteApartmentAPI,
} from '@/api/apartment'
import type { createApartmentDTO, idApartmentDTO, updateApartmentDTO } from '@/typings/apartment'
import { ref } from 'vue'

export function useApartment() {
  const loading = ref(false)

  const getApartmentss = async () => {
    loading.value = true
    const res = await getApartmentsAPI()
    loading.value = false
    return res
  }

  const getOneApartment = async (id: idApartmentDTO) => {
    loading.value = true
    const res = await getApartmentAPI(id)
    loading.value = false
    return res
  }

  const createApartment = async (data: createApartmentDTO) => {
    loading.value = true
    const res = await createApartmentAPI(data)
    loading.value = false
    return res
  }

  const updateApartments = async (data: updateApartmentDTO) => {
    loading.value = true
    const res = await updateApartmentAPI(data)
    loading.value = false
    return res
  }

  const deleteApartments = async (id: idApartmentDTO) => {
    loading.value = true
    const res = await deleteApartmentAPI(id)
    loading.value = false
    return res
  }

  return {
    getApartmentss,
    getOneApartment,
    createApartment,
    updateApartments,
    deleteApartments,
  }
}
