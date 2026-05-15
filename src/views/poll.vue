<script setup lang="ts">
import { ref } from 'vue'

type VoteOption = 'for' | 'against' | null

type Vote = {
  id: number
  title: string
  description: string
  votesFor: number
  votesAgainst: number
  userVote: VoteOption
}

const votes = ref<Vote[]>([
  {
    id: 1,
    title: 'Instalar cámaras de seguridad',
    description: 'Propuesta para mejorar la seguridad del condominio.',
    votesFor: 10,
    votesAgainst: 2,
    userVote: null
  },
  {
    id: 2,
    title: 'Construir área de juegos',
    description: 'Crear un espacio para niños.',
    votesFor: 5,
    votesAgainst: 8,
    userVote: null
  }
])

const vote = (item: Vote, type: 'for' | 'against') => {
  if (item.userVote) return // selección única

  item.userVote = type

  if (type === 'for') item.votesFor++
  else item.votesAgainst++
}

const getPercentages = (item: Vote) => {
  const total = item.votesFor + item.votesAgainst
  if (total === 0) return { forPct: 0, againstPct: 0 }

  return {
    forPct: Math.round((item.votesFor / total) * 100),
    againstPct: Math.round((item.votesAgainst / total) * 100)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Encuestas</h1>

      <div v-for="voteItem in votes" :key="voteItem.id" class="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-2">{{ voteItem.title }}</h2>
        <p class="text-gray-600 mb-4">{{ voteItem.description }}</p>

        <!-- OPCIÓN A FAVOR -->
        <div @click="vote(voteItem, 'for')" class="relative cursor-pointer mb-3 rounded-xl overflow-hidden border"
          :class="voteItem.userVote ? 'cursor-default' : 'hover:scale-[1.01] transition'">
          <div class="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
            :style="{ width: getPercentages(voteItem).forPct + '%' }"></div>

          <div class="relative flex justify-between px-4 py-3 font-medium">
            <span>A favor</span>
            <span v-if="voteItem.userVote">
              {{ getPercentages(voteItem).forPct }}%
            </span>
          </div>
        </div>

        <!-- OPCIÓN EN CONTRA -->
        <div @click="vote(voteItem, 'against')" class="relative cursor-pointer rounded-xl overflow-hidden border"
          :class="voteItem.userVote ? 'cursor-default' : 'hover:scale-[1.01] transition'">
          <div class="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
            :style="{ width: getPercentages(voteItem).againstPct + '%' }"></div>

          <div class="relative flex justify-between px-4 py-3 font-medium">
            <span>En contra</span>
            <span v-if="voteItem.userVote">
              {{ getPercentages(voteItem).againstPct }}%
            </span>
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
