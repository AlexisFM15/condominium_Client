import {
  getIncidenciasAPI,
  getIncidenciaAPI,
  createIncidenciaAPI,
  updateIncidenciaAPI,
  deleteIncidenciaAPI,
} from '@/api/incidencia'
import type { createIncidenciaDTO, idIncidenciaDTO, updateIncidenciaDTO } from '@/typings/incidencia'
import { ref } from 'vue'

export function useIncidencia() {
  const loading = ref(false)

  const getIncidenciass = async () => {
    loading.value = true
    const res = await getIncidenciasAPI()
    loading.value = false
    return res
  }

  const getOneIncidencia = async (id: idIncidenciaDTO) => {
    loading.value = true
    const res = await getIncidenciaAPI(id)
    loading.value = false
    return res
  }

  const createIncidencia = async (data: createIncidenciaDTO) => {
    loading.value = true
    const res = await createIncidenciaAPI(data)
    loading.value = false
    return res
  }

  const updateIncidencias = async (data: updateIncidenciaDTO) => {
    loading.value = true
    const res = await updateIncidenciaAPI(data)
    loading.value = false
    return res
  }

  const deleteIncidencias = async (id: idIncidenciaDTO) => {
    loading.value = true
    const res = await deleteIncidenciaAPI(id)
    loading.value = false
    return res
  }

  return {
    getIncidenciass,
    getOneIncidencia,
    createIncidencia,
    updateIncidencias,
    deleteIncidencias,
  }
}
