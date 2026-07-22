<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PayBillsView from '../views/paybils.vue'
import { useBillStore } from '@/stores/billStore.ts'

const billsStore = useBillStore()
const bills = ref([
  {
    id: 1,
    amount: 1500,
    gas_total: 200,
    month: '2026-04',
    apartment: { number: 'A-101' },
    user: { name: 'Juan Pérez' },
  },
  {
    id: 2,
    amount: 1800,
    gas_total: 150,
    month: '2026-04',
    apartment: { number: 'B-202' },
    user: { name: 'María López' },
  },
  {
    id: 3,
    amount: 1200,
    gas_total: 100,
    month: '2026-03',
    apartment: { number: 'C-303' },
    user: { name: 'Carlos Díaz' },
  },
  {
    id: 4,
    amount: 2000,
    gas_total: 300,
    month: '2026-02',
    apartment: { number: 'D-404' },
    user: { name: 'Ana García' },
  },
])
onMounted(async () => {
  await billsStore.fetchBill()
})
</script>

<template>
  <PayBillsView :bills="billsStore.Bills" />
</template>
