const Pengajuan = require('../models/Pengajuan'); // Menggunakan model Pengajuan
const PengajuanWna = require('../models/PengajuanWna'); // Menggunakan model PengajuanWNA

// Fungsi untuk mengambil semua pengajuan berdasarkan email pengguna
exports.getUserSubmissions = async (req, res) => {
  // Email pengguna diambil dari req.user yang diset oleh authMiddleware
  const userEmail = req.user.email; // Ambil email dari token yang login

  if (!userEmail) {
    return res.status(400).json({ message: 'Email pengguna tidak ditemukan di token.' });
  }

  try {
    // Ambil pengajuan dari tabel 'pengajuan' (WNI)
    const pengajuanWNI = await Pengajuan.findAll({
      where: { email_ahli_waris: userEmail },
      attributes: [
        'id',
        'nama_ahli_waris',
        'email_ahli_waris',
        'status',
        'created_at',
      ],
      order: [['created_at', 'DESC']]
    });

    // Ambil pengajuan dari tabel 'pengajuan_wna'
    const pengajuanWNA = await PengajuanWna.findAll({
      where: { email_ahli_waris_wna: userEmail },
      attributes: [
        'id',
        'nama_ahli_waris_wna',
        'email_ahli_waris_wna',
        'status',
        'created_at',
      ],
      order: [['created_at', 'DESC']]
    });

    // Gabungkan dan format hasilnya
    const combinedSubmissions = [];

    pengajuanWNI.forEach(item => {
      combinedSubmissions.push({
        id: item.id,
        nama: item.nama_ahli_waris,
        email: item.email_ahli_waris,
        kategori: 'Pengajuan surat WNI',
        tanggal: item.created_at,
        status: item.status,
      });
    });

    pengajuanWNA.forEach(item => {
      combinedSubmissions.push({
        id: item.id,
        nama: item.nama_ahli_waris_wna,
        email: item.email_ahli_waris_wna,
        kategori: 'Pengajuan surat WNI Tionghoa & Negara Asing',
        tanggal: item.created_at,
        status: item.status,
      });
    });

    // Urutkan semua pengajuan berdasarkan tanggal terbaru
    combinedSubmissions.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    res.json(combinedSubmissions);

  } catch (error) {
    console.error('Error fetching user submissions:', error);
    res.status(500).json({ message: 'Gagal mengambil data pengajuan.', error: error.message });
  }
};