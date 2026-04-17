import { useApartment } from '@/composable/useApartment'
import type {
  createApartmentDTO,
  idApartmentDTO,
  updateApartmentDTO,
  ApartmentDTO,
} from '@/typings/apartment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApartmentStore = defineStore('apartment', () => {
  const Apartments = ref<ApartmentDTO[]>([])

  const { getApartmentss, getOneApartment, createApartment, updateApartments, deleteApartments } =
    useApartment()

  const fetchApartment = async () => {
    Apartments.value = await getApartmentss()
  }

  const getOne = async (id: idApartmentDTO) => {
    Apartments.value = await getOneApartment(id)
  }

  const createApartmentS = async (data: createApartmentDTO) => {
    await createApartment(data)
    Apartments.value.push({ ...data })
  }

  const updateApartment = async (data: updateApartmentDTO) => {
    await updateApartments(data)
    Apartments.value = Apartments.value.filter((Apartment) => Apartment.id !== data.id)
    Apartments.value.push({ ...data } as ApartmentDTO)
  }

  const deleteApartment = async (id: idApartmentDTO) => {
    await deleteApartments(id)
  }
  return { Apartments, fetchApartment, getOne, createApartmentS, updateApartment, deleteApartment }
})
