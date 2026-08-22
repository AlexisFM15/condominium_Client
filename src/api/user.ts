import type { createUserDTO, idUserDTO, updateUserDTO } from '@/typings/user'
import { api, Endpoints } from './apiClient'

export const getUsersAPI = async () => {
  const res = await api.get(Endpoints.Users)
  return res.data
}

export const getUserAPI = async (id: idUserDTO) => {
  const res = await api.get(`${Endpoints.Users}/${id.id}`)
  return res.data
}

export const createUserAPI = async (data: createUserDTO) => {
  const res = await api.post(Endpoints.Users, data)
  return res.data
}

export const deleteUserAPI = async (id: idUserDTO) => {
  const res = await api.delete(`${Endpoints.Users}/${id.id}`)
  return res.data
}

export const updateUserAPI = async (data: updateUserDTO) => {
  const res = await api.patch(`${Endpoints.Users}/${data.id}`, data)
  return res.data
}

export const getDashboardAPI = async () => {
  const res = await api.get(Endpoints.dashboard)
  return res.data
}

export const resetPasswordAPI = async (newPassword: string) => {
  const res = await api.patch(Endpoints.resetPassword, { newPassword })
  return res.data
}