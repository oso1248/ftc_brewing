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
    // connection: process.env.DATABASE_URL,
    connection: {
      user: 'kgjcmznzcykrau',
      password: 'd2bd6d314fbba1e197c7cbb2654d2f527213b3be3df38e43ce215dfb683bdee0',
      database: 'dsoqv0oii907c',
      port: 5432,
      host: 'ec2-54-205-183-19.compute-1.amazonaws.com',
      rejectUnauthorized: false,
    },
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
