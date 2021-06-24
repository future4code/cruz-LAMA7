import { User } from '../entities/User'

export interface IUsersReposity {
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User>
  find(id: string): Promise<User>
}
