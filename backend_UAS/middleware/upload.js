// Di middleware/upload.js
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileUser'); // Folder tujuan upload
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Ambil ekstensi file
    cb(null, uuidv4() + ext); // Rename pakai UUID
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Batas ukuran file 10 MB
    fields: 20, // Batas jumlah bidang teks (misalnya, lebih dari jumlah input form Anda)
    files: 1 // Batas jumlah file yang diizinkan (sesuai dengan upload.single)
  }
});
module.exports = upload;