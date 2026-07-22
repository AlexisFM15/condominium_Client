<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAreaStore } from '@/stores/areaStore'
import { useCondominiumStore } from '@/stores/condominiumStore'
import type { AreaDTO, createAreaDTO } from '@/typings/area'

const areaStore = useAreaStore()
const condominiumStore = useCondominiumStore()

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const sortKey = ref<keyof AreaDTO | ''>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const showModal = ref(false)
const isEditing = ref(false)

const showDelete = ref(false)
const selectedId = ref<number | null>(null)

const form = ref({
  name: '',
  description: '',
  condominiumId: 0,
})

const areas = computed(() => areaStore.Areas)
const condominiums = computed(() => condominiumStore.Condominiums)

const filtered = computed(() => {
  if (!search.value) return areas.value

  return areas.value.filter((area: any) =>
    JSON.stringify(area).toLowerCase().includes(search.value.toLowerCase()),
  )
})

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

const totalPages = computed(() => Math.ceil(sorted.value.length / perPage))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sorted.value.slice(start, start + perPage)
})

watch(search, () => {
  currentPage.value = 1
})

const sortBy = (key: keyof AreaDTO) => {
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
    name: '',
    description: '',
    condominiumId: 0,
  }

  showModal.value = true
}

const openEdit = (area: any) => {
  console.log(area)
  isEditing.value = true
  selectedId.value = area.id

  form.value = {
    name: area.name,
    description: area.description,
    condominiumId: area.condominium?.id ?? area.condominiumId ?? 0,
  }

  console.log(form.value)
  showModal.value = true
}

const save = async () => {
  const payload: createAreaDTO = {
    name: form.value.name,
    description: form.value.description,
    condominiumId: Number(form.value.condominiumId),
  }

  console.log(payload)

  if (isEditing.value && selectedId.value) {
    await areaStore.updateArea({
      id: selectedId.value,
      ...payload,
    })
  } else {
    await areaStore.createAreaS(payload)
  }

  await areaStore.fetchArea()

  showModal.value = false
}

const confirmDelete = (id: number) => {
  selectedId.value = id
  showDelete.value = true
}

const remove = async () => {
  if (!selectedId.value) return

  await areaStore.deleteArea({
    id: selectedId.value,
  })

  await areaStore.fetchArea()

  showDelete.value = false
}

onMounted(async () => {
  await areaStore.fetchArea()
  await condominiumStore.fetchCondominium()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Áreas</h2>

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
          <th class="text-left px-3 py-2 cursor-pointer" @click="sortBy('name')">Nombre</th>

          <th class="text-left px-3 py-2">Descripción</th>

          <th class="text-left px-3 py-2">Condominio</th>

          <th class="text-left px-3 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="area in paginated" :key="area.id" class="border-b dark:border-gray-700">
          <td class="px-3 py-2">
            {{ area.name }}
          </td>

          <td class="px-3 py-2">
            {{ area.description }}
          </td>

          <td class="px-3 py-2">
            {{ area.condominium?.name }}
          </td>

          <td class="px-3 py-2 flex gap-2">
            <button @click="openEdit(area)" class="text-blue-500 hover:text-blue-700">
              Editar
            </button>

            <button @click="confirmDelete(area.id!)" class="text-red-500 hover:text-red-700">
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

    <!-- Modal -->

    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-5">
          {{ isEditing ? 'Editar Área' : 'Nueva Área' }}
        </h2>

        <div class="space-y-4">
          <input
            v-model="form.name"
            placeholder="Nombre"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <textarea
            v-model="form.description"
            placeholder="Descripción"
            rows="3"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <select
            v-model.number="form.condominiumId"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option :value="0">Seleccione un condominio</option>

            <option
              v-for="condominium in condominiums"
              :key="condominium.id"
              :value="condominium.id"
            >
              {{ condominium.name }}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-300">Cancelar</button>

          <button @click="save" class="px-4 py-2 rounded bg-blue-500 text-white">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Eliminar -->

    <div v-if="showDelete" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold mb-3">Confirmar eliminación</h3>

        <p class="mb-6">¿Desea eliminar esta área?</p>

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
