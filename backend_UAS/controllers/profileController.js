// controllers/profileController.js
const User = require('../models/User'); // Pastikan path ini benar ke model User Sequelize Anda

exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
        console.error('Error in getProfile: req.user or req.user.id is missing.', req.user);
        return res.status(401).json({ message: 'Tidak terautentikasi: Informasi pengguna tidak tersedia.' });
    }
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Kecualikan password dari hasil
    });

    if (!user) {
      return res.status(404).json({ message: 'Profil pengguna tidak ditemukan' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Error saat getProfile di profileController:', err);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log('Mulai updateProfile...');
    console.log('req.user di updateProfile:', req.user); // Log req.user di sini
    console.log('req.body di updateProfile:', req.body); // Log req.body
    console.log('req.file di updateProfile:', req.file); // Log req.file (dari Multer)

    if (!req.user || !req.user.id) {
        console.error('Error in updateProfile: req.user or req.user.id is missing. Token might be invalid or not set.');
        return res.status(401).json({ message: 'Tidak terautentikasi: Informasi pengguna tidak tersedia.' });
    }

    let user = await User.findByPk(req.user.id);

    if (!user) {
      console.log(`User dengan ID ${req.user.id} tidak ditemukan.`);
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Siapkan objek untuk update
    const updateFields = {
      fullName: req.body.namaLengkap || user.fullName,
      email: req.body.email || user.email,
      whatsapp: req.body.whatsapp || user.whatsapp,
      alamat: req.body.alamat || user.alamat,
      ttl: req.body.ttl || user.ttl,
      jenisKelamin: req.body.jenisKelamin || user.jenisKelamin,
    };

    // Jika ada file foto yang diupload, tambahkan ke updateFields
    if (req.file) {
      // Pastikan path ini sesuai dengan MULTER destination di middleware/upload.js
      // Dari upload.js, destination Anda adalah 'uploads/profileUser'
      // dan filename adalah UUID + ext.
      // Jadi path yang benar di database adalah '/uploads/profileUser/namafile.ext'
      updateFields.foto = `/uploads/profileUser/${req.file.filename}`;
      console.log('Foto baru diatur:', updateFields.foto);
    } else {
        console.log('Tidak ada file foto baru yang diupload.');
    }

    // Lakukan update menggunakan metode .update() Sequelize
    await user.update(updateFields);

    // Ambil ulang data user yang sudah diupdate (tanpa password) untuk respons
    const updatedUser = await User.findByPk(user.id, {
        attributes: { exclude: ['password'] }
    });

    console.log('Profil pengguna berhasil diperbarui untuk ID:', updatedUser.id);
    res.json({ message: 'Profil pengguna berhasil diperbarui', user: updatedUser });
  } catch (err) {
    console.error('Error saat updateProfile di profileController:', err); // Log error lengkap
    res.status(500).send('Server Error');
  }
};

// Fungsi admin yang sebelumnya:
exports.getAdminProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Tidak terautentikasi: Informasi admin tidak tersedia.' });
    }
    const adminUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    // Asumsi admin juga disimpan di tabel User dengan kolom 'role'
    if (!adminUser || (adminUser.role !== 'admin' && adminUser.role !== 'notaris')) {
      return res.status(404).json({ message: 'Profil admin/notaris tidak ditemukan atau bukan admin/notaris' });
    }
    res.json({ admin: adminUser });
  } catch (err) {
    console.error('Error saat getAdminProfile di profileController:', err);
    res.status(500).send('Server Error');
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    console.log('Mulai updateAdminProfile...');
    console.log('req.user di updateAdminProfile:', req.user);
    console.log('req.body di updateAdminProfile:', req.body);
    console.log('req.file di updateAdminProfile:', req.file);

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Tidak terautentikasi: Informasi admin tidak tersedia.' });
    }

    let adminUser = await User.findByPk(req.user.id);
    if (!adminUser || (adminUser.role !== 'admin' && adminUser.role !== 'notaris')) {
      return res.status(404).json({ message: 'Admin/Notaris tidak ditemukan atau bukan admin/notaris' });
    }

    const updateFields = {
        fullName: req.body.namaLengkap || adminUser.fullName,
        email: req.body.email || adminUser.email,
        whatsapp: req.body.whatsapp || adminUser.whatsapp,
        alamat: req.body.alamat || adminUser.alamat,
        ttl: req.body.ttl || adminUser.ttl,
        jenisKelamin: req.body.jenisKelamin || adminUser.jenisKelamin,
    };

    if (req.file) {
      updateFields.foto = `/uploads/profileUser/${req.file.filename}`; // Pastikan path ini benar
      console.log('Foto admin baru diatur:', updateFields.foto);
    } else {
        console.log('Tidak ada file foto admin baru yang diupload.');
    }

    await adminUser.update(updateFields);

    const updatedAdminUser = await User.findByPk(adminUser.id, {
        attributes: { exclude: ['password'] }
    });

    console.log('Profil admin/notaris berhasil diperbarui untuk ID:', updatedAdminUser.id);
    res.json({ message: 'Profil admin/notaris berhasil diperbarui', admin: updatedAdminUser });
  } catch (err) {
    console.error('Error saat updateAdminProfile di profileController:', err);
    res.status(500).send('Server Error');
  }
};