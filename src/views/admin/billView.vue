<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useBillStore } from '@/stores/billStore'
import type { BillDTO } from '@/typings/bill'
import BillCrud from '@/components/cruds/BillCrud.vue'

const useBill = useBillStore()
const data = ref<BillDTO[]>([])

const columns = [
  {
    key: 'amount',
    label: 'Monto',
    type: 'number',
  },
  {
    key: 'status',
    label: 'Estado',
  },
  {
    key: 'due_date',
    label: 'Fecha de vencimiento',
  },
  {
    key: 'year',
    label: 'Año',
    type: 'number',
  },
  {
    key: 'month',
    label: 'Mes',
    type: 'number',
  },
  {
    key: 'credited_amount',
    label: 'Crédito usado',
    type: 'number',
  },
  {
    key: 'gas_metric',
    label: 'Gas',
    type: 'number',
  },
  {
    key: 'gas_total',
    label: 'Total gas',
    type: 'number',
  },
  {
    key: 'latefee',
    label: 'Mora',
    type: 'number',
  },
  {
    key: 'lateFeeStatus',
    label: 'Mora aplicada',
  },
  {
    key: 'apartmentId',
    label: 'Apartamento',
    type: 'select',
    endpoint: '/apartments',
    valueField: 'id',
    labelField: 'number',
    displayField: 'apartment.number',
  },
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
  <BillCrud />
</template>
