// PayBillsView.vue
<script setup lang="ts">
import { useBillStore } from '@/stores/billStore'
import type { BillDTO } from '@/typings/bill'
import { ref, computed, watch } from 'vue'

const props = defineProps<{ bills: BillDTO[] }>()

const billsList = ref<BillDTO[]>([])

watch(
  () => props.bills,
  (value) => {
    billsList.value = [...value]
  },
  {
    immediate: true,
  },
)
const selectedBill = ref<BillDTO | null>(null)
const loading = ref(false)

const billStore = useBillStore()

const form = ref({ reference: '', payment_method: '' })

// 🔎 filtros
const search = ref('')
const monthFilter = ref('')

// 📄 paginación
const page = ref(1)
const perPage = 5

// 🔔 toasts simples
const toast = ref<{ message: string; type: 'success' | 'error' } | null>(null)
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { message, type }
  setTimeout(() => (toast.value = null), 2500)
}

const filteredBills = computed(() => {
  return billsList.value.filter((b) => {
    const matchSearch = b.apartment.number

    const matchMonth = monthFilter.value
      ? b.month.toLowerCase().includes(monthFilter.value.toLowerCase())
      : true

    return matchSearch && matchMonth
  })
})

const totalPages = computed(() => Math.ceil(filteredBills.value.length / perPage))

const paginatedBills = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredBills.value.slice(start, start + perPage)
})

const isValid = computed(
  () => !!selectedBill.value && !!form.value.reference && !!form.value.payment_method,
)
const selectBill = (bill: BillDTO) => {
  console.log('Factura seleccionada:', bill)
  selectedBill.value = bill
}

const submitPayment = async () => {
  if (!isValid.value || !selectedBill.value) return

  loading.value = true

  try {
    const data = {
      reference: form.value.reference,
      payment_method: form.value.payment_method,
    }

    await billStore.paybill(selectedBill.value.id, data)

    // Eliminar la factura pagada de la lista
    billsList.value = billsList.value.filter((bill) => bill.id !== selectedBill.value!.id)

    // Limpiar formulario
    selectedBill.value = null

    form.value = {
      reference: '',
      payment_method: '',
    }

    showToast('Pago realizado correctamente', 'success')
  } catch (error) {
    console.error(error)
    showToast('Error al procesar el pago', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <!-- LISTA -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
      <h2 class="font-bold mb-4 text-gray-800 dark:text-gray-100">Facturas</h2>

      <div class="flex gap-2 mb-3">
        <input
          v-model="search"
          placeholder="Buscar por apto o usuario"
          class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
        />
        <input
          v-model="monthFilter"
          placeholder="Mes (ej: 2026-04)"
          class="w-40 border rounded-xl px-3 py-2 dark:bg-gray-700"
        />
      </div>

      <div
        v-for="bill in paginatedBills"
        :key="bill.id"
        @click="selectBill(bill)"
        class="p-3 mb-2 rounded-xl cursor-pointer border hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="selectedBill?.id === bill.id ? 'bg-blue-100 dark:bg-blue-900' : ''"
      >
        <p class="font-medium">Factura #{{ bill.id }}</p>
        <p class="text-sm">Apto: {{ bill.apartment.number }}</p>
        <p class="text-sm font-semibold">${{ bill.amount }}</p>
      </div>

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-4 text-sm">
        <button
          @click="page--"
          :disabled="page === 1"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {{ page }} / {{ totalPages }}</span>
        <button
          @click="page++"
          :disabled="page === totalPages"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- FORM -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold mb-4 text-gray-800 dark:text-gray-100">Pagar</h2>

      <div v-if="selectedBill" class="space-y-4">
        <p class="text-sm">Factura #{{ selectedBill.id }}</p>

        <input
          v-model="form.reference"
          placeholder="Referencia"
          class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
        />

        <select
          v-model="form.payment_method"
          class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
        >
          <option value="">Método</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Efectivo">Efectivo</option>
        </select>

        <button
          @click="
            () => {
              console.log('CLICK')
              submitPayment()
            }
          "
          :disabled="!isValid || loading"
          class="w-full py-2 rounded-xl text-white"
          :class="isValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'"
        >
          <span v-if="loading">Procesando...</span>
          <span v-else>Confirmar Pago</span>
        </button>
      </div>

      <div v-else class="text-gray-500">Selecciona una factura</div>
    </div>

    <!-- TOAST -->
    <div
      v-if="toast"
      class="fixed bottom-5 right-5 px-4 py-2 rounded text-white"
      :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
    >
      {{ toast.message }}
    </div>
  </div>
</template>
