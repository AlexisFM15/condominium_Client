<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CrudTable from '@/components/crudTable.vue'
import { useVoteStore } from '@/stores/voteStore'
import type { VoteDTO } from '@/typings/vote'

const useVote = useVoteStore()
const data = ref<VoteDTO[]>([])

console.log(data)
const columns = [
  {
    key: 'vote',
    label: 'Voto',
  },
  {
    key: 'userId',
    label: 'Usuario',
    type: 'select',
    endpoint: '/users',
    valueField: 'id',
    labelField: 'name',
    displayField: 'user.name',
    valueType: 'string', // UUID
  },
  {
    key: 'pollId',
    label: 'Votación',
    type: 'select',
    endpoint: '/polls',
    valueField: 'id',
    labelField: 'title',
    displayField: 'poll.title',
    valueType: 'number',
  },
]

const create = async (item: any) => {
  await useVote.createVoteS(item)
}

const update = async (item: any) => {
  await useVote.updateVote(item)
}

const remove = async (item: any) => {
  await useVote.deleteVote(item)
}

onMounted(async () => {
  await useVote.fetchVote()
  data.value = useVote.Votes
})
</script>

<template>
  <CrudTable :data="data" :columns="columns" @create="create" @update="update" @delete="remove" />
</template>
