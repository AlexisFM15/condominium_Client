export interface createUserDTO {
  id?: string
  name: string
  lastname: string
  phone: string
  email: string
  password: string
  role: string
  apartmentId: number
}

export interface updateUserDTO {
  id?: string
  name?: string
  lastname?: string
  phone?: string
  email?: string
  password?: string
  role?: string
  apartmentId: number
}

export interface idUserDTO {
  id: string
}

export interface userDTO {
  id?: string
  name: string
  lastname: string
  phone: string
  email: string
  password: string
  role: string
  apartmentId: number
}
