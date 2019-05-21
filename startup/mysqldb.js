// mysqldb.js
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'monlook@123',
  database: 'MonLookDB'
})
module.exports = connection
