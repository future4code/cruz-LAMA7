export interface IAuthenticateUserRequestDTO {
  email: any
  password: any
}

export interface IAuthenticateUserValidDataDTO {
  email: string
  password: string
}

export interface IAuthenticateUserResponseDTO {
  message: string
  token: string
}
