const mysql = require('mysql2');

//mysql.connections or mysql.pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_app',
  password: 'root',
});

module.exports = pool.promise();
