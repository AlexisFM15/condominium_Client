<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { createMovementDTO, MovementDTO } from '../../typings/movement';

import type { MonthlyBalanceDTO } from '../../typings/monthlyBalance';

import {useMovementStore} from '../../stores/movementStore'

const props = defineProps<{
  balance: MonthlyBalanceDTO | null
  movements: MovementDTO[]
}>()


const emit = defineEmits<{
  (e: 'refresh'): void
}>()


const movementStore = useMovementStore()


const showModal = ref(false)

const showDelete = ref(false)

const selectedId = ref<number | null>(null)



const form = ref<createMovementDTO>({
  type: 'Ingreso',
  description: '',
  amount: 0,
  date: new Date(),
  monthlyBalanceId: props.balance?.id ?? 0,
})



watch(
  () => props.balance,
  (value) => {

    form.value.monthlyBalanceId =
      value.id ?? 0

  }
)



const columns = [
  {
    key: 'type',
    label: 'Tipo',
  },
  {
    key: 'description',
    label: 'Descripción',
  },
  {
    key: 'amount',
    label: 'Monto',
  },
  {
    key: 'date',
    label: 'Fecha',
  },
]



const filteredMovements = computed(() => {
   console.log('Balance ID:', props.balance?.id)


  return props.movements.filter(

    movement =>
      movement.monthly_balance?.id === props.balance?.id
  )
})



const totals = computed(() => {


  const income =
    filteredMovements.value
      .filter(
        movement =>
          movement.type === 'Ingreso'
      )
      .reduce(
        (sum, movement) =>
          sum + Number(movement.amount),
        0
      )


      const expense =
    filteredMovements.value
      .filter(
        movement =>
          movement.type === 'Gasto'
      )
      .reduce(
        (sum, movement) =>
          sum + Number(movement.amount),
        0
      )



  return {

    income,

    expense,

    total:
      income - expense,

  }

})

const resetForm = () => {

  form.value = {
    type: 'Ingreso',
    description: '',
    amount: 0,
    date: new Date(),
    monthlyBalanceId: props.balance?.id ?? 0,
  }

}



const createMovement = async () => {


  const payload: createMovementDTO = {

    type: form.value.type,

    description: form.value.description,

    amount: Number(form.value.amount),

    date: form.value.date,

    monthlyBalanceId:
      props.balance?.id ?? 0,

  }


  console.log(payload)

  await movementStore.createMovementS(payload)



  await movementStore.fetchMovement()



  emit('refresh')



  resetForm()



  showModal.value = false

}



const confirmDelete = (id: number) => {

  selectedId.value = id

  showDelete.value = true

}

console.log('Balance seleccionado:', props.balance)
console.log('Movimientos:', props.movements)


const removeMovement = async () => {


  if (!selectedId.value) return



  await movementStore.deleteMovement({

    id: selectedId.value,

  })



  await movementStore.fetchMovement()



  emit('refresh')



  selectedId.value = null

  showDelete.value = false

}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">

      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Movimientos
        </h2>

       <p v-if="props.balance">
  {{ props.balance.month }} {{ props.balance.year }}
</p>
      </div>


      <button
        @click="showModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        + Agregar Movimiento
      </button>

    </div>



    <!-- RESUMEN -->

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">


      <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">

        <p class="text-sm text-gray-500">
          Ingresos
        </p>

        <p class="text-xl font-bold text-green-500">
          {{ totals.income }}
        </p>

      </div>



      <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">

        <p class="text-sm text-gray-500">
          Gastos
        </p>

        <p class="text-xl font-bold text-red-500">
          {{ totals.expense }}
        </p>

      </div>



      <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">

        <p class="text-sm text-gray-500">
          Balance
        </p>

        <p class="text-xl font-bold">
          {{ totals.total }}
        </p>

      </div>


    </div>




    <!-- TABLA -->

    <div class="overflow-x-auto">


      <table class="w-full text-sm">


        <thead>

          <tr class="border-b dark:border-gray-700 text-left">


            <th
              v-for="column in columns"
              :key="column.key"
              class="px-3 py-2"
            >
              {{ column.label }}
            </th>


            <th class="px-3 py-2">
              Acciones
            </th>


          </tr>


        </thead>



        <tbody>


          <tr
            v-for="movement in filteredMovements"
            :key="movement.id"
            class="border-b dark:border-gray-700"
          >


            <td class="px-3 py-2">

              <span
                :class="
                  movement.type === 'INCOME'
                    ? 'text-green-500'
                    : 'text-red-500'
                "
              >
                {{ movement.type === 'INCOME'
                  ? 'Ingreso'
                  : 'Gasto'
                }}
              </span>

            </td>



            <td class="px-3 py-2">
              {{ movement.description }}
            </td>



            <td class="px-3 py-2">
              {{ movement.amount }}
            </td>



            <td class="px-3 py-2">
              {{ new Date(movement.date).toLocaleDateString() }}
            </td>



            <td class="px-3 py-2">

              <button
                @click="confirmDelete(movement.id!)"
                class="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>

            </td>



          </tr>



          <tr v-if="filteredMovements.length === 0">

            <td
              colspan="5"
              class="text-center py-5 text-gray-500"
            >
              No hay movimientos registrados
            </td>

          </tr>


        </tbody>


      </table>


    </div>





    <!-- MODAL CREAR MOVIMIENTO -->


    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >


      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
      >


        <h3 class="text-xl font-bold mb-5">
          Nuevo Movimiento
        </h3>



        <div class="space-y-4">



          <select
            v-model="form.type"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >

            <option value="Ingreso">
              Ingreso
            </option>

            <option value="Gasto">
              Gasto
            </option>


          </select>



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
            v-model="form.date"
            type="date"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />


        </div>




        <div class="flex justify-end gap-2 mt-6">


          <button
            @click="showModal = false"
            class="px-4 py-2 rounded bg-gray-300"
          >
            Cancelar
          </button>



          <button
            @click="createMovement"
            class="px-4 py-2 rounded bg-blue-500 text-white"
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
          ¿Desea eliminar este movimiento?
        </p>



        <div class="flex justify-end gap-2">


          <button
            @click="showDelete = false"
            class="px-4 py-2 rounded bg-gray-300"
          >
            Cancelar
          </button>



          <button
            @click="removeMovement"
            class="px-4 py-2 rounded bg-red-500 text-white"
          >
            Eliminar
          </button>


        </div>


      </div>


    </div>



  </div>
</template>
