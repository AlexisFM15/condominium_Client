import axios, { type InternalAxiosRequestConfig } from 'axios'

export const Endpoints = {
  Users: '/users',
  login: '/login',
  logout: '/logout',
  apartments: '/apartments',
  areas: '/areas',
  bills: '/bills',
  buildings: '/buildings',
  condominiums: '/condominiums',
  monthly_balance: '/monthlyBalances',
  movements: '/movements',
  payments: '/payments',
  polls: '/polls',
  scheduleAreas: '/schedule_areas',
  services: '/services',
  votes: '/votes',
}

export const api = axios.create({
  baseURL: 'http://localhost:3200',
  withCredentials: true,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    console.log(originalRequest, 'asa')
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const res = await api.post('/refreshToken', {}, { withCredentials: true })
        console.log(res)
        localStorage.setItem('accessToken', res.data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`

        return api(originalRequest)
      } catch (err) {
        console.log('Refresh falló', err)
      }
    }

    return Promise.reject(error)
  },
)
