const Sequelize = require('sequelize');
const sequelizeDB = require('../utils/database');

const CartItem = sequelizeDB.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
