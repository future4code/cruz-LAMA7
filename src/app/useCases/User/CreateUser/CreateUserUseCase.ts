import { User } from '../../../entities/User'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { APIError } from '../../../services/APIError'
import { Authenticator } from '../../../services/Authenticator'
import { HashManager } from '../../../services/HashManager'
import { IdGenerator } from '../../../services/IdGenerator'
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
  ICreateUserValidDataDTO,
} from './CreateUserDTO'
import { CreateUserValidator } from './CreateUserValidator'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private validator: CreateUserValidator,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const message = 'Sucess!'
    const validData: ICreateUserValidDataDTO = this.validator.validate(data)

    const emailExist = await this.usersRepository.findByEmail(validData.email)

    if (emailExist) {
      throw APIError.badRequest('Email already registered')
    }

    const id = this.idGenerator.generate()
    const passwordHash = await this.hashManager.hash(validData.password)

    const user = new User({ ...validData, password: passwordHash }, id)
    this.usersRepository.save(user)
    this.usersRepository.destroy()

    const token = this.authenticator.generateToken({
      id: user.id,
      role: user.role,
    })

    return { message, token }
  }
}
