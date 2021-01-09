module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: `postgresql://localhost/test?user=postgres&password=${process.env.DB_PASSWORD}`,
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
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
