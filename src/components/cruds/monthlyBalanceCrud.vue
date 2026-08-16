<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MonthlyBalanceDTO } from '../../typings/monthlyBalance';
import { useMonthlyBalanceStore } from '../../stores/monthlyBalanceStore';



const props = defineProps<{
  monthlyBalances: MonthlyBalanceDTO[]
}>()

const emit = defineEmits<{
  (e: 'selected', value: MonthlyBalanceDTO): void
  (e: 'refresh'): void
}>()

const monthlyBalanceStore = useMonthlyBalanceStore()

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const sortKey = ref<keyof MonthlyBalanceDTO | ''>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const showModal = ref(false)
const showDelete = ref(false)

const isEditing = ref(false)

const selectedId = ref<number | null>(null)

const form = ref({
  month: '',
  year: new Date().getFullYear().toString(),
  income: 0,
  expense: 0,
  total: 0,
})

const months = [
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
const filtered = computed(() => {
  if (!search.value) return props.monthlyBalances

  return props.monthlyBalances.filter((balance) =>
    JSON.stringify(balance)
      .toLowerCase()
      .includes(search.value.toLowerCase()),
  )
})

const sorted = computed(() => {
  if (!sortKey.value) return filtered.value

  return [...filtered.value].sort((a: any, b: any) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]

    if (aValue < bValue) {
      return sortOrder.value === 'asc' ? -1 : 1
    }

    if (aValue > bValue) {
      return sortOrder.value === 'asc' ? 1 : -1
    }

    return 0
  })
})

const totalPages = computed(() =>
  Math.ceil(sorted.value.length / perPage),
)

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage

  return sorted.value.slice(
    start,
    start + perPage,
  )
})


watch(search, () => {
  currentPage.value = 1
})


const sortBy = (key: keyof MonthlyBalanceDTO) => {
  if (sortKey.value === key) {
    sortOrder.value =
      sortOrder.value === 'asc'
        ? 'desc'
        : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}


const resetForm = () => {
  form.value = {
    month: '',
    year: new Date().getFullYear().toString(),
    income: 0,
    expense: 0,
    total: 0,
  }
}


const openCreate = () => {
  isEditing.value = false
  selectedId.value = null

  resetForm()

  showModal.value = true
}


const openEdit = (balance: MonthlyBalanceDTO) => {
  isEditing.value = true

  selectedId.value = balance.id ?? null

  form.value = {
    month: balance.month,
    year: balance.year,
    income: balance.income,
    expense: balance.expense,
    total: balance.total,
  }

  showModal.value = true
}


const selectBalance = (balance: MonthlyBalanceDTO) => {
  emit('selected', balance)
}


const save = async () => {

  const payload: createMonthlyBalanceDTO = {
    month: form.value.month,
    year: form.value.year,
    income: Number(form.value.income),
    expense: Number(form.value.expense),
    total: Number(form.value.income) - Number(form.value.expense),
  }


  if (isEditing.value && selectedId.value) {

    await monthlyBalanceStore.updateMonthlyBalance({
      id: selectedId.value,
      ...payload,
    })

  } else {

    await monthlyBalanceStore.createMonthlyBalanceS(
      payload,
    )

  }


  await monthlyBalanceStore.fetchMonthlyBalance()

  emit('refresh')

  showModal.value = false
}


const confirmDelete = (id: number) => {
  selectedId.value = id
  showDelete.value = true
}


const remove = async () => {

  if (!selectedId.value) return


  await monthlyBalanceStore.deleteMonthlyBalance({
    id: selectedId.value,
  })


  await monthlyBalanceStore.fetchMonthlyBalance()

  emit('refresh')

  showDelete.value = false
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

    <div class="flex justify-between items-center mb-4">

      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        Balances Mensuales
      </h2>

      <button
        @click="openCreate"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        + Crear Balance
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

          <th
            class="text-left px-3 py-2 cursor-pointer"
            @click="sortBy('month')"
          >
            Mes
          </th>

          <th
            class="text-left px-3 py-2 cursor-pointer"
            @click="sortBy('year')"
          >
            Año
          </th>

          <th class="text-left px-3 py-2">
            Ingresos
          </th>

          <th class="text-left px-3 py-2">
            Gastos
          </th>

          <th class="text-left px-3 py-2">
            Total
          </th>

          <th class="text-left px-3 py-2">
            Acciones
          </th>

        </tr>
      </thead>


      <tbody>

        <tr
          v-for="balance in paginated"
          :key="balance.id"
          class="border-b dark:border-gray-700"
        >

          <td class="px-3 py-2">
            {{ balance.month }}
          </td>


          <td class="px-3 py-2">
            {{ balance.year }}
          </td>


          <td class="px-3 py-2">
            {{ balance.income }}
          </td>


          <td class="px-3 py-2">
            {{ balance.expense }}
          </td>


          <td class="px-3 py-2 font-bold">
            {{ balance.total }}
          </td>


          <td class="px-3 py-2 flex gap-2">

            <button
              @click="selectBalance(balance)"
              class="text-green-500 hover:text-green-700"
            >
              Ver
            </button>


            <button
              @click="openEdit(balance)"
              class="text-blue-500 hover:text-blue-700"
            >
              Editar
            </button>


            <button
              @click="confirmDelete(balance.id!)"
              class="text-red-500 hover:text-red-700"
            >
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


      <span>
        Página {{ currentPage }} de {{ totalPages }}
      </span>


      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Siguiente
      </button>

    </div>
        <!-- MODAL CREAR / EDITAR -->

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >

      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
      >

        <h2 class="text-xl font-bold mb-5">
          {{ isEditing ? 'Editar Balance' : 'Nuevo Balance' }}
        </h2>


        <div class="space-y-4">


          <div>
            <label class="text-sm text-gray-500">
              Mes
            </label>

            <select
              v-model="form.month"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            >

              <option value="">
                Seleccione un mes
              </option>

              <option
                v-for="month in months"
                :key="month"
                :value="month"
              >
                {{ month }}
              </option>

            </select>

          </div>



          <div>

            <label class="text-sm text-gray-500">
              Año
            </label>

            <input
              v-model="form.year"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />

          </div>



          <div>

            <label class="text-sm text-gray-500">
              Ingresos iniciales
            </label>

            <input
              v-model.number="form.income"
              type="number"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />

          </div>



          <div>

            <label class="text-sm text-gray-500">
              Gastos iniciales
            </label>

            <input
              v-model.number="form.expense"
              type="number"
              class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />

          </div>


        </div>



        <div class="flex justify-end gap-2 mt-6">

          <button
            @click="showModal = false"
            class="px-4 py-2 rounded bg-gray-300"
          >
            Cancelar
          </button>


          <button
            @click="save"
            class="px-4 py-2 rounded bg-green-500 text-white"
          >
            Guardar
          </button>


        </div>


      </div>

    </div>



    <!-- MODAL ELIMINAR -->


    <div
      v-if="showDelete"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >

      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm"
      >

        <h3 class="text-lg font-bold mb-3">
          Confirmar eliminación
        </h3>


        <p class="mb-6">
          ¿Desea eliminar este balance mensual?
        </p>


        <div class="flex justify-end gap-2">


          <button
            @click="showDelete = false"
            class="px-4 py-2 rounded bg-gray-300"
          >
            Cancelar
          </button>


          <button
            @click="remove"
            class="px-4 py-2 rounded bg-red-500 text-white"
          >
            Eliminar
          </button>


        </div>


      </div>


    </div>


  </div>
</template>
