<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '../components/crudTable.vue'
import type { PollDTO } from '@/typings/poll'
import { usePollStore } from '@/stores/pollStore'

const usePoll = usePollStore()
const data = ref<PollDTO[]>([])

console.log(usePoll.Polls)
const columns = [
  {
    key: 'title',
    label: 'Título',
  },
  {
    key: 'description',
    label: 'Descripción',
  },
  {
    key: 'status',
    label: 'Estado',
  },
  {
    key: 'expires_at',
    label: 'Expira',
  },
  {
    key: 'votesFor',
    label: 'A favor',
    type: 'number',
  },
  {
    key: 'votesAgainst',
    label: 'En contra',
    type: 'number',
  },
  {
    key: 'userId',
    label: 'Usuario',
    type: 'select',
    valueType: 'string',
    endpoint: '/users',
    valueField: 'id',
    labelField: 'name',
    displayField: 'user.name',
  },
]

const create = async (item: any) => {
  await usePoll.createPollS(item)
}

const update = async (item: any) => {
  await usePoll.updatePoll(item)
}

const remove = async (item: any) => {
  await usePoll.deletePoll(item)
}

onMounted(async () => {
  await usePoll.fetchPoll()
  data.value = usePoll.Polls
  console.log(usePoll.Polls[0])
})
</script>

<template>
  <CrudTable
    :data="usePoll.Polls"
    :columns="columns"
    @create="create"
    @update="update"
    @delete="remove"
  />
</template>
