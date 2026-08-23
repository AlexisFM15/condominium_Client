<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBillStore } from '@/stores/billStore'
import type { BillDTO } from '@/typings/bill'

const billStore = useBillStore()

const loading = ref(false)

const search = ref('')
const selectedBill = ref<BillDTO | null>(null)

const form = ref({
  gas_metric: 0,
})

const gasPic = ref<File | null>(null)

const bills = computed(() => billStore.Bills)

const filteredBills = computed(() => {
  if (!search.value) return bills.value

  const text = search.value.toLowerCase()

  return bills.value.filter((bill) => {
    return bill.apartment.number.toString().includes(text) || bill.id?.toString().includes(text)
  })
})

const isValid = computed(() => {
  return form.value.gas_metric > 0
})

const selectBill = (bill: BillDTO) => {
  selectedBill.value = bill

  form.value.gas_metric = bill.gas_metric ?? 0

  gasPic.value = null
}

const handleFile = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files?.length) return

  gasPic.value = input.files[0]
}

const submitUpdate = async () => {
  if (!selectedBill.value?.id) return

  loading.value = true

  try {
    const formData = new FormData()

    formData.append('gasMetric', String(form.value.gas_metric))

    if (gasPic.value) {
      formData.append('gas_pic', gasPic.value)
    }

    await billStore.sendBill(selectedBill.value.id, formData)

    const updatedBill = billStore.Bills.find((bill) => bill.id === selectedBill.value?.id)

    if (updatedBill) {
      selectedBill.value = updatedBill
    }

    alert('Factura actualizada correctamente')
  } catch (error) {
    console.error(error)
    alert('Error al actualizar la factura')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await billStore.fetchBillDraft()
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- LISTADO -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Facturas</h2>

      <input
        v-model="search"
        placeholder="Buscar por apartamento o factura"
        class="w-full mb-4 border rounded-xl px-3 py-2 dark:bg-gray-700"
      />

      <div v-if="filteredBills.length === 0" class="text-center py-6 text-gray-500">
        No hay facturas disponibles
      </div>

      <div
        v-for="bill in filteredBills"
        :key="bill.id"
        @click="selectBill(bill)"
        class="border rounded-xl p-4 mb-3 cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="selectedBill?.id === bill.id ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : ''"
      >
        <p class="font-semibold">Factura #{{ bill.id }}</p>

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

        <p class="font-semibold mt-2">${{ bill.amount }}</p>
      </div>
    </div>

    <!-- FORMULARIO -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Actualizar factura</h2>

      <div v-if="selectedBill" class="space-y-5">
        <div class="border rounded-xl p-4">
          <p class="font-semibold">Factura #{{ selectedBill.id }}</p>

          <p class="text-sm">
            Apartamento:
            {{ selectedBill.apartment.number }}
          </p>

          <p class="text-sm">
            Mes:
            {{ selectedBill.month }} {{ selectedBill.year }}
          </p>

          <p class="text-sm">
            Estado:
            {{ selectedBill.status }}
          </p>
        </div>

        <div>
          <label class="block mb-1 font-medium"> Nueva métrica de gas </label>

          <input
            v-model.number="form.gas_metric"
            type="number"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium"> Foto del medidor </label>

          <input
            type="file"
            accept="image/*"
            @change="handleFile"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />
        </div>

        <button
          @click="submitUpdate"
          :disabled="!isValid || loading"
          class="w-full py-2 rounded-xl text-white"
          :class="isValid && !loading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'"
        >
          <span v-if="loading"> Actualizando... </span>

          <span v-else> Guardar cambios </span>
        </button>
      </div>

      <div v-else class="text-gray-500">Selecciona una factura para actualizar.</div>
    </div>
  </div>
</template>
