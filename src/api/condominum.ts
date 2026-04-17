import type {
  createCondominiumDTO,
  idCondominiumDTO,
  updateCondominiumDTO,
} from '@/typings/condominium'
import { api, Endpoints } from './apiClient'

export const getCondominiumsAPI = async () => {
  const res = await api.get(Endpoints.condominiums)
  return res.data
}

export const getCondominiumAPI = async (id: idCondominiumDTO) => {
  const res = await api.get(`${Endpoints.condominiums}/${id.id}`)
  return res.data
}

export const createCondominiumAPI = async (data: createCondominiumDTO) => {
  const res = await api.post(Endpoints.condominiums, data)
  return res.data
}

export const deleteCondominiumAPI = async (id: idCondominiumDTO) => {
  const res = await api.delete(`${Endpoints.condominiums}/${id.id}`)
  return res.data
}

export const updateCondominiumAPI = async (data: updateCondominiumDTO) => {
  const res = await api.patch(`${Endpoints.condominiums}/${data.id}`, data)
  return res.data
}
