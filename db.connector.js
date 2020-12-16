var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ecommerce',
  password: 'ecommerce',
  database: 'ecommerce',
});

module.exports = connection;
