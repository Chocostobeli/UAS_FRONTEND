const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseUser');

const User = sequelize.define('User', {
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING
}, {
  timestamps: true
});

module.exports = User;
