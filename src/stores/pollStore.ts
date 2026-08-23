import { closePoll, getOpenPollAPI } from '@/api/poll'
import { usePoll } from '@/composable/usePoll'
import type { createPollDTO, idPollDTO, updatePollDTO, PollDTO } from '@/typings/poll'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePollStore = defineStore('poll', () => {
  const Polls = ref<PollDTO[]>([])

  const { getPollss, getOnePoll, createPoll, updatePolls, deletePolls } = usePoll()

  const fetchPoll = async () => {
    Polls.value = await getPollss()
  }

  const getOne = async (id: idPollDTO) => {
    Polls.value = await getOnePoll(id)
  }

  const createPollS = async (data: createPollDTO) => {
    await createPoll(data)
    Polls.value.push({ ...data })
  }

  const updatePoll = async (data: updatePollDTO) => {
    const poll = await updatePolls(data)

    const index = Polls.value.findIndex((item) => item.id === data.id)

    if (index !== -1) {
      Polls.value[index] = poll
    }
  }

  const deletePoll = async (id: idPollDTO) => {
    await deletePolls(id)
  }

  const fetchOpenPoll = async () => {
    Polls.value = await getOpenPollAPI()
    console.log(Polls)
  }

  const closePollS = async (id: number) => {
    const poll = await closePoll(id)

    const index = Polls.value.findIndex((item) => item.id === id)

    if (index !== -1) {
      Polls.value[index] = poll
    }

    return poll
  }
  return {
    Polls,
    fetchPoll,
    getOne,
    createPollS,
    updatePoll,
    deletePoll,
    fetchOpenPoll,
    closePollS,
  }
})
