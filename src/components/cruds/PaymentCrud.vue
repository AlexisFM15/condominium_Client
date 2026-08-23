<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { PaymentDTO, createPaymentDTO } from '@/typings/payment'
import { usePaymentStore } from '@/stores/paymentStore'

const paymentStore = usePaymentStore()

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const sortKey = ref<keyof PaymentDTO | ''>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const showModal = ref(false)
const isEditing = ref(false)
const showDelete = ref(false)
const selectedId = ref<number | null>(null)

const form = ref({
  description: '',
  amount: 0,
  reference: '',
  payment_method: '',
  payment_date: '',
  paymentType: '',
})

/* -------------------- DATA -------------------- */

const payments = computed(() => paymentStore.Payments)

/* -------------------- FILTER -------------------- */

const filtered = computed(() => {
  if (!search.value) return payments.value

  return payments.value.filter((p) =>
    Object.values(p).some((v) =>
      String(v ?? '')
        .toLowerCase()
        .includes(search.value.toLowerCase()),
    ),
  )
})

/* -------------------- SORT -------------------- */

const sorted = computed(() => {
  if (!sortKey.value) return filtered.value

  return [...filtered.value].sort((a: any, b: any) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

/* -------------------- PAGINATION -------------------- */

const totalPages = computed(() => Math.ceil(sorted.value.length / perPage))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sorted.value.slice(start, start + perPage)
})

watch(search, () => (currentPage.value = 1))

/* -------------------- ACTIONS -------------------- */

const openCreate = () => {
  isEditing.value = false
  selectedId.value = null
  form.value = {
    description: '',
    amount: 0,
    reference: '',
    payment_method: '',
    payment_date: '',
    paymentType: '',
  }
  showModal.value = true
}

const openEdit = (item: PaymentDTO) => {
  isEditing.value = true
  selectedId.value = item.id ?? null

  form.value = {
    description: item.description,
    amount: item.amount,
    reference: item.reference,
    payment_method: item.payment_method,
    payment_date: String(item.payment_date).slice(0, 10),
    paymentType: item.paymentType,
  }

  showModal.value = true
}

const save = async () => {
  const payload: createPaymentDTO = {
    description: form.value.description,
    amount: Number(form.value.amount),
    reference: form.value.reference,
    payment_method: form.value.payment_method,
    payment_date: form.value.payment_date,
    paymentType: form.value.paymentType,
  }

  if (isEditing.value && selectedId.value) {
    await paymentStore.updatePayment({
      ...payload,
      id: selectedId.value,
    })
  } else {
    await paymentStore.createPaymentS(payload)
  }

  await paymentStore.fetchPayment()

  showModal.value = false
}

const confirmDelete = (id: number) => {
  selectedId.value = id
  showDelete.value = true
}

const remove = async () => {
  if (!selectedId.value) return
  await paymentStore.deletePayment({ id: selectedId.value })
  await paymentStore.fetchPayment()
  showDelete.value = false
}

/* -------------------- INIT -------------------- */

onMounted(async () => {
  await paymentStore.fetchPayment()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <!-- HEADER -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Pagos</h2>

      <button
        @click="openCreate"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        + Crear
      </button>
    </div>

    <!-- SEARCH -->
    <input
      v-model="search"
      placeholder="Buscar..."
      class="w-full mb-4 border rounded-xl px-3 py-2 dark:bg-gray-700"
    />

    <!-- TABLE -->
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b dark:border-gray-700 text-left">
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'description'">Descripción</th>
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'amount'">Monto</th>
          <th class="px-3 py-2">Referencia</th>
          <th class="px-3 py-2">Método</th>
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'payment_date'">Fecha</th>
          <th class="px-3 py-2">Tipo</th>
          <th class="px-3 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in paginated" :key="p.id" class="border-b dark:border-gray-700">
          <td class="px-3 py-2">{{ p.description }}</td>
          <td class="px-3 py-2">${{ p.amount }}</td>
          <td class="px-3 py-2">{{ p.reference }}</td>
          <td class="px-3 py-2">{{ p.payment_method }}</td>
          <td class="px-3 py-2">{{ p.payment_date }}</td>
          <td class="px-3 py-2">{{ p.paymentType }}</td>

          <td class="px-3 py-2 flex gap-2">
            <button class="text-blue-500" @click="openEdit(p)">Editar</button>
            <button class="text-red-500" @click="confirmDelete(p.id!)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINATION -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <button
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Anterior
      </button>

      <span>{{ currentPage }} / {{ totalPages }}</span>

      <button
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Siguiente
      </button>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">
          {{ isEditing ? 'Editar Pago' : 'Crear Pago' }}
        </h3>

        <div class="space-y-3">
          <input
            v-model="form.description"
            placeholder="Descripción"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model.number="form.amount"
            type="number"
            placeholder="Monto"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model="form.reference"
            placeholder="Referencia"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <select
            v-model="form.payment_method"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option value="">Método de pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Cheque">Cheque</option>
          </select>

          <select
            v-model="form.paymentType"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option value="">Tipo de pago</option>
            <option value="Factura">Factura</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Servicio">Servicio</option>
            <option value="Otros">Otros</option>
          </select>

          <input
            v-model="form.payment_date"
            type="date"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="showModal = false">
            Cancelar
          </button>

          <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="save">Guardar</button>
        </div>
      </div>
    </div>

    <!-- DELETE -->
    <div v-if="showDelete" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm">
        <h3 class="font-bold mb-4">Eliminar</h3>

        <p class="mb-4 text-sm">¿Seguro que deseas eliminar este pago?</p>

        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="showDelete = false">
            Cancelar
          </button>

          <button class="px-4 py-2 bg-red-500 text-white rounded" @click="remove">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>