const Sequelize = require('sequelize');

const seqDB = require('../utils/database');

const User = seqDB.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
