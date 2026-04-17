export interface createMovementDTO {
  id?: number
  type: string
  description: string
  amount: number
  date: date
  monthlyBalanceId: number
}

export interface updateMovementDTO {
  id?: number
  type?: string
  description?: string
  amount?: number
  date?: date
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
  date: date
  monthlyBalanceId: number
}
