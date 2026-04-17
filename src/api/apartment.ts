import type { createApartmentDTO, idApartmentDTO, updateApartmentDTO } from '@/typings/apartment'
import { api, Endpoints } from './apiClient'

export const getApartmentsAPI = async () => {
  const res = await api.get(Endpoints.apartments)
  return res.data
}

export const getApartmentAPI = async (id: idApartmentDTO) => {
  const res = await api.get(`${Endpoints.apartments}/${id.id}`)
  return res.data
}

export const createApartmentAPI = async (data: createApartmentDTO) => {
  const res = await api.post(Endpoints.apartments, data)
  return res.data
}

export const deleteApartmentAPI = async (id: idApartmentDTO) => {
  const res = await api.delete(`${Endpoints.apartments}/${id.id}`)
  return res.data
}

export const updateApartmentAPI = async (data: updateApartmentDTO) => {
  const res = await api.patch(`${Endpoints.apartments}/${data.id}`, data)
  return res.data
}
