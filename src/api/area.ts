import type { createAreaDTO, idAreaDTO, updateAreaDTO } from '@/typings/area'
import { api, Endpoints } from './apiClient'

export const getAreasAPI = async () => {
  const res = await api.get(Endpoints.areas)
  return res.data
}

export const getAreaAPI = async (id: idAreaDTO) => {
  const res = await api.get(`${Endpoints.areas}/${id.id}`)
  return res.data
}

export const createAreaAPI = async (data: createAreaDTO) => {
  const res = await api.post(Endpoints.areas, data)
  return res.data
}

export const deleteAreaAPI = async (id: idAreaDTO) => {
  const res = await api.delete(`${Endpoints.areas}/${id.id}`)
  return res.data
}

export const updateAreaAPI = async (data: updateAreaDTO) => {
  const res = await api.patch(`${Endpoints.areas}/${data.id}`, data)
  return res.data
}
