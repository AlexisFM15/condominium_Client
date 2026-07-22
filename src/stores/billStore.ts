import { useBill } from '@/composable/useBill'
import type { createBillDTO, idBillDTO, updateBillDTO, BillDTO } from '@/typings/bill'
import type { payBillDTO } from '@/typings/payment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBillStore = defineStore('bill', () => {
  const Bills = ref<BillDTO[]>([])

  const { getBillss, getOneBill, createBill, updateBills, deleteBills, payBillsOn } = useBill()

  const fetchBill = async () => {
    Bills.value = await getBillss()
  }

  const getOne = async (id: idBillDTO) => {
    Bills.value = await getOneBill(id)
  }

  const createBillS = async (data: createBillDTO) => {
    await createBill(data)
    Bills.value.push({ ...data })
  }

  const updateBill = async (data: updateBillDTO) => {
    await updateBills(data)
    Bills.value = Bills.value.filter((Bill) => Bill.id !== data.id)
    Bills.value.push({ ...data } as BillDTO)
  }

  const deleteBill = async (id: idBillDTO) => {
    await deleteBills(id)
  }

  const paybill = async (id: number, data: payBillDTO) => {
    console.log('aqui store')
    await payBillsOn(id, data)
  }
  return { Bills, fetchBill, getOne, createBillS, updateBill, deleteBill, paybill }
})
