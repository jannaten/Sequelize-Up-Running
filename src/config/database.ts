import { Sequelize, Options } from 'sequelize';
import { env } from './env';

const isTest = env.NODE_ENV === 'test';

const config: Options = isTest
  ? {
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    }
  : {
      dialect: 'postgres',
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      // eslint-disable-next-line no-console
      logging: env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30_000,
        idle: 10_000,
      },
    };

export const sequelize = new Sequelize(config);

/**
 * Verify the database connection is reachable.
 * Throws if the database is unreachable so the app fails fast at startup.
 */
export async function connectDatabase(): Promise<void> {
  await sequelize.authenticate();
}
