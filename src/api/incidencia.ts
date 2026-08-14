import type { createIncidenciaDTO, idIncidenciaDTO, updateIncidenciaDTO } from '@/typings/incidencia'
import { api, Endpoints } from './apiClient'

export const getIncidenciasAPI = async () => {
  const res = await api.get(Endpoints.incidencias)
  return res.data
}

export const getIncidenciaAPI = async (id: idIncidenciaDTO) => {
  const res = await api.get(`${Endpoints.incidencias}/${id.id}`)
  return res.data
}

export const createIncidenciaAPI = async (data: createIncidenciaDTO) => {
  const res = await api.post(Endpoints.incidencias, data)
  return res.data
}

export const deleteIncidenciaAPI = async (id: idIncidenciaDTO) => {
  const res = await api.delete(`${Endpoints.incidencias}/${id.id}`)
  return res.data
}

export const updateIncidenciaAPI = async (data: updateIncidenciaDTO) => {
  const res = await api.patch(`${Endpoints.incidencias}/${data.id}`, data)
  return res.data
}
