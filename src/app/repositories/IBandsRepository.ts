import { Band } from '../entities/Band'

export interface IBandsRepository {
  save(band: Band): Promise<void>
  findById(id: string): Promise<Band>
  findByName(name: string): Promise<Band>
  destroy(): Promise<void>
}
