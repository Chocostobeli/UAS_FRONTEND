// server.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // Import express-fileupload
const sequelizePengajuan = require('./config/databasePengajuan'); // Menggunakan nama variabel yang sama seperti db.js
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware untuk menangani upload file
app.use(fileUpload({
  createParentPath: true, // Membuat direktori parent jika belum ada
  limits: { fileSize: 50 * 1024 * 1024 }, // Batasan ukuran file 50MB
}));

// Sinkronkan database
sequelizePengajuan.sync({ alter: true }) // auto update tabel sesuai model
  .then(() => {
    console.log('Database disesuaikan!');
    // Hapus listen di sini, karena ada di bagian bawah
  })
  .catch(err => console.error('Gagal sync:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // endpoint: /api/auth/register dan /api/auth/login

// Rute lainnya...
const pengajuanRoutes = require('./routes/pengajuanRoutes');
app.use('/api/pengajuan', pengajuanRoutes);

const pengajuanWNARoutes = require('./routes/pengajuanWNA');
app.use('/api/pengajuan-wna', pengajuanWNARoutes);

// endpoint: PUT /api/profile
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/users', profileRoutes);

// Menampilkan file statis dari folder uploads
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
