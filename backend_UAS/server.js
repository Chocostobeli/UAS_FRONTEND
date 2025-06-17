// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});


// ✅ ROUTES
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // endpoint: /api/auth/register dan /api/auth/login

// Rute lainnya...
const pengajuanRoutes = require('./routes/pengajuanRoutes');
app.use('/api/pengajuan', pengajuanRoutes);

const pengajuanWNARoutes = require('./routes/pengajuanWNA');
app.use('/api/pengajuan-wna', pengajuanWNARoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
