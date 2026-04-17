import { getVotesAPI, getVoteAPI, createVoteAPI, updateVoteAPI, deleteVoteAPI } from '@/api/vote'
import type { createVoteDTO, idVoteDTO, updateVoteDTO } from '@/typings/vote'
import { ref } from 'vue'

export function useVote() {
  const loading = ref(false)

  const getVotess = async () => {
    loading.value = true
    const res = await getVotesAPI()
    loading.value = false
    return res
  }

  const getOneVote = async (id: idVoteDTO) => {
    loading.value = true
    const res = await getVoteAPI(id)
    loading.value = false
    return res
  }

  const createVote = async (data: createVoteDTO) => {
    loading.value = true
    const res = await createVoteAPI(data)
    loading.value = false
    return res
  }

  const updateVotes = async (data: updateVoteDTO) => {
    loading.value = true
    const res = await updateVoteAPI(data)
    loading.value = false
    return res
  }

  const deleteVotes = async (id: idVoteDTO) => {
    loading.value = true
    const res = await deleteVoteAPI(id)
    loading.value = false
    return res
  }

  return {
    getVotess,
    getOneVote,
    createVote,
    updateVotes,
    deleteVotes,
  }
}
