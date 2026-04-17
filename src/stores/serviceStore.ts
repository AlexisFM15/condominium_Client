import { useService } from '@/composable/useService'
import type {
  createServiceDTO,
  idServiceDTO,
  updateServiceDTO,
  ServiceDTO,
} from '@/typings/service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServiceStore = defineStore('service', () => {
  const Services = ref<ServiceDTO[]>([])

  const { getServicess, getOneService, createService, updateServices, deleteServices } =
    useService()

  const fetchService = async () => {
    Services.value = await getServicess()
  }

  const getOne = async (id: idServiceDTO) => {
    Services.value = await getOneService(id)
  }

  const createServiceS = async (data: createServiceDTO) => {
    await createService(data)
    Services.value.push({ ...data })
  }

  const updateService = async (data: updateServiceDTO) => {
    await updateServices(data)
    Services.value = Services.value.filter((Service) => Service.id !== data.id)
    Services.value.push({ ...data } as ServiceDTO)
  }

  const deleteService = async (id: idServiceDTO) => {
    await deleteServices(id)
  }
  return { Services, fetchService, getOne, createServiceS, updateService, deleteService }
})
