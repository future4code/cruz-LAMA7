import { BandRepository } from '../../../repositories/implementations/BandRepository'
import { Authenticator } from '../../../services/Authenticator'
import { IdGenerator } from '../../../services/IdGenerator'
import { CreateBandController } from './CreateBandController'
import { CreateBandUseCase } from './CreateBandUseCase'
import { CreateBandValidator } from './CreateBandValidator'

const bandsRepository = new BandRepository()
const createBandValidator = new CreateBandValidator()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

const createBandsUseCase = new CreateBandUseCase(
  bandsRepository,
  createBandValidator,
  idGenerator,
  authenticator
)

const createBandController = new CreateBandController(createBandsUseCase)

export { createBandsUseCase, createBandController }
