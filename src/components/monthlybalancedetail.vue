<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  monthlyBalance: MonthlyBalanceDTO[]
  movements: MovementDTO[]
}>()

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
  'Diciembre'
]

console.log(props.monthlyBalance)

const years = ['2024', '2025', '2026', '2027']

const selectedMonth = ref('')
const selectedYear = ref('')

const localMovements = ref<MovementDTO[]>(
  Array.isArray(props.movements)
    ? props.movements
    : []
)

const selectedBalance = computed(() => {
  return props.monthlyBalance.find(
    b =>
      b.month.toLowerCase() ===
      selectedMonth.value.toLowerCase() &&
      String(b.year) === String(selectedYear.value)
  )
})

console.log(props.monthlyBalance)
console.log(selectedMonth.value)
console.log(localMovements)

const currentBalance = computed(() => {
  return selectedBalance.value
    ? { ...selectedBalance.value }
    : null
})

const showModal = ref(false)

const form = ref<MovementDTO>({
  type: 'INCOME',
  description: '',
  amount: 0,
  date: '',
  monthlyBalanceId: selectedBalance.value?.id || 0
})

const columns = [
  { key: 'type', label: 'Tipo' },
  { key: 'description', label: 'Descripción' },
  { key: 'amount', label: 'Monto' },
  { key: 'date', label: 'Fecha' }
]


const filteredMovements = computed(() => {
  if (!selectedBalance.value) return []

  return localMovements.value.filter(
    m => m.monthly_balance.id === selectedBalance.value?.id
  )
})

const computedBalance = computed(() => {
  if (!selectedBalance.value) return null

  const movements = localMovements.value.filter(
    m => m.monthlyBalanceId === selectedBalance.value!.id
  )

  const income = movements
    .filter(m => m.type === 'INCOME')
    .reduce((sum, m) => sum + Number(m.amount), 0)

  const expense = movements
    .filter(m => m.type === 'EXPENSE')
    .reduce((sum, m) => sum + Number(m.amount), 0)

  return {
    ...selectedBalance.value,
    income,
    expense,
    total: income - expense
  }
})

const createMovement = () => {
  const movement = {
    ...form.value,
    id: Date.now()
  }

  localMovements.value.push(movement)


  form.value = {
    type: 'INCOME',
    description: '',
    amount: 0,
    date: '',
    monthlyBalanceId: selectedBalance.value?.id || 0
  }

  showModal.value = false
}

const removeMovement = (id?: number) => {
  localMovements.value = localMovements.value.filter(
    item => item.id !== id
  )
}

import { watch } from 'vue'
import { MovementDTO } from '../typings/movement';
import { MonthlyBalanceDTO } from '../typings/monthlyBalance';

watch(selectedBalance, (val) => {
  form.value.monthlyBalanceId = val?.id || 0
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

    <!-- HEADER -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
        Balance Mensual
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <!-- MES -->
        <div>
          <label class="text-sm text-gray-500">
            Mes
          </label>

          <select v-model="selectedMonth" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
            <option value="">
              Seleccionar mes
            </option>

            <option v-for="month in months" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>

        <!-- AÑO -->
        <div>
          <label class="text-sm text-gray-500">
            Año
          </label>

          <select v-model="selectedYear" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
            <option value="">
              Seleccionar año
            </option>

            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>

    </div>

    <!-- DATOS PRINCIPALES -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <!-- FILTROS -->

      <div>
        <label class="text-sm text-gray-500">Ingresos</label>

        <input :value="currentBalance?.income || 0" disabled
          class="w-full border rounded-xl px-3 py-2 bg-gray-100 dark:bg-gray-700" />
      </div>

      <div>
        <label class="text-sm text-gray-500">Gastos</label>

        <input :value="currentBalance?.expense || 0" disabled
          class="w-full border rounded-xl px-3 py-2 bg-gray-100 dark:bg-gray-700" />
      </div>


      <div>
        <label class="text-sm text-gray-500">
          Total
        </label>

        <input :value="currentBalance?.total || 0" disabled
          class="w-full border rounded-xl px-3 py-2 bg-gray-100 dark:bg-gray-700" />
      </div>

    </div>

    <!-- HEADER TABLA -->
    <div class="flex justify-between items-center mb-4">

      <h3 class="text-xl font-bold">
        Movimientos
      </h3>

      <button @click="showModal = true" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">
        + Agregar
      </button>

    </div>

    <!-- TABLA -->
    <div class="overflow-x-auto">

      <table class="w-full text-sm">

        <thead>
          <tr class="border-b dark:border-gray-700 text-left">

            <th v-for="col in columns" :key="col.key" class="px-3 py-2">
              {{ col.label }}
            </th>

            <th class="px-3 py-2">
              Acciones
            </th>

          </tr>
        </thead>

        <tbody>

          <tr v-for="movement in filteredMovements" :key="movement.id" class="border-b dark:border-gray-700">

            <td class="px-3 py-2">
              {{ movement.type }}
            </td>

            <td class="px-3 py-2">
              {{ movement.description }}
            </td>

            <td class="px-3 py-2">
              {{ movement.amount }}
            </td>

            <td class="px-3 py-2">
              {{ movement.date }}
            </td>

            <td class="px-3 py-2">

              <button @click="removeMovement(movement.id)" class="text-red-500">
                Eliminar
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">

        <h3 class="text-xl font-bold mb-4">
          Crear Movimiento
        </h3>

        <div class="space-y-3">

          <select v-model="form.type" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
            <option value="INCOME">
              Ingreso
            </option>

            <option value="EXPENSE">
              Gasto
            </option>
          </select>

          <input v-model="form.description" placeholder="Descripción"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

          <input v-model.number="form.amount" type="number" placeholder="Monto"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

          <input v-model="form.date" type="date" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

        </div>

        <div class="flex justify-end gap-2 mt-6">

          <button @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-xl">
            Cancelar
          </button>

          <button @click="createMovement" class="px-4 py-2 bg-blue-500 text-white rounded-xl">
            Guardar
          </button>

        </div>

      </div>

    </div>

  </div>
</template>
