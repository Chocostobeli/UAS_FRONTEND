const Pengajuan = require('../models/PengajuanWna'); // Import model Sequelize
const path = require('path');
const fs = require('fs'); // Untuk memindahkan file

// Pastikan direktori 'uploads' ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

exports.createPengajuanWNA = async (req, res) => {
  const {
    nama_ahli_waris_wna, nik_ahli_waris_wna, ttl_ahli_waris_wna, alamat_ahli_waris_wna, telepon_ahli_waris_wna, email_ahli_waris_wna,
    nama_pewaris_wna, ktp_pewaris_wna, tanggal_wafat_pewaris_wna, alamat_terakhir_pewaris_wna,
    jumlah_ahli_waris_wna, nama_ahli_waris_lainnya_wna,
    nama_saksi1_wna, nik_saksi1_wna, nama_saksi2_wna, nik_saksi2_wna,
    pernyataan_benar_wna, opsi_pengiriman_wna, nama_penerima_wna, nomor_telepon_penerima_wna, alamat_pengiriman_wna
  } = req.body;

  // req.files akan tersedia jika express-fileupload digunakan
  const files = req.files || {};

  const filePaths = {};
  const allowedFileFields = [
    'foto_ktp_saksi1_wna', 'foto_ktp_saksi2_wna', 'surat_kematian_wna',
    'ktp_ahli_waris_file_wna', 'kartu_keluarga_wna', 'surat_nikah_wna',
    'akta_kelahiran_wna', 'surat_kuasa_wna', 'sertifikat_tanah_wna', 'buku_tabungan_wna', 'cek_wasiat_ahu', 'sppt_pbb'
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
      if (['foto_ktp_saksi1_wna', 'surat_kematian_wna', 'ktp_ahli_waris_file_wna', 'kartu_keluarga_wna'].includes(fieldName)) {
        return res.status(400).json({ error: `File ${fieldName} wajib diisi.` });
      }
      filePaths[fieldName] = null; // Set null untuk file opsional yang tidak diupload
    }
  }

  try {
    const newPengajuanWNA = await Pengajuan.create({
      nama_ahli_waris_wna,
      nik_ahli_waris_wna,
      ttl_ahli_waris_wna,
      alamat_ahli_waris_wna,
      telepon_ahli_waris_wna,
      email_ahli_waris_wna,
      nama_pewaris_wna,
      ktp_pewaris_wna: ktp_pewaris_wna || null, // Jika ada field ktp_pewaris dari form
      tanggal_wafat_pewaris_wna,
      alamat_terakhir_pewaris_wna,
      jumlah_ahli_waris_wna,
      nama_ahli_waris_lainnya_wna,
      nama_saksi1_wna,
      nik_saksi1_wna,
      foto_ktp_saksi1_wna: filePaths.foto_ktp_saksi1_wna,
      nama_saksi2_wna,
      nik_saksi2_wna,
      foto_ktp_saksi2_wna: filePaths.foto_ktp_saksi2_wna,
      surat_kematian_wna: filePaths.surat_kematian_wna,
      ktp_ahli_waris_file_wna: filePaths.ktp_ahli_waris_file_wna,
      kartu_keluarga_wna: filePaths.kartu_keluarga_wna,
      surat_nikah_wna: filePaths.surat_nikah_wna,
      akta_kelahiran_wna: filePaths.akta_kelahiran_wna,
      surat_kuasa_wna: filePaths.surat_kuasa_wna,
      sertifikat_tanah_wna: filePaths.sertifikat_tanah_wna,
      buku_tabungan_wna: filePaths.buku_tabungan_wna,
      cek_wasiat_ahu: filePaths.cek_wasiat_ahu, 
      sppt_pbb: filePaths.sppt_pbb,
      pernyataan_benar_wna,
      opsi_pengiriman_wna,
      nama_penerima_wna,
      nomor_telepon_penerima_wna,
      alamat_pengiriman_wna,
      status: 'pending',
    });
    res.status(201).json({ message: 'Pengajuan berhasil disimpan', data: newPengajuanWNA });
  } catch (err) {
    console.error('Error creating pengajuan:', err.message);
    res.status(500).json({ error: 'Gagal menyimpan pengajuan', details: err.message });
  }
};

exports.getPengajuanWNA = async (req, res) => {
  try {
    const pengajuanList = await Pengajuan.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(pengajuanList);
  } catch (err) {
    console.error('Error fetching pengajuan:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data pengajuan', details: err.message });
  }
};