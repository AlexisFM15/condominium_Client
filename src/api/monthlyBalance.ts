import type {
  createMonthlyBalanceDTO,
  idMonthlyBalanceDTO,
  updateMonthlyBalanceDTO,
} from '@/typings/monthlyBalance'
import { api, Endpoints } from './apiClient'

export const getMonthlyBalancesAPI = async () => {
  const res = await api.get(Endpoints.monthly_balance)
  return res.data
}

export const getMonthlyBalanceAPI = async (id: idMonthlyBalanceDTO) => {
  const res = await api.get(`${Endpoints.monthly_balance}/${id.id}`)
  return res.data
}

export const createMonthlyBalanceAPI = async (data: createMonthlyBalanceDTO) => {
  const res = await api.post(Endpoints.monthly_balance, data)
  return res.data
}

export const deleteMonthlyBalanceAPI = async (id: idMonthlyBalanceDTO) => {
  const res = await api.delete(`${Endpoints.monthly_balance}/${id.id}`)
  return res.data
}

export const updateMonthlyBalanceAPI = async (data: updateMonthlyBalanceDTO) => {
  const res = await api.patch(`${Endpoints.monthly_balance}/${data.id}`, data)
  return res.data
}
