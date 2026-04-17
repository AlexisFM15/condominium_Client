export interface createBuildingDTO {
  id?: number
  name: string
  description: string
  serviceCost: number
  condominiumId: number
}

export interface updateBuildingDTO {
  id?: number
  name: string
  description: string
  serviceCost: number
  condominiumId?: number
}

export interface idBuildingDTO {
  id: number
}

export interface BuildingDTO {
  id?: number
  name: string
  description: string
  serviceCost: number
  condominiumId: number
}
