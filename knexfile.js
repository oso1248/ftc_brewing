module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection:'postgres://localhost/brew',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },
  
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },

  // requires oracledb as dependency
  oracleDB: {
    client: 'oracledb',
    connection: {
      host: process.env.ORACLE_HOST,
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      database: process.env.ORACLE_DATABASE,
    }

  }
}