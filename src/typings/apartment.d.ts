export interface createApartmentDTO {
  id?: number
  number: number
  occupancyType: string
  rent: number
  lastGasMetric: number
  buildingId: number
  userId: string
}

export interface updateApartmentDTO {
  id?: number
  number?: number
  occupancyType?: string
  rent?: number
  lastGasMetric?: number
  buildingId?: number
  userId?: string
}

export interface idApartmentDTO {
  id: number
}

export interface ApartmentDTO {
  id?: number
  number: number
  occupancyType: string
  rent: number
  lastGasMetric: number
  buildingId: number
  userId: string
}
