import { Show } from '../../../entities/Show'
import { IShowsRepository } from '../../../repositories/IShowsRepository'
import { IdGenerator } from '../../../services/IdGenerator'
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
  ICreateUserValidDataDTO,
} from './CreateUserDTO'
import { CreateUserValidator } from './CreateUserValidator'

export class CreateUserUseCase {
  constructor(
    private showsRepository: IShowsRepository,
    private validator: CreateUserValidator,
    private idGenerator: IdGenerator
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const message = 'Sucess!'
    const validData: ICreateUserValidDataDTO = this.validator.validate(data)

    const id = this.idGenerator.generate()

    const user = new Show(validData, id)
    this.showsRepository.save(user)

    return { message }
  }
}
