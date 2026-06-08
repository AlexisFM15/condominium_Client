<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { usePaymentStore } from '@/stores/paymentStore'
import type { PaymentDTO } from '@/typings/payment'

const usePayment = usePaymentStore()
const data = ref<PaymentDTO[]>([])

console.log(data)
const columns = [
  { key: 'amount', label: 'Monto' },
  { key: 'description', label: 'Descripción' },
  { key: 'reference', label: 'Referencia' },
  { key: 'payment_method', label: 'Metodo' },
  { key: 'payment_date', label: 'Fecha' },
  { key: 'paymentType', label: 'Tipo' },
]

const create = async (item: any) => {
  await usePayment.createPaymentS(item)
}

const update = async (item: any) => {
  await usePayment.updatePayment(item)
}

const remove = async (item: any) => {
  await usePayment.deletePayment(item)
}

onMounted(async () => {
  await usePayment.fetchPayment()
  data.value = usePayment.Payments
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
