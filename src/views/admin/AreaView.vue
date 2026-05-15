<script setup lang="ts">
import { ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'

const data = ref([
  {
    id: 11,
    name: 'Area piscina',
    description: '24 metros, picisna, bbq',
    condominiumId: 1
  }
])

const columns = [
  { key: 'name', label: 'Área' },
  { key: 'description', label: 'Descripción' },
  { key: 'condominiumId', label: 'Condominio' },
]

const create = (item: any) => {
  data.value.push({ ...item, id: Date.now() })
}

const update = (item: any) => {
  const i = data.value.findIndex(d => d.id === item.id)
  data.value[i] = item
}

const remove = (item: any) => {
  data.value = data.value.filter(d => d.id !== item.id)
}
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
