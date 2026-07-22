<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useUserStore } from '@/stores/userStore'
import type { userDTO } from '@/typings/user'

const useUser = useUserStore()
const data = ref<userDTO[]>([])

console.log(data)
const columns = [
  {
    key: 'name',
    label: 'Nombre',
  },
  {
    key: 'lastname',
    label: 'Apellido',
  },
  {
    key: 'phone',
    label: 'Teléfono',
  },
  {
    key: 'email',
    label: 'Correo',
  },
  {
    key: 'balance',
    label: 'Balance',
    type: 'number',
  },
  {
    key: 'role',
    label: 'Rol',
  },
  {
    key: 'apartmentId',
    label: 'Apartamento',
    type: 'select',
    endpoint: '/apartments',
    valueField: 'id',
    labelField: 'number',
    displayField: 'apartment.number',
    valueType: 'number', // importante si es number
  },
]

const create = async (item: any) => {
  await useUser.createUserS(item)
}

const update = async (item: any) => {
  await useUser.updateUser(item)
}

const remove = async (item: any) => {
  await useUser.deleteUser(item)
}

onMounted(async () => {
  await useUser.fetchUser()
  data.value = useUser.users
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
