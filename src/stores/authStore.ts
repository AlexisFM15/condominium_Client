import { loginAPI, logoutAPI, getMeAPI } from '@/api/auth'
import { defineStore } from 'pinia'
import type { login } from '@/typings/auth'
import { ref } from 'vue'
import type { userDTO } from '@/typings/user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<userDTO | null>(null)

  const setAccessToken = (token: string) => {
    accessToken.value = token
  }

  const login = async (credencials: login) => {
    const user = await loginAPI(credencials)
    if (user.token) {
      setAccessToken(user.token)
      localStorage.setItem('accessToken', user.token)
    }
  }

  const getMe = async () => {
    const res = await getMeAPI()
    user.value = res
    console.log(user)
  }

  const logout = async () => {
    await logoutAPI()
    localStorage.setItem('accessToken', '')
  }

  return { login, logout, getMe, user }
})
