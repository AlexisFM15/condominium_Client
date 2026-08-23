<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PayBillsView from '../views/paybils.vue'
import { useBillStore } from '@/stores/billStore.ts'

const billsStore = useBillStore()

onMounted(async () => {
  await billsStore.fetchBillPending()
})
</script>

<template>
  <PayBillsView :bills="billsStore.Bills" />
</template>
