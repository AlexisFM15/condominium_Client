// UpdateBillsView.vue
<script setup lang="ts">
import { ref, computed } from 'vue'

type Bill = {
  id: number
  amount: number
  gas_total: number
  gas_metric?: number
  gas_pic?: string
  apartment: { number: string }
  user?: { name: string }
  month: string
}

const props = withDefaults(defineProps<{ bills: Bill[] }>(), {
  bills: () => []
})

const billsList = ref([...props.bills])
const selectedBill = ref<Bill | null>(null)
const loading = ref(false)

const form = ref({
  gas_metric: 0,
  gas_pic: null as File | null
})

const search = ref('')

const filteredBills = computed(() =>
  billsList.value.filter(b =>
    b.apartment.number.toLowerCase().includes(search.value.toLowerCase()) ||
    (b.user?.name || '').toLowerCase().includes(search.value.toLowerCase())
  )
)

const isValid = computed(() =>
  selectedBill.value && form.value.gas_metric > 0 && form.value.gas_pic
)

const selectBill = (bill: Bill) => {
  selectedBill.value = bill
}

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.value.gas_pic = target.files[0]
  }
}

const submitUpdate = async () => {
  if (!isValid.value || !selectedBill.value) return

  loading.value = true

  try {
    const data = new FormData()
    data.append('gas_metric', String(form.value.gas_metric))
    data.append('gas_pic', form.value.gas_pic as File)

    await new Promise(resolve => setTimeout(resolve, 1000)) // mock

    // actualizar local
    const index = billsList.value.findIndex(b => b.id === selectedBill.value!.id)
    if (index !== -1) {
      billsList.value[index].gas_metric = form.value.gas_metric
    }

    selectedBill.value = null
    form.value.gas_metric = 0
    form.value.gas_pic = null

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

      <input v-model="search" placeholder="Buscar por apto o usuario"
        class="w-full mb-3 border rounded-xl px-3 py-2 dark:bg-gray-700" />

      <div v-for="bill in filteredBills" :key="bill.id" @click="selectBill(bill)"
        class="p-3 mb-2 rounded-xl cursor-pointer border hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="selectedBill?.id === bill.id ? 'bg-blue-100 dark:bg-blue-900' : ''">
        <p class="font-medium">Factura #{{ bill.id }}</p>
        <p class="text-sm">Apto: {{ bill.apartment.number }}</p>
        <p class="text-sm">Usuario: {{ bill.user?.name || 'N/A' }}</p>
      </div>
    </div>

    <!-- FORM -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 class="font-bold mb-4 text-gray-800 dark:text-gray-100">Actualizar Factura</h2>

      <div v-if="selectedBill" class="space-y-4">
        <p class="text-sm">Factura #{{ selectedBill.id }}</p>

        <input v-model.number="form.gas_metric" type="number" placeholder="Métrica de gas"
          class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

        <input type="file" accept="image/*" @change="handleFile"
          class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

        <button @click="submitUpdate" :disabled="!isValid || loading" class="w-full py-2 rounded-xl text-white"
          :class="isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'">
          <span v-if="loading">Actualizando...</span>
          <span v-else>Guardar cambios</span>
        </button>
      </div>

      <div v-else class="text-gray-500">Selecciona una factura</div>
    </div>

  </div>
</template>
