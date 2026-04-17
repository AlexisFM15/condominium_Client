export interface createPollDTO {
  id?: number
  description: string
  expires_at: date
  poll_result?: number
  status: string
  userId: string
}

export interface updatePollDTO {
  id?: number
  description?: string
  expires_at?: date
  poll_result?: number
  status?: string
  userId?: string
}

export interface idPollDTO {
  id: number
}

export interface PollDTO {
  id?: number
  description: string
  expires_at: date
  poll_result?: number
  status: string
  userId: string
}
