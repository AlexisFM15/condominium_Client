export interface createPaymentDTO {
  id?: number
  description: string
  amount: number
  reference: string
  payment_method: string
  payment_date: date
  paymentType: string
}

export interface createExtraPaymentDTO {
  id?: number
  description: string
  amount: number
  reference: string
  payment_method: string
  payment_date: date
  paymentType: string
  movementType: string
}

export interface updatePaymentDTO {
  id?: number
  description?: string
  amount?: number
  reference?: string
  payment_method?: string
  payment_date?: date
  paymentType?: string
}

export interface idPaymentDTO {
  id: number
}

export interface PaymentDTO {
  id?: number
  description: string
  amount: number
  reference: string
  payment_method: string
  payment_date: date
  paymentType: string
}
