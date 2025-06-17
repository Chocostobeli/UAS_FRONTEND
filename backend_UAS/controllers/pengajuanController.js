const db = require('../db');
const path = require('path');

exports.createPengajuan = (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO pengajuan 
    (nama, nik, ttl, alamat, telepon, email,
    namaPewaris, ktpPewaris, tanggalWafat, alamatTerakhirPewaris,
    jumlahAhliWaris, namaAhliWarisLainya, namaSaksi1,
    nikSaksi1, namaSaksi2, nikSaksi2, opsiPengiriman, namaPengiriman, nomorTeleponPengiriman, alamatPengiriman)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.nama,
    data.nik,
    data.ttl,
    data.alamat,
    data.telepon,
    data.email,
    data.namaPewaris,
    data.ktpPewaris,
    data.tanggalWafat,
    data.alamatTerakhirPewaris,
    data.jumlahAhliWaris,
    data.namaAhliWarisLainya,
    data.namaSaksi1,
    data.nikSaksi1,
    data.namaSaksi2,
    data.nikSaksi2,
    data.opsiPengiriman,
    data.namaPengiriman,
    data.nomorTeleponPengiriman,
    data.alamatPengiriman,
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
    res.status(201).json({ message: 'Pengajuan berhasil disimpan' });
  });
};

exports.getPengajuan = (req, res) => {
  db.query('SELECT * FROM pengajuan ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
