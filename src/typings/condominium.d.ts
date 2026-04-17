export interface createCondominiumDTO {
  id?: number
  name: string
  description: string
  latefee_amount: number
  time_limit_days: number
  invoicesDate: number
}

export interface updateCondominiumDTO {
  id?: number
  name?: string
  description?: string
  latefee_amount?: number
  time_limit_days?: number
  invoicesDate?: number
}

export interface idCondominiumDTO {
  id: number
}

export interface CondominiumDTO {
  id?: number
  name: string
  description: string
  latefee_amount: number
  time_limit_days: number
  invoicesDate: number
}
