<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useBuildingStore } from '@/stores/buildingStore'
import type { BuildingDTO } from '@/typings/building'

const useBuilding = useBuildingStore()
const data = ref<BuildingDTO[]>([])

const columns = [
  {
    key: 'name',
    label: 'Edificio',
  },
  {
    key: 'description',
    label: 'Descripción',
  },
  {
    key: 'serviceCost',
    label: 'Costo Servicio',
    type: 'number',
  },
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
  data.value = useBuilding.Buildings
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
