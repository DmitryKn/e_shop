const Sequelize = require('sequelize');
const sequelizeDB = require('../utils/database');

const Order = sequelizeDB.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
