export interface createUserDTO {
  id?: string
  name: string
  lastname: string
  phone: string
  email: string
  role: string
  balance: number
  apartmentId?: number
}

export interface updateUserDTO {
  id?: string
  name?: string
  lastname?: string
  phone?: string
  email?: string
  role?: string
  balance?: number
  apartmentId?: number
}

export interface idUserDTO {
  id: string
}

export interface userDTO {
  id?: string
  name: string
  lastname: string
  phone: string
  email: string
  balance: number
  password: string
  role: string
  apartment: {
    id: number
    number: number
    occupancyType: string
    rent: number
    lastGasMetric: number
    buildingId: number
    serviceCost: number
  }
}
