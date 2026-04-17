import type { createBuildingDTO, idBuildingDTO, updateBuildingDTO } from '@/typings/building'
import { api, Endpoints } from './apiClient'

export const getBuildingsAPI = async () => {
  const res = await api.get(Endpoints.buildings)
  return res.data
}

export const getBuildingAPI = async (id: idBuildingDTO) => {
  const res = await api.get(`${Endpoints.buildings}/${id.id}`)
  return res.data
}

export const createBuildingAPI = async (data: createBuildingDTO) => {
  const res = await api.post(Endpoints.buildings, data)
  return res.data
}

export const deleteBuildingAPI = async (id: idBuildingDTO) => {
  const res = await api.delete(`${Endpoints.buildings}/${id.id}`)
  return res.data
}

export const updateBuildingAPI = async (data: updateBuildingDTO) => {
  const res = await api.patch(`${Endpoints.buildings}/${data.id}`, data)
  return res.data
}
