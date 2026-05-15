<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useApartmentStore } from '@/stores/aparmentStore'
import type { ApartmentDTO } from '@/typings/apartment'

// {
//   number: string,
//     occupancyType: string,
//       rent: number,
//         lastGasMetric: number,
//           buildingId: number,
//             userId: string
// }

const useAparmet = useApartmentStore()

console.log(useAparmet.Apartments)

const realData = ref<ApartmentDTO[]>([])


const columns = [
  { key: 'number', label: 'No.Apartamento' },
  { key: 'occupancyType', label: 'Tipo' },
  { key: 'lastGasMetric', label: 'Ultima lectura' },
  { key: `building.name`, label: 'No.Edificio' },
  { key: 'user.name', label: 'Usuario' }
]

const create = async (item: any) => {
  await useAparmet.createApartmentS(item)
}

const update = (item: any) => {

}

const remove = (item: any) => {
  data.value = data.value.filter(d => d.id !== item.id)
}

onMounted(async () => {
  await useAparmet.fetchApartment()
  realData.value = useAparmet.Apartments
})
</script>

<template>
  <CrudTable :data="realData" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
