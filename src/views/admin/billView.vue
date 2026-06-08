<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useBillStore } from '@/stores/billStore'
import type { BillDTO } from '@/typings/bill'

const useBill = useBillStore()
const data = ref<BillDTO[]>([])

const columns = [
  { key: 'amount', label: 'Monto' },
  { key: 'status', label: 'Estado' },
  { key: 'due_date', label: 'fecha de vencimiento' },
  { key: 'year', label: 'Año' },
  { key: 'month', label: 'Mes' },
  { key: 'latefee', label: 'Mora' },
  { key: 'lateFeeStatus', label: 'mora aplicada' },
  { key: 'apartment.number', label: 'Apartamento' },
]

const create = async (item: any) => {
  await useBill.createBillS(item)
}

const update = async (item: any) => {
  await useBill.updateBill(item)
}

const remove = async (item: any) => {
  await useBill.deleteBill(item)
}

onMounted(async () => {
  await useBill.fetchBill()
  data.value = useBill.Bills
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
