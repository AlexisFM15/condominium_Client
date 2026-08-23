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
    try {
      const res = await loginAPI(credentials)

      console.log('LOGIN RESPONSE:', res.data)
      console.log('LOGIN RESPONSE:', res.data.data.user.defaultPassword)

      if (res.data.data.accessToken) {
        setAccessToken(res.data.data.accessToken)
        localStorage.setItem('accessToken', res.data.data.accessToken)

        console.log('TOKEN GUARDADO:', localStorage.getItem('accessToken'))

        if (res.data.data.user.defaultPassword === true) {
          console.log('🔥 MOSTRANDO MODAL')
          showWelcomeModal.value = true
          console.log('showWelcomeModal:', showWelcomeModal.value)
        }
      }

      message.value = res.data.message
    } catch (error) {
      console.error('❌ ERROR EN LOGIN:', error)
    }
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
