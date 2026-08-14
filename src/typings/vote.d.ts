export interface createVoteDTO {
  vote: string
  pollId: number
}

export interface updateVoteDTO {
  id?: number
  vote?: string
  userId?: string
  pollId?: number
}

export interface idVoteDTO {
  id: number
}

export interface VoteDTO {
  id?: number
  vote: string
  userId: string
  pollId: number
}
