<script setup lang="ts">
import { ref } from 'vue'
import PaymentDashboard from '@/components/PaymentDashboard.vue'
import PaymentForm from '@/components/PaymentForm.vue'

export type Payment = {
  description: string
  amount: number
  reference: string
  payment_method: string
  payment_date: string
  paymentType: string
  movementType: string
}

const payments = ref<Payment[]>([
  {
    description: 'Pago mantenimiento',
    amount: 1500,
    reference: 'ABC123',
    payment_method: 'TRANSFER',
    payment_date: new Date().toISOString().slice(0, 10),
    paymentType: 'MONTHLY',
    movementType: 'Ingreso'
  }
])

const handleCreatePayment = (newPayment: Payment) => {
  payments.value.unshift(newPayment)
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

    <!-- FORMULARIO -->
    <PaymentForm @submit="handleCreatePayment" />

    <!-- TABLA -->
    <PaymentDashboard :payments="payments" />

  </div>
</template>
