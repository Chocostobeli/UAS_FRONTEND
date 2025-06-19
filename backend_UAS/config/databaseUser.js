const { Sequelize } = require('sequelize');

const sequelizeUser = new Sequelize('uas_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelizeUser;