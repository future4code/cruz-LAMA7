import { User } from '../../entities/User'
import { IUsersReposity } from '../../repositories/IUsersRepository'
import { Authenticator } from '../../services/Authenticator'
import { HashManager } from '../../services/HashManager'
import { IdGenerator } from '../../services/IdGenerator'
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
  ICreateUserValidDataDTO,
} from './CreateUserDTO'
import { CreateUserValidator } from './CreateUserValidator'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersReposity,
    private validator: CreateUserValidator,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const message = 'Sucess!'
    const validData: ICreateUserValidDataDTO = this.validator.validate(data)

    const id = this.idGenerator.generate()
    const passwordHash = await this.hashManager.hash(validData.password)

    const user = new User({ ...validData, password: passwordHash }, id)
    this.usersRepository.save(user)

    const token = this.authenticator.generateToken({
      id: user.id,
      role: user.role,
    })

    return { message, token }
  }
}
