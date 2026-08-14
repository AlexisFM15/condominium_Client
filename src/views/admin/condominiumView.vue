<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useCondominiumStore } from '@/stores/condominiumStore'
import type { CondominiumDTO } from '@/typings/condominium'

const useCondominum = useCondominiumStore()
const data = ref<CondominiumDTO[]>([])

console.log(data)
const columns = [
  {
    key: 'name',
    label: 'Condominio',
  },
  {
    key: 'description',
    label: 'Descripción',
  },
  {
    key: 'latefee_amount',
    label: 'Tasa Mora',
    type: 'number',
  },
  {
    key: 'time_limit_days',
    label: 'Plazo de Pago',
    type: 'number',
  },
  {
    key: 'promo',
    label: 'Promo',
    type: 'number',
  },
  {
    key: 'invoicesDate',
    label: 'Día de Factura',
    type: 'number',
  },
]

const create = async (item: any) => {
  await useCondominum.createCondominiumS(item)
}

const update = async (item: any) => {
  await useCondominum.updateCondominium(item)
}

const remove = async (item: any) => {
  await useCondominum.deleteCondominium(item)
}

onMounted(async () => {
  await useCondominum.fetchCondominium()
  data.value = useCondominum.Condominiums
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
