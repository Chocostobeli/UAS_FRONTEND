const Pengajuan = require('../models/Pengajuan'); // Import model Sequelize
const path = require('path');
const fs = require('fs'); // Untuk memindahkan file

// Pastikan direktori 'uploads' ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

exports.createPengajuan = async (req, res) => {
  const {
    nama_ahli_waris, nik_ahli_waris, ttl_ahli_waris, alamat_ahli_waris, telepon_ahli_waris, email_ahli_waris,
    nama_pewaris, ktp_pewaris, tanggal_wafat_pewaris, alamat_terakhir_pewaris,
    jumlah_ahli_waris, nama_ahli_waris_lainnya,
    nama_saksi1, nik_saksi1, nama_saksi2, nik_saksi2,
    pernyataan_benar, opsi_pengiriman, nama_penerima, nomor_telepon_penerima, alamat_pengiriman
  } = req.body;

  // req.files akan tersedia jika express-fileupload digunakan
  const files = req.files || {};

  const filePaths = {};
  const allowedFileFields = [
    'foto_ktp_saksi1', 'foto_ktp_saksi2', 'surat_kematian',
    'ktp_ahli_waris_file', 'kartu_keluarga', 'surat_nikah',
    'akta_kelahiran', 'surat_kuasa', 'sertifikat_tanah', 'buku_tabungan'
  ];

  for (const fieldName of allowedFileFields) {
    if (files[fieldName]) {
      const file = files[fieldName];
      const fileName = `${Date.now()}_${file.name}`; // Buat nama file unik
      const uploadPath = path.join(uploadDir, fileName);

      try {
        await file.mv(uploadPath); // Pindahkan file
        filePaths[fieldName] = fileName; // Simpan nama file ke database
      } catch (err) {
        console.error(`Gagal upload ${fieldName}:`, err.message);
        return res.status(500).json({ error: `Gagal upload ${fieldName}: ${err.message}` });
      }
    } else {
      // Jika file wajib tidak ada, kembalikan error
      if (['foto_ktp_saksi1', 'surat_kematian', 'ktp_ahli_waris_file', 'kartu_keluarga'].includes(fieldName)) {
        return res.status(400).json({ error: `File ${fieldName} wajib diisi.` });
      }
      filePaths[fieldName] = null; // Set null untuk file opsional yang tidak diupload
    }
  }

  try {
    const newPengajuan = await Pengajuan.create({
      nama_ahli_waris,
      nik_ahli_waris,
      ttl_ahli_waris,
      alamat_ahli_waris,
      telepon_ahli_waris,
      email_ahli_waris,
      nama_pewaris,
      ktp_pewaris: ktp_pewaris || null, // Jika ada field ktp_pewaris dari form
      tanggal_wafat_pewaris,
      alamat_terakhir_pewaris,
      jumlah_ahli_waris,
      nama_ahli_waris_lainnya,
      nama_saksi1,
      nik_saksi1,
      foto_ktp_saksi1: filePaths.foto_ktp_saksi1,
      nama_saksi2,
      nik_saksi2,
      foto_ktp_saksi2: filePaths.foto_ktp_saksi2,
      surat_kematian: filePaths.surat_kematian,
      ktp_ahli_waris_file: filePaths.ktp_ahli_waris_file,
      kartu_keluarga: filePaths.kartu_keluarga,
      surat_nikah: filePaths.surat_nikah,
      akta_kelahiran: filePaths.akta_kelahiran,
      surat_kuasa: filePaths.surat_kuasa,
      sertifikat_tanah: filePaths.sertifikat_tanah,
      buku_tabungan: filePaths.buku_tabungan,
      pernyataan_benar,
      opsi_pengiriman,
      nama_penerima,
      nomor_telepon_penerima,
      alamat_pengiriman,
      status: 'pending',
    });
    res.status(201).json({ message: 'Pengajuan berhasil disimpan', data: newPengajuan });
  } catch (err) {
    console.error('Error creating pengajuan:', err.message);
    res.status(500).json({ error: 'Gagal menyimpan pengajuan', details: err.message });
  }
};

exports.getPengajuan = async (req, res) => {
  try {
    const pengajuanList = await Pengajuan.findAll({
      order: [['created_at', 'DESC']] // Urutkan berdasarkan created_at terbaru
    });
    res.json(pengajuanList);
  } catch (err) {
    console.error('Error fetching pengajuan:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data pengajuan', details: err.message });
  }
};