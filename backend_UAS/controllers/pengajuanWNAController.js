const db = require('../db');
const path = require('path');

exports.createPengajuanWNA = (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO pengajuan_wna 
    (namaLengkap, nomorKTP, tempatTanggalLahir, alamatLengkap, nomorHP, email,
    aktaKematianPewaris, ktpAhliWaris, kartuKeluarga, aktaLahirAnakAhliWaris,
    suratNikahPewaris, suratKuasaAhliWaris, hasilPengecekanWasiatAHU,
    sertifikatHakMilik, spptPBBTerakhir, bukuTabungan, pernyataanBenar)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.namaLengkap,
    data.nomorKTP,
    data.tempatTanggalLahir,
    data.alamatLengkap,
    data.nomorHP,
    data.email,
    req.files?.aktaKematianPewaris?.name || '',
    req.files?.ktpAhliWaris?.name || '',
    req.files?.kartuKeluarga?.name || '',
    req.files?.aktaLahirAnakAhliWaris?.name || '',
    req.files?.suratNikahPewaris?.name || '',
    req.files?.suratKuasaAhliWaris?.name || '',
    req.files?.hasilPengecekanWasiatAHU?.name || '',
    req.files?.sertifikatHakMilik?.name || '',
    req.files?.spptPBBTerakhir?.name || '',
    req.files?.bukuTabungan?.name || '',
    data.pernyataanBenar === 'true'
  ];

  // Simpan file ke folder uploads
  Object.keys(req.files || {}).forEach((key) => {
    const file = req.files[key];
    const uploadPath = path.join(__dirname, '../uploads', file.name);
    file.mv(uploadPath, (err) => {
      if (err) console.error(`Gagal upload ${key}:`, err);
    });
  });

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Pengajuan WNA berhasil disimpan' });
  });
};

exports.getPengajuanWNA = (req, res) => {
  db.query('SELECT * FROM pengajuan_wna ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
