const { DataTypes } = require('sequelize');
const sequelizePengajuan = require('../config/databasePengajuan'); // Pastikan ini mengarah ke file db.js yang benar

const Pengajuan = sequelizePengajuan.define('Pengajuan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nama_ahli_waris: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nik_ahli_waris: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ttl_ahli_waris: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat_ahli_waris: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  telepon_ahli_waris: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_ahli_waris: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_pewaris: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ktp_pewaris: {
    type: DataTypes.STRING, // path file
    allowNull: true, // opsional
  },
  tanggal_wafat_pewaris: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  alamat_terakhir_pewaris: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  jumlah_ahli_waris: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nama_ahli_waris_lainnya: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nama_saksi1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nik_saksi1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto_ktp_saksi1: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  nama_saksi2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nik_saksi2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto_ktp_saksi2: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  surat_kematian: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  ktp_ahli_waris_file: { // Rename from ktp_ahli_waris to ktp_ahli_waris_file to avoid conflict with field above
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  kartu_keluarga: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  surat_nikah: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  akta_kelahiran: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  surat_kuasa: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  sertifikat_tanah: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  buku_tabungan: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  pernyataan_benar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  opsi_pengiriman: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_penerima: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomor_telepon_penerima: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat_pengiriman: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  tableName: 'pengajuan', // Pastikan nama tabel cocok dengan yang sudah ada
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
  createdAt: 'created_at', // Menyesuaikan nama kolom createdAt
  updatedAt: false // Tidak menggunakan updatedAt untuk saat ini
});

module.exports = Pengajuan;