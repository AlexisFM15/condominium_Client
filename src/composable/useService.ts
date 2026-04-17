import {
  getServicesAPI,
  getServiceAPI,
  createServiceAPI,
  updateServiceAPI,
  deleteServiceAPI,
} from '@/api/service'
import type { createServiceDTO, idServiceDTO, updateServiceDTO } from '@/typings/service'
import { ref } from 'vue'

export function useService() {
  const loading = ref(false)

  const getServicess = async () => {
    loading.value = true
    const res = await getServicesAPI()
    loading.value = false
    return res
  }

  const getOneService = async (id: idServiceDTO) => {
    loading.value = true
    const res = await getServiceAPI(id)
    loading.value = false
    return res
  }

  const createService = async (data: createServiceDTO) => {
    loading.value = true
    const res = await createServiceAPI(data)
    loading.value = false
    return res
  }

  const updateServices = async (data: updateServiceDTO) => {
    loading.value = true
    const res = await updateServiceAPI(data)
    loading.value = false
    return res
  }

  const deleteServices = async (id: idServiceDTO) => {
    loading.value = true
    const res = await deleteServiceAPI(id)
    loading.value = false
    return res
  }

  return {
    getServicess,
    getOneService,
    createService,
    updateServices,
    deleteServices,
  }
}
