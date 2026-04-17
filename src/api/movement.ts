import type { createMovementDTO, idMovementDTO, updateMovementDTO } from '@/typings/movement'
import { api, Endpoints } from './apiClient'

export const getMovementsAPI = async () => {
  const res = await api.get(Endpoints.movements)
  return res.data
}

export const getMovementAPI = async (id: idMovementDTO) => {
  const res = await api.get(`${Endpoints.movements}/${id.id}`)
  return res.data
}

export const createMovementAPI = async (data: createMovementDTO) => {
  const res = await api.post(Endpoints.movements, data)
  return res.data
}

export const deleteMovementAPI = async (id: idMovementDTO) => {
  const res = await api.delete(`${Endpoints.movements}/${id.id}`)
  return res.data
}

export const updateMovementAPI = async (data: updateMovementDTO) => {
  const res = await api.patch(`${Endpoints.movements}/${data.id}`, data)
  return res.data
}
