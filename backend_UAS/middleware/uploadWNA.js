// In a new file, e.g., middleware/uploadWNA.js
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // If you want to use UUID for filenames

const storageWNA = multer.diskStorage({
  destination: (req, file, cb) => {
    // Adjust the path based on where this file is relative to your 'uploads' directory.
    // If this file is in 'backend_UAS/middleware/', then '..' goes to 'backend_UAS/'.
    cb(null, path.join(__dirname, '..', 'uploads', 'wna'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.originalname); // Using timestamp + original name
    // Or using UUID: cb(null, uuidv4() + ext);
  },
});

// Create the Multer instance for WNA forms.
// Ensure all file fields from your PengajuanWNAPage are listed here.
const uploadWNA = multer({ storage: storageWNA }).fields([
  { name: 'foto_ktp_saksi1_wna', maxCount: 1 },
  { name: 'foto_ktp_saksi2_wna', maxCount: 1 },
  { name: 'surat_kematian_wna', maxCount: 1 },
  { name: 'ktp_ahli_waris_file_wna', maxCount: 1 },
  { name: 'kartu_keluarga_wna', maxCount: 1 },
  { name: 'surat_nikah_wna', maxCount: 1 },
  { name: 'akta_kelahiran_wna', maxCount: 1 },
  { name: 'surat_kuasa_wna', maxCount: 1 },
  { name: 'sertifikat_tanah_wna', maxCount: 1 },
  { name: 'buku_tabungan_wna', maxCount: 1 },
  { name: 'cek_wasiat_ahu', maxCount: 1 },
  { name: 'sppt_pbb', maxCount: 1 },
  // Add any other file fields that might be in your WNA form
]);

module.exports = uploadWNA;