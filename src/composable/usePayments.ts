import {
  getPaymentsAPI,
  getPaymentAPI,
  createPaymentAPI,
  updatePaymentAPI,
  deletePaymentAPI,
} from '@/api/payments'
import type { createPaymentDTO, idPaymentDTO, updatePaymentDTO } from '@/typings/payment'
import { ref } from 'vue'

export function usePayment() {
  const loading = ref(false)

  const getPaymentss = async () => {
    loading.value = true
    const res = await getPaymentsAPI()
    loading.value = false
    return res
  }

  const getOnePayment = async (id: idPaymentDTO) => {
    loading.value = true
    const res = await getPaymentAPI(id)
    loading.value = false
    return res
  }

  const createPayment = async (data: createPaymentDTO) => {
    loading.value = true
    const res = await createPaymentAPI(data)
    loading.value = false
    return res
  }

  const updatePayments = async (data: updatePaymentDTO) => {
    loading.value = true
    const res = await updatePaymentAPI(data)
    loading.value = false
    return res
  }

  const deletePayments = async (id: idPaymentDTO) => {
    loading.value = true
    const res = await deletePaymentAPI(id)
    loading.value = false
    return res
  }

  return {
    getPaymentss,
    getOnePayment,
    createPayment,
    updatePayments,
    deletePayments,
  }
}
