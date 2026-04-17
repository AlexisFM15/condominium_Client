import { loginAPI, logoutAPI } from '@/api/auth'
import { defineStore } from 'pinia'
import type { login } from '@/typings/auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)

  const setAccessToken = (token: string) => {
    accessToken.value = token
  }

  const login = async (credencials: login) => {
    const user = await loginAPI(credencials)
    console.log(user)
    if (user.token) {
      setAccessToken(user.token)
      localStorage.setItem('accessToken', user.token)
    }
  }

  const logout = async () => {
    await logoutAPI()
    localStorage.setItem('accessToken', '')
  }

  return { login, logout }
})
