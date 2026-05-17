<script setup lang="ts">
import { ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'

const data = ref([
  {
    id: 1,
    amount: 11,
    status: 'Pagada',
    due_date: '10/3/2026',
    year: 2026,
    month: 'Marzo',
    gas_pic: 'https/sladmsdas',
    apartmentId: 1,
    gas_metric: 142.02,
    latefee: 7,
    lateFeeStatus: true,

  }
])

const columns = [
  { key: 'amount', label: 'Monto' },
  { key: 'status', label: 'Estado' },
  { key: 'due_date', label: 'fecha de vencimiento' },
  { key: 'year', label: 'Año' },
  { key: 'month', label: 'Mes' },
  { key: 'latefee', label: 'Mora' },
  { key: 'lateFeeStatus', label: 'mora aplicada' },
]

const create = (item: any) => {
  data.value.push({ ...item, id: Date.now() })
}

const update = (item: any) => {
  const i = data.value.findIndex(d => d.id === item.id)
  data.value[i] = item
}

const remove = (item: any) => {
  data.value = data.value.filter(d => d.id !== item.id)
}
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
