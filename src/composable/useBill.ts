import {
  getBillsAPI,
  getBillAPI,
  createBillAPI,
  updateBillAPI,
  deleteBillAPI,
  payBillAPI,
  sendBillAPI,
  getBillsPendingAPI,
  getBillsDraftAPI,
} from '@/api/bill'
import type { idBillDTO } from '@/typings/bill'
import type { payBillDTO } from '@/typings/payment'
import { ref } from 'vue'

export function useBill() {
  const loading = ref(false)

  const getBillss = async () => {
    loading.value = true
    const res = await getBillsAPI()
    loading.value = false
    return res
  }

  const getOneBill = async (id: idBillDTO) => {
    loading.value = true
    const res = await getBillAPI(id)
    loading.value = false
    return res
  }

  const createBill = async (data: FormData) => {
    loading.value = true
    const res = await createBillAPI(data)
    loading.value = false
    return res
  }

  const updateBills = async (id: number, data: FormData) => {
    loading.value = true
    const res = await updateBillAPI(id, data)
    loading.value = false
    return res
  }

  const sendBills = async (id: number, data: FormData) => {
    loading.value = true
    const res = await sendBillAPI(id, data)
    loading.value = false
    return res
  }

  const deleteBills = async (id: idBillDTO) => {
    loading.value = true
    const res = await deleteBillAPI(id)
    loading.value = false
    return res
  }

  const payBillsOn = async (id: number, data: payBillDTO) => {
    loading.value = true
    const res = await payBillAPI(id, data)
    loading.value = false
    return res
  }

  const getBillssPending = async () => {
    loading.value = true
    const res = await getBillsPendingAPI()
    loading.value = false
    return res
  }

  const getBillssDraft = async () => {
    loading.value = true
    const res = await getBillsDraftAPI()
    loading.value = false
    return res
  }

  return {
    getBillssPending,
    getBillssDraft,
    getBillss,
    getOneBill,
    createBill,
    updateBills,
    deleteBills,
    sendBills,
    payBillsOn,
  }
}
