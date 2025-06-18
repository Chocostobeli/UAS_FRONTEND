// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/databaseUser');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync({ alter: true }) // auto update tabel sesuai model
  .then(() => {
    console.log('Database disesuaikan!');
    app.listen(5000, () => console.log('Server running at http://localhost:5000'));
  })
  .catch(err => console.error('Gagal sync:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

//  ROUTES
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

app.use('/uploads', express.static('uploads'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
