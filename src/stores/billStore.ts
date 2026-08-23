import { useBill } from '@/composable/useBill'
import type { idBillDTO, BillDTO } from '@/typings/bill'
import type { payBillDTO } from '@/typings/payment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBillStore = defineStore('bill', () => {
  const Bills = ref<BillDTO[]>([])

  const {
    getBillss,
    getOneBill,
    createBill,
    updateBills,
    deleteBills,
    payBillsOn,
    sendBills,
    getBillssPending,
    getBillssDraft,
  } = useBill()

  const fetchBill = async () => {
    Bills.value = await getBillss()
  }

  const getOne = async (id: idBillDTO) => {
    Bills.value = await getOneBill(id)
  }

  const createBillS = async (data: FormData) => {
    await createBill(data)
  }

  const updateBill = async (id: number, data: FormData) => {
    await updateBills(id, data)
    await fetchBill()
  }

  const deleteBill = async (id: idBillDTO) => {
    await deleteBills(id)
  }

  const sendBill = async (id: number, data: FormData) => {
    await sendBills(id, data)
    await fetchBill()
  }

  const paybill = async (id: number, data: payBillDTO) => {
    await payBillsOn(id, data)
  }

  const fetchBillPending = async () => {
    Bills.value = await getBillssPending()
  }

  const fetchBillDraft = async () => {
    Bills.value = await getBillssDraft()
  }
  return {
    Bills,
    fetchBill,
    getOne,
    createBillS,
    updateBill,
    deleteBill,
    paybill,
    sendBill,
    fetchBillPending,
    fetchBillDraft,
  }
})
