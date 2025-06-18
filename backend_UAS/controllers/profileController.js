const User = require('../models/User');
const path = require('path');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil data profil', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { namaLengkap, email, whatsapp, alamat, ttl, jenisKelamin } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    user.fullName = namaLengkap;
    user.email = email;
    user.whatsapp = whatsapp;
    user.alamat = alamat;
    user.ttl = ttl;
    user.jenisKelamin = jenisKelamin;

    if (req.file) {
      user.foto = `/uploads/profileUser/${req.file.filename}`;
    }

    await user.save();

    res.json({ message: 'Profil berhasil diperbarui', user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui profil', error: error.message });
  }
};
