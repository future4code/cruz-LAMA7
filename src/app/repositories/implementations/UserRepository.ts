import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { BaseRepository } from './BaseRepository'

export class UserRepository extends BaseRepository implements IUsersRepository {
  private static TABLE_NAME = 'lama_usuarios'
  private connection = this.getConnection()
  private userTable = () => this.connection(UserRepository.TABLE_NAME)

  public async save(user: User): Promise<void> {
    try {
      await this.userTable().insert(user)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async findByEmail(email: string): Promise<User> {
    const result = await this.userTable().where({ email })

    if (result.length > 0) {
      return User.toUserModel(result[0])
    }

    return result[0]
  }

  public async find(id: string): Promise<User> {
    const result = await this.userTable().where({ id })

    if (result.length > 0) {
      return User.toUserModel(result[0])
    }

    return result[0]
  }

  public async destroy(): Promise<void> {
    this.destroy()
  }
}
