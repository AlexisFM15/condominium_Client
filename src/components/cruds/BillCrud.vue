<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

import type { BillDTO } from '@/typings/bill'
import { useBillStore } from '@/stores/billStore'
import { useApartmentStore } from '@/stores/aparmentStore'

const billStore = useBillStore()
const apartmentStore = useApartmentStore()

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const sortKey = ref<keyof BillDTO | ''>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const showModal = ref(false)
const showDelete = ref(false)

const isEditing = ref(false)
const selectedId = ref<number | null>(null)

const statusOptions = ['Pagado', 'Pendiente', 'Vencida', 'Borrador']

const monthOptions = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const form = ref({
  amount: 0,
  status: 'Pendiente',
  due_date: '',
  year: new Date().getFullYear().toString(),
  month: '',
  apartmentId: 0,
  gas_metric: 0,
  latefee: 0,
  lateFeeStatus: false,
})
const gasPicFile = ref<File | null>(null)
const bills = computed(() => billStore.Bills)
const apartments = computed(() => apartmentStore.Apartments)

const filtered = computed(() => {
  if (!search.value) return bills.value

  return bills.value.filter((bill: any) =>
    JSON.stringify(bill).toLowerCase().includes(search.value.toLowerCase()),
  )
})

const sorted = computed(() => {
  if (!sortKey.value) return filtered.value

  return [...filtered.value].sort((a: any, b: any) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal < bVal) {
      return sortOrder.value === 'asc' ? -1 : 1
    }

    if (aVal > bVal) {
      return sortOrder.value === 'asc' ? 1 : -1
    }

    return 0
  })
})

const totalPages = computed(() => Math.ceil(sorted.value.length / perPage))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage

  return sorted.value.slice(start, start + perPage)
})

watch(search, () => {
  currentPage.value = 1
})

const sortBy = (key: keyof BillDTO) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const openCreate = () => {
  isEditing.value = false
  selectedId.value = null

  form.value = {
    amount: 0,
    status: 'Pendiente',
    due_date: '',
    year: new Date().getFullYear().toString(),
    month: '',
    apartmentId: 0,
    gas_metric: 0,
    latefee: 0,
    lateFeeStatus: false,
  }

  showModal.value = true
}

const openEdit = (bill: BillDTO) => {
  isEditing.value = true
  selectedId.value = bill.id ?? null

  form.value = {
    amount: bill.amount,
    status: bill.status,
    due_date: bill.due_date ? new Date(bill.due_date).toISOString().split('T')[0] : '',
    year: bill.year,
    month: bill.month,
    gas_pic: bill.gas_pic,
    apartmentId: bill.apartment?.id ?? 0,
    gas_metric: bill.gas_metric,
    latefee: bill.latefee ?? 0,
    lateFeeStatus: bill.lateFeeStatus ?? false,
  }

  showModal.value = true
}

const selectGasPicture = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files?.length) return

  gasPicFile.value = input.files[0]
}

const save = async () => {
  const formData = new FormData()

  formData.append('amount', form.value.amount.toString())
  formData.append('status', form.value.status)
  formData.append('due_date', form.value.due_date)
  formData.append('year', form.value.year)
  formData.append('month', form.value.month)
  formData.append('apartmentId', form.value.apartmentId.toString())
  formData.append('gas_metric', form.value.gas_metric.toString())
  formData.append('latefee', form.value.latefee.toString())
  formData.append('lateFeeStatus', String(form.value.lateFeeStatus))

  if (gasPicFile.value) {
    formData.append('gas_pic', gasPicFile.value)
  }
  console.log([...formData.entries()])

  if (isEditing.value && selectedId.value) {
    await billStore.updateBill(selectedId.value, formData)
  } else {
    await billStore.createBillS(formData)
  }

  await billStore.fetchBill()

  showModal.value = false
}
const confirmDelete = (id: number) => {
  selectedId.value = id
  showDelete.value = true
}

const remove = async () => {
  if (!selectedId.value) return

  await billStore.deleteBill({
    id: selectedId.value,
  })

  await billStore.fetchBill()

  showDelete.value = false
}

