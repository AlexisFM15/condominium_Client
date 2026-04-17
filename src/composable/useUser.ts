import { getUsersAPI, getUserAPI, createUserAPI, updateUserAPI, deleteUserAPI } from '@/api/user'
import type { createUserDTO, idUserDTO, updateUserDTO } from '@/typings/user'
import { ref } from 'vue'

export function useUser() {
  const loading = ref(false)

  const getUserss = async () => {
    loading.value = true
    const res = await getUsersAPI()
    loading.value = false
    return res
  }

  const getOneUser = async (id: idUserDTO) => {
    loading.value = true
    const res = await getUserAPI(id)
    loading.value = false
    return res
  }

  const createUser = async (data: createUserDTO) => {
    loading.value = true
    const res = await createUserAPI(data)
    loading.value = false
    return res
  }

  const updateUsers = async (data: updateUserDTO) => {
    loading.value = true
    const res = await updateUserAPI(data)
    loading.value = false
    return res
  }

  const deleteUsers = async (id: idUserDTO) => {
    loading.value = true
    const res = await deleteUserAPI(id)
    loading.value = false
    return res
  }

  return {
    getUserss,
    getOneUser,
    createUser,
    updateUsers,
    deleteUsers,
  }
}
