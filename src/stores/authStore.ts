import { loginAPI, logoutAPI, getMeAPI } from '@/api/auth'
import { defineStore } from 'pinia'
import type { login } from '@/typings/auth'
import { ref } from 'vue'
import type { userDTO } from '@/typings/user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<userDTO | null>(null)
  const message = ref<string>('')
  const showWelcomeModal = ref(false)

  const setAccessToken = (token: string) => {
    accessToken.value = token
  }

  const login = async (credentials: login) => {
    const res = await loginAPI(credentials)

    if (res.data.data) {
      const { token, user: userData } = res.data.data

      setAccessToken(token)
      localStorage.setItem('accessToken', token)

      user.value = userData

      if (userData.defaultPassword) {
        showWelcomeModal.value = true
      }
    }

    message.value = res.data.message
  }

  const getMe = async () => {
    const res = await getMeAPI()
    user.value = res
    console.log(user)
  }

  const logout = async () => {
    try {
      await logoutAPI()
      localStorage.removeItem('accessToken')
      accessToken.value = null
      user.value = null
    } catch (error) {
      console.log(error)
    }
  }

  return { login, logout, getMe, user, message, showWelcomeModal }
})
