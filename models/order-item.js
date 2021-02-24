const Sequelize = require('sequelize');
const sequelizeDB = require('../utils/database');

const OrderItem = sequelizeDB.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
