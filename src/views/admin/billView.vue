<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBillStore } from '@/stores/billStore'
import type { BillDTO } from '@/typings/bill'
import BillCrud from '@/components/cruds/BillCrud.vue'

const useBill = useBillStore()
const data = ref<BillDTO[]>([])

onMounted(async () => {
  await useBill.fetchBill()
  data.value = useBill.Bills
})
</script>

<template>
  <BillCrud />
</template>
