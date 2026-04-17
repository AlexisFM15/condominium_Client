import { usePayment } from '@/composable/usePayments'
import type {
  createPaymentDTO,
  idPaymentDTO,
  updatePaymentDTO,
  PaymentDTO,
} from '@/typings/payment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentStore = defineStore('payment', () => {
  const Payments = ref<PaymentDTO[]>([])

  const { getPaymentss, getOnePayment, createPayment, updatePayments, deletePayments } =
    usePayment()

  const fetchPayment = async () => {
    Payments.value = await getPaymentss()
  }

  const getOne = async (id: idPaymentDTO) => {
    Payments.value = await getOnePayment(id)
  }

  const createPaymentS = async (data: createPaymentDTO) => {
    await createPayment(data)
    Payments.value.push({ ...data })
  }

  const updatePayment = async (data: updatePaymentDTO) => {
    await updatePayments(data)
    Payments.value = Payments.value.filter((Payment) => Payment.id !== data.id)
    Payments.value.push({ ...data } as PaymentDTO)
  }

  const deletePayment = async (id: idPaymentDTO) => {
    await deletePayments(id)
  }
  return { Payments, fetchPayment, getOne, createPaymentS, updatePayment, deletePayment }
})
