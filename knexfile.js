module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: 'postgres://localhost/brew',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL + '?sslmode=require',
    ssl: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  // oracleDB: {
  //   client: 'oracledb',
  //   connection: {
  //     info: {
  //       role: '',
  //       SavePassword: 'false',
  //       OracleConnectionType: 'BASIC',
  //       PROXY_TYPE: 'USER NAME',
  //       RaptorConnectionType: 'Oracle',
  //       serviceName: 'orcl',
  //       customUrl: 'jdbc:oracle:thin:@//localhost:1521/orcl',
  //       oraDriverType: 'thin',
  //       NoPasswordConnection: 'TRUE',
  //       hostname: 'localhost',
  //       driver: 'oracle.jdbc.OracleDriver',
  //       port: '1521',
  //       subtype: 'oraJDBC',
  //       IS_PROXY: 'false',
  //       OS_AUTHENTICATION: 'false',
  //       KERBEROS_AUTHENTICATION: 'false',
  //       PROXY_USER_NAME: '',
  //       user: 'hr',
  //     },
  //     name: 'VirtualBox Oracle',
  //     type: 'jdbc',
  //   },
  // },
  oracleDB: {
    client: 'oracledb',
    connection: {
      host: 'jdbc:oracle:thin:@//localhost:1521/orcl',
      user: 'hr',
      password: 'oracle',
      database: 'orcl',
    },
  },
};
