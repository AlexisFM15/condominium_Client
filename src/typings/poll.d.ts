export interface createPollDTO {
  id?: number
  description: string
  title: string
  expires_at: date
  votesFor: number
  votesAgainst: number
  status: string
  userId: string
}

export interface updatePollDTO {
  id?: number
  title?: string
  description?: string
  expires_at?: date
  votesFor?: number
  votesAgainst?: number
  status?: string
  userId?: string
}

export interface idPollDTO {
  id: number
}

export interface PollDTO {
  id?: number
  title?: string
  description: string
  expires_at: date
  votesFor: number
  votesAgainst: number
  status: string
  userId: string
}
