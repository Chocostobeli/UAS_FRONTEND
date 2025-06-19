const express = require('express');
const router = express.Router();
const pengajuanController = require('../controllers/pengajuanController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Konfigurasi Multer (Pastikan ini ada dan sesuai) ---
const uploadTempDir = path.join(__dirname, '../uploads/temp');
if (!fs.existsSync(uploadTempDir)) {
  fs.mkdirSync(uploadTempDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadTempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// --- Rute POST untuk Membuat Pengajuan (existing code Anda) ---
router.post(
  '/',
  upload.fields([
    { name: 'foto_ktp_saksi1', maxCount: 1 },
    { name: 'foto_ktp_saksi2', maxCount: 1 },
    { name: 'surat_kematian', maxCount: 1 },
    { name: 'ktp_ahli_waris_file', maxCount: 1 },
    { name: 'kartu_keluarga', maxCount: 1 },
    { name: 'surat_nikah', maxCount: 1 },
    { name: 'akta_kelahiran', maxCount: 1 },
    { name: 'surat_kuasa', maxCount: 1 },
    { name: 'sertifikat_tanah', maxCount: 1 },
    { name: 'buku_tabungan', maxCount: 1 },
    // Dokumen WNA
    { name: 'akta_kematian_pewaris', maxCount: 1 },
    { name: 'ktp_pemohon_wna', maxCount: 1 },
    { name: 'kartu_keluarga_wna', maxCount: 1 },
    { name: 'akta_lahir_anak_wna', maxCount: 1 },
    { name: 'surat_nikah_pewaris_wna', maxCount: 1 },
    { name: 'surat_kuasa_ahli_waris_wna', maxCount: 1 },
    { name: 'akta_hibah_wasiat_wna', maxCount: 1 },
    { name: 'sertifikat_tanah_wna', maxCount: 1 },
    { name: 'buku_tabungan_wna', maxCount: 1 },
    { name: 'paspor_pewaris_wna', maxCount: 1 },
    { name: 'dokumen_imigrasi_wna', maxCount: 1 },
  ]),
  pengajuanController.createPengajuan
);

// --- Rute GET untuk Mendapatkan Pengajuan (existing code Anda) ---
router.get('/', pengajuanController.getPengajuan);


// --- TAMBAHKAN RUTE PUT INI UNTUK UPDATE STATUS ---
// Pastikan Anda juga mengimpor model PengajuanWna di pengajuanController
router.put('/:id', pengajuanController.updatePengajuanStatus);

module.exports = router;