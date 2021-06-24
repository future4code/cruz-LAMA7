import { default as knex, default as Knex } from 'knex'

export abstract class BaseRepository {
  private static connection: Knex | null = null

  protected getConnection(): Knex {
    if (!BaseRepository.connection) {
      BaseRepository.connection = knex({
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_NAME,
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
