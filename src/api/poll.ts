import type { createPollDTO, idPollDTO, updatePollDTO } from '@/typings/poll'
import { api, Endpoints } from './apiClient'

export const getPollsAPI = async () => {
  const res = await api.get(Endpoints.polls)
  return res.data
}

export const getPollAPI = async (id: idPollDTO) => {
  const res = await api.get(`${Endpoints.polls}/${id.id}`)
  return res.data
}

export const createPollAPI = async (data: createPollDTO) => {
  const res = await api.post(Endpoints.polls, data)
  return res.data
}

export const deletePollAPI = async (id: idPollDTO) => {
  const res = await api.delete(`${Endpoints.polls}/${id.id}`)
  return res.data
}

export const updatePollAPI = async (data: updatePollDTO) => {
  const res = await api.patch(`${Endpoints.polls}/${data.id}`, data)
  return res.data
}

export const getOpenPollAPI = async () => {
  const res = await api.get(`${Endpoints.polls}/open`)
  return res.data
}
