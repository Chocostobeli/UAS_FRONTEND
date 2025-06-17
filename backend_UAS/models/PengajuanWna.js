const { DataTypes } = require('sequelize');
const sequelize = require('../config/databasePengajuan');

const PengajuanWna = sequelize.define('pengajuan_wna', {
  nama: DataTypes.STRING,
  kewarganegaraan: DataTypes.STRING,
  // tambah sesuai kolom
}, {
  timestamps: true,
  tableName: 'pengajuan_wna'
});

module.exports = PengajuanWna;
