<script setup lang="ts">
import { ref } from 'vue'
import UpdateBillsView from './updateDrafts.vue'

const bills = ref([
  {
    id: 1,
    amount: 1500,
    gas_total: 200,
    gas_metric: 120,
    gas_pic: '',
    month: '2026-04',
    apartment: { number: 'A-101' },
    user: { name: 'Juan Pérez' }
  },
  {
    id: 2,
    amount: 1800,
    gas_total: 150,
    gas_metric: 98,
    gas_pic: '',
    month: '2026-04',
    apartment: { number: 'B-202' },
    user: { name: 'María López' }
  },
  {
    id: 3,
    amount: 1200,
    gas_total: 100,
    gas_metric: 75,
    gas_pic: '',
    month: '2026-03',
    apartment: { number: 'C-303' },
    user: { name: 'Carlos Díaz' }
  },
  {
    id: 4,
    amount: 2000,
    gas_total: 300,
    gas_metric: 140,
    gas_pic: '',
    month: '2026-02',
    apartment: { number: 'D-404' },
    user: { name: 'Ana García' }
  }
])
</script>

<template>
  <UpdateBillsView :bills="bills" />
</template>
