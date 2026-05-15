<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InvoiceModal from './invoiceModal.vue';
import type { BillDTO } from '@/typings/bill';

const showModal = ref(false)

const bill = ref({
  amount: 1500,
  status: 'pending',
  due_date: new Date(),
  year: '2026',
  month: 'Abril',
  gas_pic: 'https://via.placeholder.com/300',
  apartmentId: 12,
  gas_metric: 45,
  latefee: 200,
  lateFeeStatus: true
})

const props = defineProps<{
  bills?: BillDTO[],
  title: string,
  amount: number
  currency?: string
  date?: string
  status?: 'paid' | 'pending' | 'overdue'
  changePercent?: number // opcional: +5, -3, etc.
}>()

const currency = props.currency ?? 'DOP'

// formato dinero simple
const formatMoney = (value: number) => {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency
  }).format(value)
}

const lastBill = () => {
  console.log(props.bills?.slice(-2))
}

onMounted(() => {

  lastBill()
})
// color según estado
const statusColor = {
  paid: 'bg-green-100 text-green-600',
  pending: 'bg-yellow-100 text-yellow-600',
  overdue: 'bg-red-100 text-red-600'
}

const statusText = {
  paid: 'Pagada',
  pending: 'Pendiente',
  overdue: 'Vencida'
}

</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 h-30 flex flex-col justify-between shadow-sm">
    <!-- {{ props.bills?.at(-1) }} -->
    <!-- header -->
    <div class="flex justify-between items-center">
      <p class="text-xs text-gray-500">{{ title }}</p>

      <span v-if="props.bills?.at(-1)" class="text-xs px-2  rounded-full"
        :class="statusColor[props.bills?.at(-1)?.status]">
        {{ props.bills?.at(-1)?.status }}
      </span>
    </div>

    <!-- monto -->
    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
        {{ formatMoney(props.bills?.at(-1)?.amount) }}
      </h2>

      <p v-if="date" class="text-xs text-gray-500 mt-1">
        {{ props.bills?.at(-1)?.month + ' ' + props.bills?.at(-1)?.year }}
      </p>
    </div>

    <!-- footer -->
    <div class="flex justify-between items-center text-xs">

      <!-- cambio -->
      <div v-if="changePercent !== undefined" :class="changePercent >= 0 ? 'text-red-500' : 'text-green-500'">
        {{ changePercent >= 0 ? '↑' : '↓' }}
        {{ Math.abs(changePercent) }}%
      </div>

      <!-- botón -->
      <button @click="showModal = true" class="text-violet-500 hover:text-violet-600 font-medium">
        Ver detalle
      </button>

    </div>

    <InvoiceModal :show="showModal" :bill="props.bills?.at(-1)" @close="showModal = false" />
  </div>
</template>
