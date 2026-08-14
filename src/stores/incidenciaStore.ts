import { useIncidencia } from '@/composable/useIncidencia'
import type {
  createIncidenciaDTO,
  idIncidenciaDTO,
  updateIncidenciaDTO,
  IncidenciaDTO,
} from '@/typings/incidencia'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIncidenciaStore = defineStore('incidencia', () => {
  const Incidencias = ref<IncidenciaDTO[]>([])

  const { getIncidenciass, getOneIncidencia, createIncidencia, updateIncidencias, deleteIncidencias } =
    useIncidencia()

  const fetchIncidencia = async () => {
    Incidencias.value = await getIncidenciass()
  }

  const getOne = async (id: idIncidenciaDTO) => {
    Incidencias.value = await getOneIncidencia(id)
  }

  const createIncidenciaS = async (data: createIncidenciaDTO) => {
    await createIncidencia(data)
    Incidencias.value.push({ ...data } as unknown as IncidenciaDTO)
  }

  const updateIncidencia = async (data: updateIncidenciaDTO) => {
    await updateIncidencias(data)
    Incidencias.value = Incidencias.value.filter((Incidencia) => Incidencia.id !== data.id)
    Incidencias.value.push({ ...data } as IncidenciaDTO)
  }

  const deleteIncidencia = async (id: idIncidenciaDTO) => {
    await deleteIncidencias(id)
  }

  return { Incidencias, fetchIncidencia, getOne, createIncidenciaS, updateIncidencia, deleteIncidencia }
})
