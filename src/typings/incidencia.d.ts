export type IncidenciaEstado = 'abierta' | 'en_proceso' | 'resuelta'

export interface createIncidenciaDTO {
  id?: number
  title: string
  description: string
  condominiumId: number
}

export interface updateIncidenciaDTO {
  id?: number
  title?: string
  description?: string
  status?: IncidenciaEstado
}

export interface idIncidenciaDTO {
  id: number
}

export interface IncidenciaDTO {
  id?: number
  title: string
  description: string
  status: IncidenciaEstado
  condominium: {
    id: number
    name: string
    description: string
    latefee_amount: number
    time_limit_days: number
    invoicesDate: number
  }
  reportedBy: {
    id: number
    name?: string
    lastname?: string
  }
}
