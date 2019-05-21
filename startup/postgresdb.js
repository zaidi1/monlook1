// mysqldb.js
// var Pool = require('pg').Pool
// var Client = require('pg').Client;
// const pool = new Pool({
//   host: '192.168.100.190',
//   database: 'MonlookDB',
//   user: 'monlook',
//   password: 'monlook123',
//   port: 5432
// })
// module.exports = pool

// mysqldb.js
var Pool = require('pg').Pool
var Client = require('pg').Client;
const pool = new Pool({
  host: '127.0.0.1',
  database: 'MonlookDB',
  user: 'postgres',
  password: 'postgres',
  // port: 5432
  port: 5433
})
module.exports = pool
