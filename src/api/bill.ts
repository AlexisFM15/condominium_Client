import type { createBillDTO, idBillDTO, updateBillDTO } from '@/typings/bill'
import { api, Endpoints } from './apiClient'

export const getBillsAPI = async () => {
  const res = await api.get(Endpoints.bills)
  return res.data
}

export const getBillAPI = async (id: idBillDTO) => {
  const res = await api.get(`${Endpoints.bills}/${id.id}`)
  return res.data
}

export const createBillAPI = async (data: createBillDTO) => {
  const res = await api.post(Endpoints.bills, data)
  return res.data
}

export const deleteBillAPI = async (id: idBillDTO) => {
  const res = await api.delete(`${Endpoints.bills}/${id.id}`)
  return res.data
}

export const updateBillAPI = async (data: updateBillDTO) => {
  const res = await api.patch(`${Endpoints.bills}/${data.id}`, data)
  return res.data
}
