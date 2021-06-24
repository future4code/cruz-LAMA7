import { User } from '../../entities/User'
import { IUsersReposity } from '../IUsersRepository'
import { BaseRepository } from './BaseRepository'

export class UserRepository extends BaseRepository implements IUsersReposity {
  private static TABLE_NAME = ''
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

    return User.toUserModel(result[0])
  }

  public async find(id: string): Promise<User> {
    const result = await this.userTable().where({ id })

    return User.toUserModel(result[0])
  }
}
