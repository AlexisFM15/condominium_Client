<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { ApartmentDTO, createApartmentDTO } from '@/typings/apartment'
import { useApartmentStore } from '@/stores/aparmentStore'
import { useBuildingStore } from '@/stores/buildingStore'
import { useUserStore } from '@/stores/userStore'

const apartmentStore = useApartmentStore()
const buildingStore = useBuildingStore()
const userStore = useUserStore()

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const sortKey = ref<keyof ApartmentDTO | ''>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const showModal = ref(false)
const isEditing = ref(false)
const showDelete = ref(false)

const form = ref<any>({
  number: 0,
  occupancyType: '',
  rent: 0,
  lastGasMetric: 0,
  buildingId: 0,
  serviceCost: 0,
  userId: '',
})

const selectedId = ref<number | null>(null)

/* -------------------- DATA -------------------- */

const apartments = computed(() => apartmentStore.Apartments)
const buildings = computed(() => buildingStore.Buildings)
const users = computed(() => userStore.users ?? [])

/* -------------------- FILTER -------------------- */

const filtered = computed(() => {
  if (!search.value) return apartments.value

  return apartments.value.filter((a) =>
    Object.values(a).some((v) =>
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
    number: 0,
    occupancyType: '',
    rent: 0,
    lastGasMetric: 0,
    buildingId: 0,
    serviceCost: 0,
    userId: '',
  }
  showModal.value = true
}

const openEdit = (item: ApartmentDTO) => {
  isEditing.value = true
  selectedId.value = item.id ?? null

  form.value = {
    number: item.number,
    occupancyType: item.occupancyType,
    rent: item.rent,
    lastGasMetric: item.lastGasMetric,
    serviceCost: item.serviceCost,
    buildingId: item.building?.id ?? 0,
    userId: item.user?.id ?? '',
  }

  showModal.value = true
}

const save = async () => {
  const payload: createApartmentDTO = {
    number: Number(form.value.number),
    occupancyType: form.value.occupancyType,
    rent: Number(form.value.rent),
    lastGasMetric: Number(form.value.lastGasMetric),
    buildingId: Number(form.value.buildingId),
    serviceCost: Number(form.value.serviceCost),
    userId: form.value.userId,
  }

  if (isEditing.value && selectedId.value) {
    await apartmentStore.updateApartment({
      ...payload,
      id: selectedId.value,
    })
  } else {
    await apartmentStore.createApartmentS(payload)
  }

  showModal.value = false
}

const confirmDelete = (id: number) => {
  selectedId.value = id
  showDelete.value = true
}

const remove = async () => {
  if (!selectedId.value) return
  await apartmentStore.deleteApartment({ id: selectedId.value })
  showDelete.value = false
}

/* -------------------- INIT -------------------- */

onMounted(async () => {
  await apartmentStore.fetchApartment()
  await buildingStore.fetchBuilding()
  await userStore.fetchUser()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <!-- HEADER -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Apartments</h2>

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
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'number'">Nº</th>
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'occupancyType'">Tipo</th>
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'rent'">Renta</th>
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'lastGasMetric'">Gas</th>
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'serviceCost'">Costo Servicio</th>
          <th class="px-3 py-2">Edificio</th>
          <th class="px-3 py-2">Usuario</th>
          <th class="px-3 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="a in paginated" :key="a.id" class="border-b dark:border-gray-700">
          <td class="px-3 py-2">{{ a.number }}</td>
          <td class="px-3 py-2">{{ a.occupancyType }}</td>
          <td class="px-3 py-2">{{ a.rent }}</td>
          <td class="px-3 py-2">{{ a.lastGasMetric }}</td>
          <td class="px-3 py-2">{{ a.serviceCost }}</td>
          <td class="px-3 py-2">{{ a.building?.name }}</td>
          <td class="px-3 py-2">{{ a.user?.name }} {{ a.user?.lastname }}</td>

          <td class="px-3 py-2 flex gap-2">
            <button class="text-blue-500" @click="openEdit(a)">Editar</button>

            <button class="text-red-500" @click="confirmDelete(a.id!)">Eliminar</button>
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
          {{ isEditing ? 'Editar' : 'Crear' }}
        </h3>

        <div class="space-y-3">
          <input
            v-model.number="form.number"
            type="number"
            placeholder="Número"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <select
            v-model="form.occupancyType"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option value="">Seleccione tipo</option>
            <option value="Propietario">Propietario</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Vacante">Vacante</option>
          </select>

          <input
            v-model.number="form.rent"
            type="number"
            placeholder="Renta"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model.number="form.lastGasMetric"
            type="number"
            placeholder="Gas"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model.number="form.serviceCost"
            type="number"
            placeholder="Costo Servicio"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <select
            v-model.number="form.buildingId"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option value="">Edificio</option>
            <option v-for="b in buildings" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>

          <select v-model="form.userId" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
            <option v-for="u in users" :key="u.id" :value="u.id">
              {{ u.name }} {{ u.lastname }}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="showModal = false">Cancelar</button>

          <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="save">Guardar</button>
        </div>
      </div>
    </div>

    <!-- DELETE -->
    <div v-if="showDelete" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm">
        <h3 class="font-bold mb-4">Eliminar</h3>

        <p class="mb-4 text-sm">¿Seguro que deseas eliminar?</p>

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
