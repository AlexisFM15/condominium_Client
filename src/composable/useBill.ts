import {
  getBillsAPI,
  getBillAPI,
  createBillAPI,
  updateBillAPI,
  deleteBillAPI,
  payBillAPI,
} from '@/api/bill'
import type { createBillDTO, idBillDTO, updateBillDTO } from '@/typings/bill'
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

  const createBill = async (data: createBillDTO) => {
    loading.value = true
    const res = await createBillAPI(data)
    loading.value = false
    return res
  }

  const updateBills = async (data: updateBillDTO) => {
    loading.value = true
    const res = await updateBillAPI(data)
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

  return {
    getBillss,
    getOneBill,
    createBill,
    updateBills,
    deleteBills,
    payBillsOn,
  }
}
