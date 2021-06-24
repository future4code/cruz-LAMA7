import { UserRole } from '../../entities/User'

export interface ICreateUserRequestDTO {
  name: any
  email: any
  password: any
  role: any
}

export interface ICreateUserValidDataDTO {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface ICreateUserResponseDTO {
  message: string
  token: string
}
