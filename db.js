const { Pool, Client } = require("pg");
require ("dotenv").config();
const Postgre = require('pg').Pool;

const connection = new Pool({
  user: process.env.host,
  host: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
})

connection.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

module.exports = connection;