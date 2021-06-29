import { Show } from '../../entities/Show'
import { IShowsRepository } from '../IShowsRepository'
import { BaseRepository } from './BaseRepository'

export class ShowRepository extends BaseRepository implements IShowsRepository {
  private static TABLE_NAME = 'lama_shows'
  private connection = this.getConnection()
  private showTable = () => this.connection(ShowRepository.TABLE_NAME)

  public async save(show: Show): Promise<void> {
    try {
      await this.showTable().insert(show)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async findByDate(week_day: string): Promise<Array<Show>> {
    const result = await this.showTable().where({ week_day })

    if (result.length > 0) {
      return result.map((show) => {
        return Show.toShowModel(show)
      })
    }

    return result
  }

  public async destroy(): Promise<void> {
    this.destroy()
  }
}
