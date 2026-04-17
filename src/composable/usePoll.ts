import { getPollsAPI, getPollAPI, createPollAPI, updatePollAPI, deletePollAPI } from '@/api/poll'
import type { createPollDTO, idPollDTO, updatePollDTO } from '@/typings/poll'
import { ref } from 'vue'

export function usePoll() {
  const loading = ref(false)

  const getPollss = async () => {
    loading.value = true
    const res = await getPollsAPI()
    loading.value = false
    return res
  }

  const getOnePoll = async (id: idPollDTO) => {
    loading.value = true
    const res = await getPollAPI(id)
    loading.value = false
    return res
  }

  const createPoll = async (data: createPollDTO) => {
    loading.value = true
    const res = await createPollAPI(data)
    loading.value = false
    return res
  }

  const updatePolls = async (data: updatePollDTO) => {
    loading.value = true
    const res = await updatePollAPI(data)
    loading.value = false
    return res
  }

  const deletePolls = async (id: idPollDTO) => {
    loading.value = true
    const res = await deletePollAPI(id)
    loading.value = false
    return res
  }

  return {
    getPollss,
    getOnePoll,
    createPoll,
    updatePolls,
    deletePolls,
  }
}
