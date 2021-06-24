import { Show } from '../entities/Show'

export interface IShowsRepository {
  save(show: Show): Promise<void>
  findByDate(week_day: string): Promise<Array<Show>>
  destroy(): Promise<void>
}
