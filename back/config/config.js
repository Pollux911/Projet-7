const fs = require('fs');
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'groupomania',
    host: '127.0.0.1',
    dialect: 'mysql'
  }}