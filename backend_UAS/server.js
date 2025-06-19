// server.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelizePengajuan = require('./config/databasePengajuan');
const sequelizeUser = require('./config/databaseUser'); // Import database user
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware untuk menangani upload file
app.use(fileUpload({
  createParentPath: true, // Membuat direktori parent jika belum ada
  limits: { fileSize: 50 * 1024 * 1024 }, // Batasan ukuran file 50MB
}));

// Sinkronkan database Pengajuan
sequelizePengajuan.sync({ alter: true }) // auto update tabel sesuai model
  .then(() => {
    console.log('Database Pengajuan disesuaikan!');
  })
  .catch(err => console.error('Gagal sync database Pengajuan:', err));

// Sinkronkan database User
sequelizeUser.sync({ alter: true }) // auto update tabel sesuai model
  .then(() => {
    console.log('Database User disesuaikan!');
  })
  .catch(err => console.error('Gagal sync database User:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // endpoint: /api/register dan /api/login

const pengajuanRoutes = require('./routes/pengajuanRoutes');
app.use('/api/pengajuan', pengajuanRoutes);

const pengajuanWNARoutes = require('./routes/pengajuanWNA');
app.use('/api/pengajuan-wna', pengajuanWNARoutes);

const profileRoutes = require('./routes/profileRoutes');
app.use('/api/users', profileRoutes);

// Rute baru untuk Dashboard Pengajuan
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes); // Endpoint: /api/dashboard/submissions

// Menampilkan file statis dari folder uploads
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});