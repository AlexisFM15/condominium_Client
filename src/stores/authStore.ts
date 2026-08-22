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

  if (res.data.token) {
    setAccessToken(res.data.token)
    localStorage.setItem('accessToken', res.data.token)

    const me = await getMe()

    console.log('ME completo:', me)

    if (me?.defaultPassword) {
      showWelcomeModal.value = true
    }
  }

  message.value = res.data.message
}

  const getMe = async () => {
  try {
    const res = await getMeAPI()
    user.value = res.user
    return res.user
  } catch (error) {
    console.error(`Error detectado > ${error}`)
    user.value = null
    throw error
  }
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
