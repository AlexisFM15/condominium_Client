import type {
  createExtraPaymentDTO,
  createPaymentDTO,
  idPaymentDTO,
  updatePaymentDTO,
} from '@/typings/payment'
import { api, Endpoints } from './apiClient'

export const getPaymentsAPI = async () => {
  const res = await api.get(Endpoints.payments)
  return res.data
}

export const getPaymentAPI = async (id: idPaymentDTO) => {
  const res = await api.get(`${Endpoints.payments}/${id.id}`)
  return res.data
}

export const createPaymentAPI = async (data: createPaymentDTO) => {
  const res = await api.post(Endpoints.payments, data)
  return res.data
}
export const createExtraPaymentAPI = async (data: createExtraPaymentDTO) => {
  const res = await api.post(`${Endpoints.payments}/extra`, data)
  return res.data
}

export const deletePaymentAPI = async (id: idPaymentDTO) => {
  const res = await api.delete(`${Endpoints.payments}/${id.id}`)
  return res.data
}

export const updatePaymentAPI = async (data: updatePaymentDTO) => {
  const res = await api.patch(`${Endpoints.payments}/${data.id}`, data)
  return res.data
}
