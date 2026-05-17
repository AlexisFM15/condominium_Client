<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  data: any[]
  columns: { key: string; label: string }[]
}>()

const emit = defineEmits(['create', 'update', 'delete'])

// 🔹 estado
const showModal = ref(false)
const isEditing = ref(false)
const selectedItem = ref<any>({})

const showDeleteConfirm = ref(false)
const itemToDelete = ref<any>(null)

const search = ref('')
const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const currentPage = ref(1)
const perPage = 10

// ✅ helper para nested keys
const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc: any, part: string) => {
    return acc?.[part]
  }, obj)
}

// 🔎 search
const filteredData = computed(() => {
  if (!search.value) return props.data

  return props.data.filter(item =>
    props.columns.some(col => {
      const value = getValue(item, col.key)

      return String(value ?? '')
        .toLowerCase()
        .includes(search.value.toLowerCase())
    })
  )
})

// 🔽 sorting
const sortedData = computed(() => {
  if (!sortKey.value) return filteredData.value

  return [...filteredData.value].sort((a, b) => {
    const aVal = getValue(a, sortKey.value)
    const bVal = getValue(b, sortKey.value)

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1

    return 0
  })
})

// 📄 paginación
const totalPages = computed(() =>
  Math.ceil(sortedData.value.length / perPage)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedData.value.slice(start, start + perPage)
})

// 🔁 reset page
watch([search, sortKey, sortOrder], () => {
  currentPage.value = 1
})

// 🔧 acciones
const openCreate = () => {
  selectedItem.value = {}
  isEditing.value = false
  showModal.value = true
}

const openEdit = (item: any) => {
  selectedItem.value = { ...item }
  isEditing.value = true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const submit = () => {
  if (isEditing.value) emit('update', selectedItem.value)
  else emit('create', selectedItem.value)

  closeModal()
}

// ❌ delete
const confirmDelete = (item: any) => {
  itemToDelete.value = item
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  itemToDelete.value = null
}

const executeDelete = () => {
  emit('delete', itemToDelete.value)
  cancelDelete()
}

// 🔽 sorting click
const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value =
      sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

    <!-- HEADER -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        Registros
      </h2>

      <button @click="openCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">
        + Crear
      </button>
    </div>

    <!-- SEARCH -->
    <input v-model="search" placeholder="Buscar..." class="w-full mb-3 border rounded-xl px-3 py-2 dark:bg-gray-700" />

    <!-- TABLA -->
    <table class="w-full text-sm">
      <thead>
        <tr class="text-left border-b dark:border-gray-700">
          <th v-for="col in columns" :key="col.key" @click="sortBy(col.key)" class="px-3 py-2 cursor-pointer">
            {{ col.label }}

            <span v-if="sortKey === col.key">
              {{ sortOrder === 'asc' ? '⬆️' : '⬇️' }}
            </span>
          </th>

          <th class="px-3 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in paginatedData" :key="item.id" class="border-b dark:border-gray-700">
          <td v-for="col in columns" :key="col.key" class="px-3 py-2">
            {{ getValue(item, col.key) }}
          </td>

          <td class="px-3 py-2 flex gap-2">
            <button @click="openEdit(item)" class="text-blue-500">
              Editar
            </button>

            <button @click="confirmDelete(item)" class="text-red-500">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINACIÓN -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <button @click="currentPage--" :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Anterior
      </button>

      <span>Página {{ currentPage }} / {{ totalPages }}</span>

      <button @click="currentPage++" :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Siguiente
      </button>
    </div>

    <!-- MODAL CREATE/EDIT -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">
          {{ isEditing ? 'Editar' : 'Crear' }}
        </h3>

        <div class="space-y-3">

          <input v-for="col in columns.filter(c => !c.key.includes('.'))" :key="col.key" v-model="selectedItem[col.key]"
            :placeholder="col.label" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700" />

        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>

          <button @click="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
    <!-- MODAL DELETE -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm">

        <h3 class="font-bold mb-4">Confirmar eliminación</h3>

        <p class="mb-4 text-sm">¿Seguro que deseas eliminar este registro?</p>

        <div class="flex justify-end gap-2">
          <button @click="cancelDelete" class="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>

          <button @click="executeDelete" class="px-4 py-2 bg-red-500 text-white rounded">
            Eliminar
          </button>
        </div>

      </div>
    </div>

  </div>
</template>
