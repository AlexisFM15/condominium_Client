<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useMonthlyBalanceStore } from '../../stores/monthlyBalanceStore'
import { useMovementStore } from '../../stores/movementStore'
import type { MonthlyBalanceDTO } from '../../typings/monthlyBalance'
import MovementCrud from '../../components/cruds/movementCrud.vue'
import MonthlyBalanceCrud from '../../components/cruds/monthlyBalanceCrud.vue'


const monthlyBalanceStore = useMonthlyBalanceStore()
const movementStore = useMovementStore()

const selectedBalance = ref<MonthlyBalanceDTO | null>(null)

const monthlyBalances = computed(
  () => monthlyBalanceStore.MonthlyBalances
)

const movements = computed(
  () => movementStore.Movements
)

const selectBalance = (balance: MonthlyBalanceDTO) => {
  selectedBalance.value = balance
}

const refreshData = async () => {
  await Promise.all([
    monthlyBalanceStore.fetchMonthlyBalance(),
    movementStore.fetchMovement(),
  ])
}

onMounted(async () => {
  await refreshData()
  console.log('Balances', monthlyBalanceStore.MonthlyBalances)
  console.log('Movements', movementStore.Movements)
})
</script>

<template>
  <div class="space-y-6">

    <MonthlyBalanceCrud
      :monthly-balances="monthlyBalances"
      @selected="selectBalance"
      @refresh="refreshData"
    />

    <MovementCrud
      v-if="selectedBalance"
      :balance="selectedBalance"
      :movements="movements"
      @refresh="refreshData"
    />

    <div
      v-else
      class="bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center"
    >
      <h2 class="text-xl font-semibold">
        Selecciona un balance mensual
      </h2>

      <p class="text-gray-500 mt-2">
        Cuando selecciones un balance podrás administrar
        todos sus movimientos.
      </p>
    </div>

  </div>
</template>
