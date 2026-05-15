<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['submit'])

const form = ref({
  description: '',
  amount: 0,
  reference: '',
  payment_method: '',
  payment_date: '',
  paymentType: '',
  movementType: ''
})

const isValid = computed(() => {
  return (
    form.value.description.trim() &&
    form.value.amount > 0 &&
    form.value.reference.trim() &&
    form.value.payment_method &&
    form.value.payment_date &&
    form.value.paymentType
  )
})

const submit = () => {
  if (!isValid.value) return

  emit('submit', { ...form.value })

  form.value = {
    description: '',
    amount: 0,
    reference: '',
    payment_method: '',
    payment_date: '',
    paymentType: '',
    movementType: ''
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <h1 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Crear Pago</h1>

    <div class="space-y-3">
      <input v-model="form.description" required placeholder="Descripción"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <input v-model.number="form.amount" required type="number" min="1" placeholder="Monto"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <input v-model="form.reference" required placeholder="Referencia"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <select v-model="form.payment_method" required class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
        <option disabled value="">Método</option>
        <option value="TRANSFER">Transferencia</option>
        <option value="CASH">Efectivo</option>
      </select>

      <select v-model="form.paymentType" required class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
        <option disabled value="">Categoria</option>
        <option value="BILL">Factura</option>
        <option value="MAINTENANCE">Mantenimiento</option>
        <option value="Services">Servicio</option>
        <option value="Otros">Otros</option>
      </select>

      <select v-model="form.movementType" required class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
        <option disabled value="">Tipo</option>
        <option value="INCOME">Ingreso</option>
        <option value="Expense">Gasto</option>
      </select>

      <input v-model="form.payment_date" required type="date"
        class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <button @click="submit" :disabled="!isValid" class="w-full py-2 rounded-xl text-white transition"
        :class="isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'">
        Crear Pago
      </button>
    </div>
  </div>
</template>
