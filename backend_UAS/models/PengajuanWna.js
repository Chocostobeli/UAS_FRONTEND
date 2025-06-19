const { DataTypes } = require('sequelize');
const sequelizePengajuan = require('../config/databasePengajuan');

const PengajuanWna = sequelizePengajuan.define('pengajuan_wna', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },  
  nama_ahli_waris_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nik_ahli_waris_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ttl_ahli_waris_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat_ahli_waris_wna: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  telepon_ahli_waris_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_ahli_waris_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_pewaris_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ktp_pewaris_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true, // opsional
  },
  tanggal_wafat_pewaris_wna: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  alamat_terakhir_pewaris_wna: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  jumlah_ahli_waris_wna: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nama_ahli_waris_lainnya_wna: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nama_saksi1_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nik_saksi1_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto_ktp_saksi1_wna: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  nama_saksi2_wna: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nik_saksi2_wna: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto_ktp_saksi2_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  surat_kematian_wna: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  ktp_ahli_waris_file_wna: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  kartu_keluarga_wna: {
    type: DataTypes.STRING, // path file
    allowNull: false,
  },
  surat_nikah_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  akta_kelahiran_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  surat_kuasa_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  sertifikat_tanah_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  buku_tabungan_wna: {
    type: DataTypes.STRING, // path file
    allowNull: true,
  },
  cek_wasiat_ahu: {
 type: DataTypes.STRING, // path file
    allowNull: true,
  },
  sppt_pbb:{
 type: DataTypes.STRING, // path file
    allowNull: true,
  },
  pernyataan_benar_wna: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  opsi_pengiriman_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_penerima_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomor_telepon_penerima_wna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat_pengiriman_wna: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
  tableName: 'pengajuan_wna',
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = PengajuanWna;