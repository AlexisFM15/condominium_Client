import {
  getMonthlyBalancesAPI,
  getMonthlyBalanceAPI,
  createMonthlyBalanceAPI,
  updateMonthlyBalanceAPI,
  deleteMonthlyBalanceAPI,
} from '@/api/monthlyBalance'
import type {
  createMonthlyBalanceDTO,
  idMonthlyBalanceDTO,
  updateMonthlyBalanceDTO,
} from '@/typings/monthlyBalance'
import { ref } from 'vue'

export function useMonthlyBalance() {
  const loading = ref(false)

  const getMonthlyBalancess = async () => {
    loading.value = true
    const res = await getMonthlyBalancesAPI()
    loading.value = false
    return res
  }

  const getOneMonthlyBalance = async (id: idMonthlyBalanceDTO) => {
    loading.value = true
    const res = await getMonthlyBalanceAPI(id)
    loading.value = false
    return res
  }

  const createMonthlyBalance = async (data: createMonthlyBalanceDTO) => {
    loading.value = true
    const res = await createMonthlyBalanceAPI(data)
    loading.value = false
    return res
  }

  const updateMonthlyBalances = async (data: updateMonthlyBalanceDTO) => {
    loading.value = true
    const res = await updateMonthlyBalanceAPI(data)
    loading.value = false
    return res
  }

  const deleteMonthlyBalances = async (id: idMonthlyBalanceDTO) => {
    loading.value = true
    const res = await deleteMonthlyBalanceAPI(id)
    loading.value = false
    return res
  }

  return {
    getMonthlyBalancess,
    getOneMonthlyBalance,
    createMonthlyBalance,
    updateMonthlyBalances,
    deleteMonthlyBalances,
  }
}
