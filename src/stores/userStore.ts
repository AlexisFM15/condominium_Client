import { getDashboardAPI } from '@/api/user'
import { useUser } from '@/composable/useUser'
import type { createUserDTO, idUserDTO, updateUserDTO, userDTO } from '@/typings/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<userDTO[]>([])
  const dashboard = ref()

  const { getUserss, getOneUser, createUser, updateUsers, deleteUsers } = useUser()

  const fetchUser = async () => {
    users.value = await getUserss()
  }

  const getOne = async (id: idUserDTO) => {
    users.value = await getOneUser(id)
  }

  const createUserS = async (data: createUserDTO) => {
    await createUser(data)
    users.value.push({ ...data })
  }

  const updateUser = async (data: updateUserDTO) => {
    await updateUsers(data)
    users.value = users.value.filter((user) => user.id !== data.id)
    users.value.push({ ...data } as userDTO)
  }

  const deleteUser = async (id: idUserDTO) => {
    await deleteUsers(id)
    users.value = users.value.filter((user) => user.id !== id.id)
  }

  const getDashboard = async () => {
    dashboard.value = await getDashboardAPI()
    console.log(dashboard.value)
  }

  return { users, dashboard, fetchUser, getOne, createUserS, updateUser, deleteUser, getDashboard }
})
