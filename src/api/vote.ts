import type { createVoteDTO, idVoteDTO, updateVoteDTO } from '@/typings/vote'
import { api, Endpoints } from './apiClient'

export const getVotesAPI = async () => {
  const res = await api.get(Endpoints.votes)
  return res.data
}

export const getVoteAPI = async (id: idVoteDTO) => {
  const res = await api.get(`${Endpoints.votes}/${id.id}`)
  return res.data
}

export const createVoteAPI = async (data: createVoteDTO) => {
  const res = await api.post(Endpoints.votes, data)
  return res.data
}

export const deleteVoteAPI = async (id: idVoteDTO) => {
  const res = await api.delete(`${Endpoints.votes}/${id.id}`)
  return res.data
}

export const updateVoteAPI = async (data: updateVoteDTO) => {
  const res = await api.patch(`${Endpoints.votes}/${data.id}`, data)
  return res.data
}
