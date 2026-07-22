export interface createScheduleAreaDTO {
  id?: number
  reservation_date: date
  start_time: string // formato HH:mm
  end_time: string // formato HH:mm
  status: string
  areaId: number
  userId: string
}

export interface updateScheduleAreaDTO {
  id?: number
  reservation_date?: date
  start_time?: string // formato HH:mm
  end_time?: string // formato HH:mm
  status?: string
  areaId?: number
  userId?: string
}

export interface idScheduleAreaDTO {
  id: number
}

export interface ScheduleAreaDTO {
  id?: number
  reservation_date: date
  start_time: string // formato HH:mm
  end_time: string // formato HH:mm
  status: string
  area: {
    id?: number
    name: string
    description: string
  }
  userId: string
}
