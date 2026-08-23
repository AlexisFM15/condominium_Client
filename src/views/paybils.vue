<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { BillDTO } from '@/typings/bill'
import { useBillStore } from '@/stores/billStore'

const billStore = useBillStore()

const search = ref('')
const monthFilter = ref('')

const page = ref(1)
const perPage = 10

const selectedBill = ref<BillDTO | null>(null)

const loading = ref(false)

const form = ref({
  reference: '',
  payment_method: '',
})

const toast = ref<{
  type: 'success' | 'error'
  message: string
} | null>(null)

const bills = computed(() => billStore.Bills)

const filteredBills = computed(() => {
  let result = bills.value

  if (search.value) {
    const text = search.value.toLowerCase()

    result = result.filter((bill) => {
      return bill.apartment.number.toString().includes(text) || bill.id?.toString().includes(text)
    })
  }

  if (monthFilter.value) {
    result = result.filter((bill) => {
      const month = `${bill.year}-${String(getMonthNumber(bill.month)).padStart(2, '0')}`

      return month.includes(monthFilter.value)
    })
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredBills.value.length / perPage) || 1
})

const paginatedBills = computed(() => {
  const start = (page.value - 1) * perPage

  return filteredBills.value.slice(start, start + perPage)
})

const isValid = computed(() => {
  return (
    selectedBill.value !== null &&
    form.value.reference.trim() !== '' &&
    form.value.payment_method !== ''
  )
})

const selectBill = (bill: BillDTO) => {
  selectedBill.value = bill

  form.value.reference = ''
  form.value.payment_method = ''
}

const submitPayment = async () => {
  if (!selectedBill.value?.id) return

  loading.value = true

  try {
    await billStore.paybill(selectedBill.value.id, {
      reference: form.value.reference,
      payment_method: form.value.payment_method,
    })

    await billStore.fetchBillPending()

    toast.value = {
      type: 'success',
      message: 'Pago realizado correctamente',
    }

    selectedBill.value = null

    form.value = {
      reference: '',
      payment_method: '',
    }
  } catch (error) {
    console.error(error)

    toast.value = {
      type: 'error',
      message: 'No se pudo procesar el pago',
    }
  } finally {
    loading.value = false
  }
}

const getMonthNumber = (month: string) => {
  const months: Record<string, number> = {
    Enero: 1,
    Febrero: 2,
    Marzo: 3,
    Abril: 4,
    Mayo: 5,
    Junio: 6,
    Julio: 7,
    Agosto: 8,
    Septiembre: 9,
    Octubre: 10,
    Noviembre: 11,
    Diciembre: 12,
  }

  return months[month] ?? 0
}

watch([search, monthFilter], () => {
  page.value = 1
})

onMounted(async () => {
  await billStore.fetchBillPending()
  console.log('FACTURAS PENDIENTES:', billStore.Bills)
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
    <!-- LISTADO DE FACTURAS -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Facturas pendientes</h2>

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

      <div v-if="paginatedBills.length === 0" class="text-gray-500 text-center py-5">
        No hay facturas disponibles
      </div>

      <div
        v-for="bill in paginatedBills"
        :key="bill.id"
        @click="selectBill(bill)"
        class="p-3 mb-2 rounded-xl cursor-pointer border hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="selectedBill?.id === bill.id ? 'bg-blue-100 dark:bg-blue-900' : ''"
      >
        <p class="font-medium">Factura #{{ bill.id }}</p>

        <p class="text-sm">
          Apartamento:
          {{ bill.apartment.number }}
        </p>

        <p class="text-sm">
          Mes:
          {{ bill.month }} {{ bill.year }}
        </p>

        <p class="text-sm">
          Estado:
          {{ bill.status }}
        </p>

        <p class="text-sm font-semibold">${{ bill.amount }}</p>

        <p v-if="bill.latefee" class="text-sm text-red-500">Mora: ${{ bill.latefee }}</p>
      </div>

      <!-- PAGINACIÓN -->

      <div class="flex justify-between items-center mt-4 text-sm">
        <button
          @click="page--"
          :disabled="page === 1"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span> Página {{ page }} / {{ totalPages }} </span>

        <button
          @click="page++"
          :disabled="page === totalPages"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
    <!-- FORMULARIO DE PAGO -->

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Pagar factura</h2>

      <div v-if="selectedBill" class="space-y-4">
        <div class="border rounded-xl p-3">
          <p class="font-medium">Factura #{{ selectedBill.id }}</p>

          <p class="text-sm">
            Apartamento:
            {{ selectedBill.apartment.number }}
          </p>

          <p class="text-sm">
            Mes:
            {{ selectedBill.month }}
            {{ selectedBill.year }}
          </p>

          <p class="font-semibold mt-2">Total: ${{ selectedBill.amount }}</p>
        </div>

        <div>
          <label class="block mb-1 font-medium"> Referencia </label>

          <input
            v-model="form.reference"
            placeholder="Número de transferencia o referencia"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium"> Método de pago </label>

          <select
            v-model="form.payment_method"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option value="">Seleccione método</option>

            <option value="Transferencia">Transferencia</option>

            <option value="Efectivo">Efectivo</option>
          </select>
        </div>

        <button
          @click="submitPayment"
          :disabled="!isValid || loading"
          class="w-full py-2 rounded-xl text-white"
          :class="isValid && !loading ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'"
        >
          <span v-if="loading"> Procesando... </span>

          <span v-else> Confirmar pago </span>
        </button>
      </div>

      <div v-else class="text-gray-500">Selecciona una factura para pagar</div>
    </div>
  </div>

  <!-- TOAST -->

  <div
    v-if="toast"
    class="fixed bottom-5 right-5 px-4 py-2 rounded-xl text-white shadow"
    :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
  >
    {{ toast.message }}
  </div>
</template>
