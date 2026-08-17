<script setup lang="ts">
import { usePollStore } from '@/stores/pollStore'
import { useVoteStore } from '@/stores/voteStore'
import type { PollDTO } from '@/typings/poll'
import { onMounted } from 'vue'

const usePoll = usePollStore()
const useVote = useVoteStore()

interface pollVote extends PollDTO {
  userVote: string
}

const vote = (item: pollVote, type: 'A favor' | 'En contra', pollId: number) => {
  if (item.userVote) return // selección única

  console.log('v', item.userVote)
  item.userVote = type

  if (type === 'A favor') item.votesFor++
  else item.votesAgainst++

  console.log(pollId)

  const newVote = {
    vote: type,
    pollId,
  }

  useVote.createVoteS(newVote)
}

const getPercentages = (item: pollVote) => {
  const total = item.votesFor + item.votesAgainst
  if (total === 0) return { forPct: 0, againstPct: 0 }

  return {
    forPct: Math.round((item.votesFor / total) * 100),
    againstPct: Math.round((item.votesAgainst / total) * 100),
  }
}

onMounted(async () => {
  await usePoll.fetchOpenPoll()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Encuestas</h1>

      <!-- SIN ENCUESTAS -->
      <div
        v-if="usePoll.Polls.length === 0"
        class="bg-white rounded-2xl shadow-md p-10 text-center"
      >
        <div class="text-5xl mb-4">📋</div>

        <h2 class="text-xl font-semibold text-gray-700 mb-2">No hay encuestas por el momento</h2>

        <p class="text-gray-500">Actualmente no hay ninguna encuesta abierta para votar.</p>
      </div>

      <!-- ENCUESTAS -->
      <div
        v-else
        v-for="voteItem in usePoll.Polls"
        :key="voteItem.id"
        class="bg-white rounded-2xl shadow-md p-6 mb-6"
      >
        <h2 class="text-xl font-semibold mb-2">{{ voteItem.title }}</h2>
        <p class="text-gray-600 mb-4">{{ voteItem.description }}</p>

        <!-- OPCIÓN A FAVOR -->
        <div
          @click="vote(voteItem, 'A favor', voteItem.id)"
          class="relative cursor-pointer mb-3 rounded-xl overflow-hidden border"
          :class="voteItem.userVote ? 'cursor-default' : 'hover:scale-[1.01] transition'"
        >
          <div
            class="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
            :style="{ width: getPercentages(voteItem).forPct + '%' }"
          ></div>

          <div class="relative flex justify-between px-4 py-3 font-medium">
            <span>A favor</span>

            <span v-if="voteItem.userVote"> {{ getPercentages(voteItem).forPct }}% </span>
          </div>
        </div>

        <!-- OPCIÓN EN CONTRA -->
        <div
          @click="vote(voteItem, 'En contra', voteItem.id)"
          class="relative cursor-pointer rounded-xl overflow-hidden border"
          :class="voteItem.userVote ? 'cursor-default' : 'hover:scale-[1.01] transition'"
        >
          <div
            class="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
            :style="{ width: getPercentages(voteItem).againstPct + '%' }"
          ></div>

          <div class="relative flex justify-between px-4 py-3 font-medium">
            <span>En contra</span>

            <span v-if="voteItem.userVote"> {{ getPercentages(voteItem).againstPct }}% </span>
          </div>
        </div>

        <!-- TOTAL -->
        <p v-if="voteItem.userVote" class="text-sm text-gray-500 mt-3">
          Total votos: {{ voteItem.votesFor + voteItem.votesAgainst }}
        </p>
      </div>
    </div>
  </div>
</template>
