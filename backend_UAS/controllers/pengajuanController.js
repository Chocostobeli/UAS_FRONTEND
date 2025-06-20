const Pengajuan = require('../models/Pengajuan'); // Import model Sequelize untuk WNI
const PengajuanWna = require('../models/PengajuanWna'); // Import model Sequelize untuk WNA
const path = require('path');
const fs = require('fs');

// Pastikan direktori 'uploads' ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// --- Fungsi createPengajuan Anda yang sudah ada ---
exports.createPengajuan = async (req, res) => {
  const {
    nama_ahli_waris, nik_ahli_waris, ttl_ahli_waris, alamat_ahli_waris, telepon_ahli_waris, email_ahli_waris,
    nama_pewaris, ktp_pewaris, tanggal_wafat_pewaris, alamat_terakhir_pewaris,
    jumlah_ahli_waris, nama_ahli_waris_lainnya,
    nama_saksi1, nik_saksi1, nama_saksi2, nik_saksi2,
    pernyataan_benar, opsi_pengiriman, nama_penerima, nomor_telepon_penerima, alamat_pengiriman
  } = req.body;

  const files = req.files || {};

  const filePaths = {};
  const allowedFileFields = [
    'foto_ktp_saksi1', 'foto_ktp_saksi2', 'surat_kematian',
    'ktp_ahli_waris_file', 'kartu_keluarga', 'surat_nikah',
    'akta_kelahiran', 'surat_kuasa', 'sertifikat_tanah',
    'buku_tabungan',
    // Dokumen WNA
    'akta_kematian_pewaris', 'ktp_pemohon_wna', 'kartu_keluarga_wna',
    'akta_lahir_anak_wna', 'surat_nikah_pewaris_wna', 'surat_kuasa_ahli_waris_wna',
    'akta_hibah_wasiat_wna', 'sertifikat_tanah_wna', 'buku_tabungan_wna',
    'paspor_pewaris_wna', 'dokumen_imigrasi_wna'
  ];

  try {
    for (const field of allowedFileFields) {
      if (files[field] && files[field][0]) {
        const file = files[field][0];
        const newFileName = `${Date.now()}_${file.originalname}`;
        const newFilePath = path.join(uploadDir, newFileName);
        // Pindahkan file dari direktori temp ke direktori uploads utama
        fs.renameSync(file.path, newFilePath);
        filePaths[field] = `/uploads/${newFileName}`; // Simpan path relatif untuk database
      }
    }

    const newPengajuan = await Pengajuan.create({
      nama_ahli_waris, nik_ahli_waris, ttl_ahli_waris, alamat_ahli_waris, telepon_ahli_waris, email_ahli_waris,
      nama_pewaris, ktp_pewaris, tanggal_wafat_pewaris, alamat_terakhir_pewaris,
      jumlah_ahli_waris, nama_ahli_waris_lainnya,
      nama_saksi1, nik_saksi1,
      foto_ktp_saksi1: filePaths.foto_ktp_saksi1,
      nama_saksi2, nik_saksi2,
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
      status: 'pending', // Status awal
    });
    res.status(201).json({ message: 'Pengajuan berhasil disimpan', data: newPengajuan });
  } catch (err) {
    console.error('Error saat membuat pengajuan:', err);
    res.status(500).json({ message: 'Gagal membuat pengajuan', error: err.message });
  }
};

// --- Fungsi getPengajuan Anda yang sudah ada ---
exports.getPengajuan = async (req, res) => {
  try {
    const pengajuanList = await Pengajuan.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(pengajuanList);
  } catch (err) {
    console.error('Error fetching pengajuan:', err);
    res.status(500).json({ message: 'Gagal mengambil data pengajuan', error: err.message });
  }
};

// --- TAMBAHKAN FUNGSI BARU INI UNTUK UPDATE STATUS ---
exports.updatePengajuanStatus = async (req, res) => {
  const { id } = req.params; // ID dari URL, bisa berupa 'wni-1' atau 'wna-2'
  const { status } = req.body; // Status baru dari request body

  try {
    let numericId;
    let modelToUpdate;
    let category;

    if (id.startsWith('wni-')) {
      numericId = id.substring(4); // Hapus 'wni-'
      modelToUpdate = Pengajuan;
      category = 'WNI';
    } else if (id.startsWith('wna-')) {
      numericId = id.substring(4); // Hapus 'wna-'
      modelToUpdate = PengajuanWna;
      category = 'WNA';
    } else {
      // Jika tidak ada prefiks, asumsikan itu ID dari tabel WNI
      // Ini bisa terjadi jika Anda memiliki data lama tanpa prefiks
      numericId = id;
      modelToUpdate = Pengajuan;
      category = 'WNI (tanpa prefiks)';
    }

    let pengajuan = await modelToUpdate.findByPk(numericId);

    if (!pengajuan) {
      return res.status(404).json({ message: 'Pengajuan tidak ditemukan.' });
    }

    pengajuan.status = status;
    await pengajuan.save();

    res.json({
      message: `Status pengajuan ${category} dengan ID ${numericId} berhasil diperbarui`,
      pengajuan
    });

  } catch (error) {
    console.error('Error updating pengajuan status:', error);
    res.status(500).json({ message: 'Gagal memperbarui status pengajuan', error: error.message });
  }
};