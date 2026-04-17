import type { login } from '@/typings/auth'
import { api, Endpoints } from './apiClient'

export const loginAPI = async (data: login) => {
  const res = await api.post(Endpoints.login, data)
  console.log(res)
  return res.data
}

export const logoutAPI = async () => {
  await api.post(Endpoints.logout, {})
}
