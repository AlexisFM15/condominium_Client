<script setup lang="ts">
import { ref } from 'vue'
import CrudTable from '../components/crudTable.vue'

const data = ref([
  { id: 1, description: 'Cámaras de seguridad', status: 'ACTIVE' },
  { id: 2, description: 'Pintura del edificio', status: 'CLOSED' },
  { id: 3, description: 'Instalar portón eléctrico', status: 'ACTIVE' },
  { id: 4, description: 'Reparación de ascensor', status: 'ACTIVE' },
  { id: 5, description: 'Cambio de luces LED', status: 'CLOSED' },
  { id: 6, description: 'Seguridad nocturna', status: 'ACTIVE' },
  { id: 7, description: 'Área de juegos niños', status: 'ACTIVE' },
  { id: 8, description: 'Piscina mantenimiento', status: 'CLOSED' },
  { id: 9, description: 'Cámaras en parqueo', status: 'ACTIVE' },
  { id: 10, description: 'Remodelación lobby', status: 'ACTIVE' },
  { id: 11, description: 'Nuevo sistema basura', status: 'CLOSED' },
  { id: 12, description: 'Planta eléctrica', status: 'ACTIVE' },
  { id: 13, description: 'Control acceso QR', status: 'ACTIVE' },
  { id: 14, description: 'Seguridad biométrica', status: 'CLOSED' },
  { id: 15, description: 'Parqueo visitantes', status: 'ACTIVE' },
  { id: 16, description: 'Cámaras exteriores', status: 'ACTIVE' },
  { id: 17, description: 'Rejas perimetrales', status: 'CLOSED' },
  { id: 18, description: 'Sistema anti incendios', status: 'ACTIVE' },
  { id: 19, description: 'Internet comunitario', status: 'ACTIVE' },
  { id: 20, description: 'Área BBQ', status: 'CLOSED' },
  { id: 21, description: 'Cámaras en lobby', status: 'ACTIVE' },
  { id: 22, description: 'Reparación puertas', status: 'ACTIVE' },
  { id: 23, description: 'Sistema de riego', status: 'CLOSED' },
  { id: 24, description: 'Paneles solares', status: 'ACTIVE' },
  { id: 25, description: 'Ampliación gimnasio', status: 'ACTIVE' }
])

const columns = [
  { key: 'description', label: 'Descripción' },
  { key: 'status', label: 'Estado' }
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
