<script setup lang="ts">
import { ref } from 'vue'

export type Payment = {
  description: string
  amount: number
  reference: string
  payment_method: string
  payment_date: string
  paymentType: string
  movementType: string
}

const emit = defineEmits(['submit'])

const form = ref<Payment>({
  description: '',
  amount: 0,
  reference: '',
  payment_method: '',
  payment_date: '',
  paymentType: '',
  movementType: ''
})

const submit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
    <div class="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Crear Pago</h1>

      <div class="space-y-4">

        <input v-model="form.description" placeholder="Descripción"
          class="w-full border rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />

        <input v-model.number="form.amount" type="number" placeholder="Monto"
          class="w-full border rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />

        <input v-model="form.reference" placeholder="Referencia"
          class="w-full border rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />

        <select v-model="form.payment_method"
          class="w-full border rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          <option value="">Método de pago</option>
          <option value="TRANSFER">Transferencia</option>
          <option value="CASH">Efectivo</option>
        </select>

        <select v-model="form.paymentType"
          class="w-full border rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          <option value="">Tipo de pago</option>
          <option value="MONTHLY">Mensual</option>
          <option value="EXTRA">Extra</option>
        </select>

        <input v-model="form.payment_date" type="date"
          class="w-full border rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />

        <button @click="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl">
          Crear Pago
        </button>
      </div>
    </div>
  </div>
</template>
