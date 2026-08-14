export interface createMovementDTO {
  id?: number
  type: string
  description: string
  amount: number
  date: Date
  monthlyBalanceId: number
}

export interface updateMovementDTO {
  id?: number
  type?: string
  description?: string
  amount?: number
  date?: Date
  monthlyBalanceId?: number
}

export interface idMovementDTO {
  id: number
}

export interface MovementDTO {
  id?: number
  type: string
  description: string
  amount: number
  date: Date,
  monthly_balance:{
  id: number
  income: number
  expense: number
  year: string
  month: string
  total: number
  }
}
