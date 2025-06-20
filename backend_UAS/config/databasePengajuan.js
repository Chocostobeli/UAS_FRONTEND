const { Sequelize } = require('sequelize');
// require('dotenv').config();

const sequelizePengajuan = new Sequelize('db_pengajuan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelizePengajuan;