<script setup lang="ts">
import Monthlybalancedetail from '@/components/monthlybalancedetail.vue';
import { useMonthlyBalanceStore } from '@/stores/monthlyBalanceStore';
import { useMovementStore } from '@/stores/movementStore';
import { computed, onMounted, ref } from 'vue'



const useBalance = useMonthlyBalanceStore()
const useMovement = useMovementStore()

const monthlyBalances = computed(() => useBalance.MonthlyBalances)
const movementss = computed(() => useMovement.Movements)

onMounted(async () => {
  await useBalance.fetchMonthlyBalance()
  await useMovement.fetchMovement()
})
</script>

<template>
  <Monthlybalancedetail :monthly-balance="monthlyBalances" :movements="movementss" />
</template>
