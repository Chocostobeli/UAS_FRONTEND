const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import route pengajuan umum
const pengajuanRoutes = require('./routes/pengajuanRoutes');
app.use('/api/pengajuan', pengajuanRoutes);

// ✅ Tambahkan route untuk pengajuan WNA
const pengajuanWNARoutes = require('./routes/pengajuanWNA');
app.use('/api/pengajuan-wna', pengajuanWNARoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
