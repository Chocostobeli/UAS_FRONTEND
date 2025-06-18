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

const upload = multer({ storage });
module.exports = upload;
