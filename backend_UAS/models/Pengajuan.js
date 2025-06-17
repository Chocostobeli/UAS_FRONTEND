const { DataTypes } = require('sequelize');
const sequelize = require('../config/databasePengajuan');

const Pengajuan = sequelize.define('pengajuan', {
  nama: DataTypes.STRING,
  alamat: DataTypes.STRING,
  // tambah sesuai kolom
}, {
  timestamps: true,
  tableName: 'pengajuan'
});

module.exports = Pengajuan;
