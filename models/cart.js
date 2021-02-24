const Sequelize = require('sequelize');
const sequelizeDB = require('../utils/database');

const Cart = sequelizeDB.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
