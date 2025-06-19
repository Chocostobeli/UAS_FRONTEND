// Assume you have a User model (e.g., Mongoose)
const User = require('../models/User'); // Or Admin model if separate

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Profil pengguna tidak ditemukan' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  // Logic for updating regular user profile
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Update fields
    user.fullName = req.body.namaLengkap || user.fullName;
    user.email = req.body.email || user.email;
    user.whatsapp = req.body.whatsapp || user.whatsapp;
    user.alamat = req.body.alamat || user.alamat;
    user.ttl = req.body.ttl || user.ttl;
    user.jenisKelamin = req.body.jenisKelamin || user.jenisKelamin;

    if (req.file) {
      // Handle file upload: save req.file.filename or path to user.foto
      user.foto = `/uploads/${req.file.filename}`; // Adjust path as per your multer config
    }

    await user.save();
    res.json({ message: 'Profil pengguna berhasil diperbarui', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAdminProfile = async (req, res) => {
  // Logic for fetching admin profile
  try {
    const adminUser = await User.findById(req.user.id).select('-password'); // Assuming admins are also in User model with a 'role'
    if (!adminUser || adminUser.role !== 'admin') { // Double-check role for safety
      return res.status(404).json({ message: 'Profil admin tidak ditemukan atau bukan admin' });
    }
    res.json({ admin: adminUser }); // Respond with 'admin' key as expected by frontend
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateAdminProfile = async (req, res) => {
  // Logic for updating admin profile (similar to updateProfile but for admin)
  try {
    let adminUser = await User.findById(req.user.id);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(404).json({ message: 'Admin tidak ditemukan atau bukan admin' });
    }

    // Update fields for admin
    adminUser.fullName = req.body.namaLengkap || adminUser.fullName;
    adminUser.email = req.body.email || adminUser.email;
    adminUser.whatsapp = req.body.whatsapp || adminUser.whatsapp;
    adminUser.alamat = req.body.alamat || adminUser.alamat;
    adminUser.ttl = req.body.ttl || adminUser.ttl;
    adminUser.jenisKelamin = req.body.jenisKelamin || adminUser.jenisKelamin;

    if (req.file) {
      adminUser.foto = `/uploads/${req.file.filename}`;
    }

    await adminUser.save();
    res.json({ message: 'Profil admin berhasil diperbarui', admin: adminUser }); // Respond with 'admin' key
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};