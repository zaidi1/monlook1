// msdb.js
var mssql = require('mssql')
var config = {
  user: 'admin',
  password: '123',
  server: '192.168.100.30',
  database: 'KnwanDB'
}
module.exports = { mssql, config }
