const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseUser');

const User = sequelize.define('User', {
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  foto: DataTypes.STRING, 
  whatsapp: DataTypes.STRING,
  alamat: DataTypes.STRING,
  ttl: DataTypes.STRING,
  jenisKelamin: DataTypes.STRING,
}, {
  timestamps: true
});

module.exports = User;