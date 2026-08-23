import type { login } from '@/typings/auth'
import { api, Endpoints } from './apiClient'
import type { userLoginResponse } from '@/typings/user'

interface response {
  message: string
  data: {
    accessToken: string
    user: userLoginResponse
  }
}

export const loginAPI = async (data: login) => {
  const res = await api.post<response>(Endpoints.login, data, {
    validateStatus: (status) => status < 500,
  })
  return res
}

export const logoutAPI = async () => {
  await api.post(Endpoints.logout, {})
}

export const getMeAPI = async () => {
  const res = await api.get(Endpoints.me)
  return res.data
}