onMounted(async () => {
  await billStore.fetchBill()
  await apartmentStore.fetchApartment()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Facturas</h2>

      <button
        @click="openCreate"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        + Crear
      </button>
    </div>

    <input
      v-model="search"
      placeholder="Buscar..."
      class="w-full mb-4 border rounded-xl px-3 py-2 dark:bg-gray-700"
    />

    <table class="w-full text-sm">
      <thead>
        <tr class="border-b dark:border-gray-700">
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('amount')">Monto</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('status')">Estado</th>
          <th class="text-left px-3 py-2">Apartamento</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('month')">Mes</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('month')">Año</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('year')">Credito usado</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('year')">Metrica gas</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('year')">Total Gas</th>
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('year')">Mora</th>
          <th class="text-left px-3 py-2">Fecha límite</th>
          <th class="text-left px-3 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="bill in paginated" :key="bill.id" class="border-b dark:border-gray-700">
          <td class="px-3 py-2">
            {{ bill.amount }}
          </td>

          <td class="px-3 py-2">
            {{ bill.status }}
          </td>

          <td class="px-3 py-2">
            {{ bill.apartment.number }}
          </td>

          <td class="px-3 py-2">
            {{ bill.month }}
          </td>

          <td class="px-3 py-2">
            {{ bill.year }}
          </td>

          <td class="px-3 py-2">
            {{ bill.credited_amount }}
          </td>

          <td class="px-3 py-2">
            {{ bill.gas_metric }}
          </td>

          <td class="px-3 py-2">
            {{ bill.gas_total }}
          </td>

          <td class="px-3 py-2">
            {{ bill.latefee }}
          </td>

          <td class="px-3 py-2">
            {{ new Date(bill.due_date).toLocaleDateString() }}
          </td>

          <td class="px-3 py-2 flex gap-2">
            <button @click="openEdit(bill)" class="text-blue-500 hover:text-blue-700">
              Editar
            </button>

            <button @click="confirmDelete(bill.id!)" class="text-red-500 hover:text-red-700">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mt-4">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Anterior
      </button>

      <span> Página {{ currentPage }} de {{ totalPages }} </span>

      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
    <!-- Modal Crear / Editar -->

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl">
        <h2 class="text-xl font-bold mb-5">
          {{ isEditing ? 'Editar Factura' : 'Nueva Factura' }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block mb-1 font-medium"> Monto </label>

            <input
              v-model.number="form.amount"
              type="number"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium"> Estado </label>

            <select
              v-model="form.status"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            >
              <option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium"> Apartamento </label>

            <select
              v-model.number="form.apartmentId"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            >
              <option :value="0">Seleccione un apartamento</option>

              <option v-for="apartment in apartments" :key="apartment.id" :value="apartment.id">
                {{ apartment.number }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium"> Fecha límite </label>

            <input
              v-model="form.due_date"
              type="date"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium"> Año </label>

            <input
              v-model="form.year"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium"> Mes </label>

            <select
              v-model="form.month"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            >
              <option value="">Seleccione un mes</option>

              <option v-for="month in monthOptions" :key="month" :value="month">
                {{ month }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium"> URL Foto Gas </label>

            <input
              type="file"
              accept="image/*"
              @change="selectGasPicture"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium"> Medidor de Gas </label>

            <input
              v-model.number="form.gas_metric"
              type="number"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium"> Mora </label>

            <input
              v-model.number="form.latefee"
              type="number"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
          </div>

          <div class="flex items-center gap-3 mt-7">
            <input v-model="form.lateFeeStatus" type="checkbox" />

            <label> Aplicar Mora </label>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-300">Cancelar</button>

          <button @click="save" class="px-4 py-2 rounded bg-blue-500 text-white">Guardar</button>
        </div>
      </div>
    </div>
    <!-- Modal Eliminar -->

    <div v-if="showDelete" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold mb-3">Confirmar eliminación</h3>

        <p class="mb-6">¿Desea eliminar esta factura?</p>

        <div class="flex justify-end gap-2">
          <button @click="showDelete = false" class="px-4 py-2 rounded bg-gray-300">
            Cancelar
          </button>

          <button @click="remove" class="px-4 py-2 rounded bg-red-500 text-white">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>
