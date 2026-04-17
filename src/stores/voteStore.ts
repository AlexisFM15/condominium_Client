import { useVote } from '@/composable/useVote'
import type { createVoteDTO, idVoteDTO, updateVoteDTO, VoteDTO } from '@/typings/vote'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVoteStore = defineStore('vote', () => {
  const Votes = ref<VoteDTO[]>([])

  const { getVotess, getOneVote, createVote, updateVotes, deleteVotes } = useVote()

  const fetchVote = async () => {
    Votes.value = await getVotess()
  }

  const getOne = async (id: idVoteDTO) => {
    Votes.value = await getOneVote(id)
  }

  const createVoteS = async (data: createVoteDTO) => {
    await createVote(data)
    Votes.value.push({ ...data })
  }

  const updateVote = async (data: updateVoteDTO) => {
    await updateVotes(data)
    Votes.value = Votes.value.filter((Vote) => Vote.id !== data.id)
    Votes.value.push({ ...data } as VoteDTO)
  }

  const deleteVote = async (id: idVoteDTO) => {
    await deleteVotes(id)
  }
  return { Votes, fetchVote, getOne, createVoteS, updateVote, deleteVote }
})
