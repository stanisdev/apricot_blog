'use strict';

const { env } = process;

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: env.CI_DB_USERNAME,
    password: env.CI_DB_PASSWORD,
    database: env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: env.PROD_DB_USERNAME,
    password: env.PROD_DB_PASSWORD,
    database: env.PROD_DB_NAME,
    host: env.PROD_DB_HOSTNAME,
    port: env.PROD_DB_PORT,
    dialect: 'postgres',
  }
};