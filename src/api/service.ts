import type { createServiceDTO, idServiceDTO, updateServiceDTO } from '@/typings/service'
import { api, Endpoints } from './apiClient'

export const getServicesAPI = async () => {
  const res = await api.get(Endpoints.services)
  return res.data
}

export const getServiceAPI = async (id: idServiceDTO) => {
  const res = await api.get(`${Endpoints.services}/${id.id}`)
  return res.data
}

export const createServiceAPI = async (data: createServiceDTO) => {
  const res = await api.post(Endpoints.services, data)
  return res.data
}

export const deleteServiceAPI = async (id: idServiceDTO) => {
  const res = await api.delete(`${Endpoints.services}/${id.id}`)
  return res.data
}

export const updateServiceAPI = async (data: updateServiceDTO) => {
  const res = await api.patch(`${Endpoints.services}/${data.id}`, data)
  return res.data
}
