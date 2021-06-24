import dotenv from 'dotenv'
import { default as knex, default as Knex } from 'knex'

dotenv.config()

export abstract class BaseRepository {
  private static connection: Knex | null = null

  protected getConnection(): Knex {
    if (!BaseRepository.connection) {
      BaseRepository.connection = knex({
        client: 'mysql',
        connection: {
          host: String(process.env.DB_HOST),
          user: String(process.env.DB_USER),
          password: String(process.env.DB_PASSWORD),
          database: String(process.env.DB_SCHEMA),
          port: 3306,
          multipleStatements: true,
        },
      })
    }

    return BaseRepository.connection
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseRepository.connection) {
      await BaseRepository.connection.destroy()
      BaseRepository.connection = null
    }
  }
}
