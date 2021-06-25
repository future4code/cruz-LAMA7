import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { APIError } from '../../../services/APIError'
import { Authenticator } from '../../../services/Authenticator'
import { HashManager } from '../../../services/HashManager'
import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserResponseDTO,
  IAuthenticateUserValidDataDTO,
} from './AuthenticateUserDTO'
import { AuthenticateUserValidator } from './AuthenticateUserValidator'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private validator: AuthenticateUserValidator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  async execute(
    data: IAuthenticateUserRequestDTO
  ): Promise<IAuthenticateUserResponseDTO> {
    const message = 'Sucess!'
    const validData: IAuthenticateUserValidDataDTO =
      this.validator.validate(data)

    const userFromDB = await this.usersRepository.findByEmail(validData.email)

    if (!userFromDB) {
      throw APIError.notFound('Invalid email')
    }
    const validPassword = await this.hashManager.compare(
      validData.password,
      userFromDB.password
    )

    if (!validPassword) {
      throw APIError.wrongParams('Invalid password')
    }

    const token = this.authenticator.generateToken({
      id: userFromDB.id,
      role: userFromDB.role,
    })

    return { message, token }
  }
}
