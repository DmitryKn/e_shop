const Sequelize = require('sequelize');

//Connection
const sequelize = new Sequelize('node_app', 'root', 'root', {
  //dbname, accaunt, password
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
