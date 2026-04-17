export interface createMonthlyBalanceDTO {
  id?: number
  income: number
  expense: number
  year: string
  month: string
  total: number
}

export interface updateMonthlyBalanceDTO {
  id?: number
  income?: number
  expense?: number
  year?: string
  month?: string
  total?: number
}

export interface idMonthlyBalanceDTO {
  id: number
}

export interface MonthlyBalanceDTO {
  id?: number
  income: number
  expense: number
  year: string
  month: string
  total: number
}
