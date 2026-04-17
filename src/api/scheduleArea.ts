import type {
  createScheduleAreaDTO,
  idScheduleAreaDTO,
  updateScheduleAreaDTO,
} from '@/typings/scheduleArea'
import { api, Endpoints } from './apiClient'

export const getScheduleAreasAPI = async () => {
  const res = await api.get(Endpoints.scheduleAreas)
  return res.data
}

export const getScheduleAreaAPI = async (id: idScheduleAreaDTO) => {
  const res = await api.get(`${Endpoints.scheduleAreas}/${id.id}`)
  return res.data
}

export const createScheduleAreaAPI = async (data: createScheduleAreaDTO) => {
  const res = await api.post(Endpoints.scheduleAreas, data)
  return res.data
}

export const deleteScheduleAreaAPI = async (id: idScheduleAreaDTO) => {
  const res = await api.delete(`${Endpoints.scheduleAreas}/${id.id}`)
  return res.data
}

export const updateScheduleAreaAPI = async (data: updateScheduleAreaDTO) => {
  const res = await api.patch(`${Endpoints.scheduleAreas}/${data.id}`, data)
  return res.data
}
