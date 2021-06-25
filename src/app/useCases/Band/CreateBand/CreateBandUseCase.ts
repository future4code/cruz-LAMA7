import { Band } from '../../../entities/Band'
import { UserRole } from '../../../entities/User'
import { IBandsRepository } from '../../../repositories/IBandsRepository'
import { APIError } from '../../../services/APIError'
import { Authenticator } from '../../../services/Authenticator'
import { IdGenerator } from '../../../services/IdGenerator'
import {
  ICreateBandRequestDTO,
  ICreateBandResponseDTO,
  ICreateBandValidDataDTO,
} from './CreateBandDTO'
import { CreateBandValidator } from './CreateBandValidator'

export class CreateBandUseCase {
  constructor(
    private bandsRepository: IBandsRepository,
    private validator: CreateBandValidator,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  async execute(data: ICreateBandRequestDTO): Promise<ICreateBandResponseDTO> {
    const message = 'Success!'
    const validData: ICreateBandValidDataDTO = this.validator.validate(data)
    const { role } = this.authenticator.getData(validData.token)

    if (role !== UserRole.ADMIN) {
      throw APIError.unauthorized()
    }

    const bandExists = await this.bandsRepository.findByName(validData.name)
    if (bandExists) {
      throw APIError.badRequest('Band name already exists')
    }

    const id = this.idGenerator.generate()

    const user = new Band({ ...validData }, id)
    await this.bandsRepository.save(user)

    return { message }
  }
}
