import { Band } from '../../entities/Band'
import { IBandsRepository } from '../IBandsRepository'
import { BaseRepository } from './BaseRepository'

export class BandRepository extends BaseRepository implements IBandsRepository {
  private static TABLE_NAME = 'lama_bandas'
  private connection = this.getConnection()
  private bandTable = () => this.connection(BandRepository.TABLE_NAME)

  public async save(band: Band): Promise<void> {
    try {
      await this.bandTable().insert(band)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async findById(id: string): Promise<Band> {
    const result = await this.bandTable().where({ id })

    if (result.length > 0) {
      return Band.toBandModel(result[0])
    }

    return result[0]
  }

  public async findByName(name: string): Promise<Band> {
    const result = await this.bandTable().where({ name })

    if (result.length > 0) {
      return Band.toBandModel(result[0])
    }

    return result[0]
  }

  public async destroy(): Promise<void> {
    this.destroy()
  }
}
