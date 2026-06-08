<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '../components/crudTable.vue'
import type { PollDTO } from '@/typings/poll'
import { usePollStore } from '@/stores/pollStore'

const usePoll = usePollStore()
const data = ref<PollDTO[]>([])

const columns = [
  { key: 'description', label: 'Descripción' },
  { key: 'status', label: 'Estado' },
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
