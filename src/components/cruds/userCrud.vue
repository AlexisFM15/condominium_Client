<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { userDTO, createUserDTO } from '@/typings/user'
import { useUserStore } from '@/stores/userStore'
import { useApartmentStore } from '@/stores/aparmentStore'

const userStore = useUserStore()
const apartmentStore = useApartmentStore()

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const sortKey = ref<keyof userDTO | ''>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const showModal = ref(false)
const isEditing = ref(false)
const showDelete = ref(false)

const form = ref<any>({
  name: '',
  lastname: '',
  phone: '',
  email: '',
  balance: 0,
  role: '',
  apartmentId: undefined,
})

const selectedId = ref<string | null>(null)

/* -------------------- DATA -------------------- */

const users = computed(() => userStore.users)
const apartments = computed(() => apartmentStore.Apartments)

/* -------------------- FILTER -------------------- */

const filtered = computed(() => {
  if (!search.value) return users.value

  return users.value.filter((u) =>
    Object.values(u).some((v) =>
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
    name: '',
    lastname: '',
    phone: '',
    email: '',
    balance: 0,
    role: '',
    apartmentId: undefined,
  }

  showModal.value = true
}

const openEdit = (item: userDTO) => {
  isEditing.value = true
  selectedId.value = item.id ?? null

  form.value = {
    name: item.name,
    lastname: item.lastname,
    phone: item.phone,
    email: item.email,
    role: item.role,
    balance: item.balance,
    apartmentId: item.apartment?.id,
  }

  showModal.value = true
}

const save = async () => {
  const payload: createUserDTO = {
    name: form.value.name,
    lastname: form.value.lastname,
    phone: form.value.phone,
    email: form.value.email,
    role: form.value.role,
    balance: form.value.balance,
    apartmentId: form.value.apartmentId,
  }

  if (!payload.apartmentId) {
    delete (payload as any).apartmentId
  }

  if (isEditing.value && selectedId.value) {
    await userStore.updateUser({
      ...payload,
      id: selectedId.value,
    })
  } else {
    await userStore.createUserS(payload)
  }

  showModal.value = false
}

const confirmDelete = (id: string) => {
  selectedId.value = id
  showDelete.value = true
}

const remove = async () => {
  if (!selectedId.value) return

  await userStore.deleteUser({
    id: selectedId.value,
  })

  showDelete.value = false
}

/* -------------------- INIT -------------------- */

onMounted(async () => {
  await userStore.fetchUser()
  await apartmentStore.fetchApartment()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <!-- HEADER -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Users</h2>

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
          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'name'">Nombre</th>

          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'lastname'">Apellido</th>

          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'phone'">Teléfono</th>

          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'email'">Email</th>

          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'role'">Rol</th>

          <th class="px-3 py-2 cursor-pointer" @click="sortKey = 'balance'">Balance</th>

          <th class="px-3 py-2">Apartamento</th>

          <th class="px-3 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in paginated" :key="u.id" class="border-b dark:border-gray-700">
          <td class="px-3 py-2">
            {{ u.name }}
          </td>

          <td class="px-3 py-2">
            {{ u.lastname }}
          </td>

          <td class="px-3 py-2">
            {{ u.phone }}
          </td>

          <td class="px-3 py-2">
            {{ u.email }}
          </td>

          <td class="px-3 py-2">
            {{ u.role }}
          </td>

          <td class="px-3 py-2">
            {{ u.balance }}
          </td>

          <td class="px-3 py-2">
            {{ u.apartment?.number ?? 'Sin apartamento' }}
          </td>

          <td class="px-3 py-2 flex gap-2">
            <button class="text-blue-500" @click="openEdit(u)">Editar</button>

            <button class="text-red-500" @click="confirmDelete(u.id!)">Eliminar</button>
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

      <span> {{ currentPage }} / {{ totalPages }} </span>

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
          {{ isEditing ? 'Editar Usuario' : 'Crear Usuario' }}
        </h3>

        <div class="space-y-3">
          <input
            v-model="form.name"
            placeholder="Nombre"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model="form.lastname"
            placeholder="Apellido"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model="form.phone"
            placeholder="Teléfono"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <input
            v-model="form.email"
            type="email"
            placeholder="Correo electrónico"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />
          <input
            v-model.number="form.balance"
            type="number"
            placeholder="Balance"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          />

          <select v-model="form.role" class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700">
            <option value="">Seleccione un rol</option>

            <option value="Administrador">Administrador</option>

            <option value="Condomino">Condomino</option>

            <option value="Operador">Operador</option>
          </select>

          <select
            v-model.number="form.apartmentId"
            class="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
          >
            <option :value="undefined">Sin apartamento</option>

            <option v-for="a in apartments" :key="a.id" :value="a.id">
              Apartamento {{ a.number }}
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
        <h3 class="font-bold mb-4">Eliminar Usuario</h3>

        <p class="mb-4 text-sm">¿Seguro que deseas eliminar este usuario?</p>

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
