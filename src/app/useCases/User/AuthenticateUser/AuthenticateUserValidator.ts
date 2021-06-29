import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserValidDataDTO,
} from './AuthenticateUserDTO'

export class AuthenticateUserValidator {
  validate(data: IAuthenticateUserRequestDTO): IAuthenticateUserValidDataDTO {
    if (!data.email || !data.password) {
      throw new Error('Invalid Data')
    }
    return data
  }
}
