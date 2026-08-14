export interface createBillDTO {
  id?: number
  amount: number
  status: string
  due_date: date
  year: string
  month: string
  gas_pic: string
  apartmentId: number
  gas_metric: number
  gas_total: number
  credited_amount: number
  latefee?: number
  lateFeeStatus?: boolean
}

export interface updateBillDTO {
  id?: number
  amount?: number
  status?: string
  due_date?: date
  year?: string
  month?: string
  gas_pic?: string
  apartmentId?: number
  gas_metric?: number
  latefee?: number
  lateFeeStatus?: boolean
}

export interface idBillDTO {
  id: number
}

export interface BillDTO {
  id?: number
  amount: number
  status: string
  due_date: date
  year: string
  month: string
  gas_pic: string
  gas_total: number
  credited_amount: number
  apartment: {
    id?: number
    number: number
    occupancyType: string
    rent: number
    lastGasMetric: number
    serviceCost?: number
  }
  gas_metric: number
  latefee?: number
  lateFeeStatus?: boolean
}

export interface sendBillDTO {
  status: string
  gas_pic: string
  gasMetric: number
}
