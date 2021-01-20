export default {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      database: 'test',
      user: 'postgres',
      password: process.env.DB_PASSWORD
    },
    // connection: `postgresql://localhost/test?user=postgres&password=${process.env.DB_PASSWORD}`,
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
      extension: 'ts'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    }
  }
};
