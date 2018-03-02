const fs = require('fs')

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'admin-demo',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect:  process.env.DB_DIALECT
  }
};