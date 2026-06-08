import { getOpenPollAPI } from '@/api/poll'
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
    await updatePolls(data)
    Polls.value = Polls.value.filter((Poll) => Poll.id !== data.id)
    Polls.value.push({ ...data } as PollDTO)
  }

  const deletePoll = async (id: idPollDTO) => {
    await deletePolls(id)
  }

  const fetchOpenPoll = async () => {
    Polls.value = await getOpenPollAPI()
  }
  return { Polls, fetchPoll, getOne, createPollS, updatePoll, deletePoll, fetchOpenPoll }
})
