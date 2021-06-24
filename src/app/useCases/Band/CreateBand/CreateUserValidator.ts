import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserValidator {
  validate(data: ICreateUserRequestDTO) {
    if (!data.email || !data.name || !data.password || !data.role) {
      throw new Error('Invalid Data')
    }
    return data
  }
}
