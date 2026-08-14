export interface createAreaDTO {
  id?: number
  name: string
  description: string
  condominiumId: number
}

export interface updateAreaDTO {
  id?: number
  name?: string
  description?: string
  condominiumId?: number
}

export interface idAreaDTO {
  id: number
}

export interface AreaDTO {
  id?: number
  name: string
  description: string
  condominium: {
    id: number
    name: string
    description: string
    latefee_amount: number
    time_limit_days: number
    invoicesDate: number
  }
}
