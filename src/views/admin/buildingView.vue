<script setup lang="ts">
import { computed, onMounted } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useBuildingStore } from '@/stores/buildingStore'
import type { BuildingDTO } from '@/typings/building'

const useBuilding = useBuildingStore()
const data = computed(() => useBuilding.Buildings)

const columns = [
  { key: 'name', label: 'Edificio' },
  { key: 'description', label: 'Descripción' },
  { key: 'serviceCost', label: 'Costo Servicio', type: 'number' },
  {
    key: 'condominiumId',
    label: 'Condominio',
    type: 'select',
    endpoint: '/condominiums',
    valueField: 'id',
    labelField: 'name',
    displayField: 'condominium.name',
  },
]

const create = async (item: any) => {
  await useBuilding.createBuildingS(item)
}

const update = async (item: any) => {
  await useBuilding.updateBuilding(item)
}

const remove = async (item: any) => {
  await useBuilding.deleteBuilding(item)
}

onMounted(async () => {
  await useBuilding.fetchBuilding()
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>