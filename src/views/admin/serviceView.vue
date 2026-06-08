<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useServiceStore } from '@/stores/serviceStore'
import type { ServiceDTO } from '@/typings/service'

const useService = useServiceStore()
const data = ref<ServiceDTO[]>([])

console.log(data)
const columns = [
  { key: 'name', label: 'Servicio' },
  { key: 'description', label: 'Descripción' },
]

const create = async (item: any) => {
  await useService.createServiceS(item)
}

const update = async (item: any) => {
  await useService.updateService(item)
}

const remove = async (item: any) => {
  await useService.deleteService(item)
}

onMounted(async () => {
  await useService.fetchService()
  data.value = useService.Services
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
