import { useMonthlyBalance } from '@/composable/useMonthlyBalance'
import type {
  createMonthlyBalanceDTO,
  idMonthlyBalanceDTO,
  updateMonthlyBalanceDTO,
  MonthlyBalanceDTO,
} from '@/typings/monthlyBalance'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMonthlyBalanceStore = defineStore('monthlyBalance', () => {
  const MonthlyBalances = ref<MonthlyBalanceDTO[]>([])

  const {
    getMonthlyBalancess,
    getOneMonthlyBalance,
    createMonthlyBalance,
    updateMonthlyBalances,
    deleteMonthlyBalances,
  } = useMonthlyBalance()

  const fetchMonthlyBalance = async () => {
    MonthlyBalances.value = await getMonthlyBalancess()
  }

  const getOne = async (id: idMonthlyBalanceDTO) => {
    MonthlyBalances.value = await getOneMonthlyBalance(id)
  }

  const createMonthlyBalanceS = async (data: createMonthlyBalanceDTO) => {
    await createMonthlyBalance(data)
    MonthlyBalances.value.push({ ...data })
  }

  const updateMonthlyBalance = async (data: updateMonthlyBalanceDTO) => {
    await updateMonthlyBalances(data)
    MonthlyBalances.value = MonthlyBalances.value.filter(
      (MonthlyBalance) => MonthlyBalance.id !== data.id,
    )
    MonthlyBalances.value.push({ ...data } as MonthlyBalanceDTO)
  }

  const deleteMonthlyBalance = async (id: idMonthlyBalanceDTO) => {
    await deleteMonthlyBalances(id)
  }
  return {
    MonthlyBalances,
    fetchMonthlyBalance,
    getOne,
    createMonthlyBalanceS,
    updateMonthlyBalance,
    deleteMonthlyBalance,
  }
})
