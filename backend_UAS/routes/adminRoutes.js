const express = require('express');
const router = express.Router();
const PengajuanWNI = require('../models/Pengajuan'); // Ini adalah model untuk pengajuan WNI
const PengajuanWna = require('../models/PengajuanWna'); // Ini adalah model untuk pengajuan WNA
const User = require('../models/User'); // Import your existing User model
const authenticateToken = require('../middleware/authmiddleware'); // Import your authentication middleware
const path = require('path'); // Node.js built-in module for path manipulation
const fs = require('fs');     // Node.js built-in module for file system operations
const authorizeAdmin = (req, res, next) => {
    // req.user harus tersedia dari authenticateToken middleware
    if (req.user && (req.user.role === 'admin' || req.user.role === 'notaris')) {
        next(); // Lanjutkan jika peran adalah 'admin' atau 'notaris'
    } else {
        res.status(403).json({ message: 'Akses ditolak: Hanya admin atau notaris yang diizinkan.' });
    }
};
router.get('/pengajuan', async (req, res) => {
  try {
    // Ambil semua pengajuan WNI
    const wniPengajuan = await PengajuanWNI.findAll({
      order: [['created_at', 'DESC']], // Urutkan berdasarkan tanggal terbaru
    });

    // Ambil semua pengajuan WNA
    const wnaPengajuan = await PengajuanWna.findAll({
      order: [['created_at', 'DESC']], // Urutkan berdasarkan tanggal terbaru
    });

    // Gabungkan dan format data dari kedua tabel
    const combinedPengajuan = [
      ...wniPengajuan.map(item => ({
        id: `wni-${item.id}`, // Beri ID unik untuk frontend, contoh: 'wni-1'
        tipePengajuan: 'WNI',
        namaPemohon: item.nama_ahli_waris, // Atau kolom yang sesuai untuk nama pemohon
        status: item.status,
        tanggal: new Date(item.created_at).toISOString().split('T')[0], // Format YYYY-MM-DD
        // Anda juga perlu menyertakan semua detail lain yang dibutuhkan oleh ModalDetail
        // Contoh:
        namaLengkapAhliWaris: item.nama_ahli_waris,
        nomorKTP: item.nomor_ktp,
        tempatTanggalLahir: item.tempat_tanggal_lahir,
        alamatLengkap: item.alamat_lengkap,
        nomorHP: item.nomor_hp,
        email: item.email,
        namaLengkapPewaris: item.nama_pewaris,
        tanggalWafatPewaris: item.tanggal_wafat_pewaris,
        alamatTerakhirPewaris: item.alamat_terakhir_pewaris,
        jumlahAhliWarisLainnya: item.jumlah_ahli_waris_lainnya,
        namaAhliWarisLainnya: item.nama_ahli_waris_lainnya,
        namaSaksi1: item.nama_saksi_1,
        nikSaksi1: item.nik_saksi_1,
        fotoKtpSaksi1: item.foto_ktp_saksi_1,
        namaSaksi2: item.nama_saksi_2,
        nikSaksi2: item.nik_saksi_2,
        fotoKtpSaksi2: item.foto_ktp_saksi_2,

        dokumenWNI_SuratKematian: item.dokumen_surat_kematian,
        dokumenWNI_KtpAhliWaris: item.dokumen_ktp_ahli_waris,
        dokumenWNI_KartuKeluarga: item.dokumen_kartu_keluarga,
        dokumenWNI_SuratNikah: item.dokumen_surat_nikah,
        dokumenWNI_AktaLahir: item.dokumen_akta_lahir,
        dokumenWNI_SuratKuasaAhliWaris: item.dokumen_surat_kuasa_ahli_waris,
        dokumenWNI_SertifikatTanahRumah: item.dokumen_sertifikat_tanah_rumah,
        dokumenWNI_BukuTabungan: item.dokumen_buku_tabungan,

        // Kosongkan dokumen WNA karena ini pengajuan WNI
        dokumenWNA_AktaKematianPewaris: '',
        dokumenWNA_KtpPemohon: '',
        dokumenWNA_KartuKeluarga: '',
        dokumenWNA_AktaLahirAnak: '',
        dokumenWNA_SuratNikahPewaris: '',
        dokumenWNA_SuratKuasaAhliWarisLain: '',
        dokumenWNA_HasilPengecekanWasiatAHU: '',
        dokumenWNA_SertifikatHakMilik: '',
        dokumenWNA_SPPT_PBBTerakhir: '',
        dokumenWNA_BukuTabunganPewaris: '',
      })),
      ...wnaPengajuan.map(item => ({
        id: `wna-${item.id}`, // Beri ID unik, contoh: 'wna-1'
        tipePengajuan: 'WNI Tionghoa & Asing',
        namaPemohon: item.nama_ahli_waris_wna, // Atau kolom yang sesuai
        status: item.status,
        tanggal: new Date(item.created_at).toISOString().split('T')[0],
        // Semua detail lain untuk WNA:
        namaLengkapAhliWaris: item.nama_ahli_waris_wna,
        nomorKTP: item.nomor_ktp_wna,
        tempatTanggalLahir: item.tempat_tanggal_lahir_wna,
        alamatLengkap: item.alamat_lengkap_wna,
        nomorHP: item.nomor_hp_wna,
        email: item.email_wna,
        namaLengkapPewaris: item.nama_pewaris_wna,
        tanggalWafatPewaris: item.tanggal_wafat_pewaris_wna,
        alamatTerakhirPewaris: item.alamat_terakhir_pewaris_wna,
        jumlahAhliWarisLainnya: item.jumlah_ahli_waris_lainnya_wna,
        namaAhliWarisLainnya: item.nama_ahli_waris_lainnya_wna,
        namaSaksi1: item.nama_saksi1_wna,
        nikSaksi1: item.nik_saksi1_wna,
        fotoKtpSaksi1: item.foto_ktp_saksi1_wna,
        namaSaksi2: item.nama_saksi2_wna,
        nikSaksi2: item.nik_saksi2_wna,
        fotoKtpSaksi2: item.foto_ktp_saksi2_wna,

        // Kosongkan dokumen WNI
        dokumenWNI_SuratKematian: '',
        dokumenWNI_KtpAhliWaris: '',
        dokumenWNI_KartuKeluarga: '',
        dokumenWNI_SuratNikah: '',
        dokumenWNI_AktaLahir: '',
        dokumenWNI_SuratKuasaAhliWaris: '',
        dokumenWNI_SertifikatTanahRumah: '',
        dokumenWNI_BukuTabungan: '',

        dokumenWNA_AktaKematianPewaris: item.dokumen_akta_kematian_pewaris_wna,
        dokumenWNA_KtpPemohon: item.dokumen_ktp_pemohon_wna,
        dokumenWNA_KartuKeluarga: item.dokumen_kartu_keluarga_wna,
        dokumenWNA_AktaLahirAnak: item.dokumen_akta_lahir_anak_wna,
        dokumenWNA_SuratNikahPewaris: item.dokumen_surat_nikah_pewaris_wna,
        dokumenWNA_SuratKuasaAhliWarisLain: item.dokumen_surat_kuasa_ahli_waris_lain_wna,
        dokumenWNA_HasilPengecekanWasiatAHU: item.dokumen_hasil_pengecekan_wasiat_ahu_wna,
        dokumenWNA_SertifikatHakMilik: item.dokumen_sertifikat_hak_milik_wna,
        dokumenWNA_SPPT_PBBTerakhir: item.dokumen_sppt_pbb_terakhir_wna,
        dokumenWNA_BukuTabunganPewaris: item.dokumen_buku_tabungan_pewaris_wna,
      }))
    ];

    // Urutkan gabungan pengajuan berdasarkan tanggal/waktu terbaru
    combinedPengajuan.sort((a, b) => {
      const dateA = new Date(`${a.tanggal} ${a.waktu}`); // Anda tidak memiliki 'waktu' di sini
      const dateB = new Date(`${b.tanggal} ${b.waktu}`); // Anda tidak memiliki 'waktu' di sini
      // Sebaiknya sorting berdasarkan created_at langsung dari database jika sudah diambil
      // Atau pastikan Anda menambahkan kolom 'waktu' saat mapping
      return new Date(b.created_at) - new Date(a.created_at); // Contoh sorting berdasarkan created_at asli
    });


    res.json(combinedPengajuan);
  } catch (error) {
    console.error('Error fetching admin pengajuan:', error);
    res.status(500).json({ message: 'Gagal mengambil data pengajuan.', error: error.message });
  }
});


// Rute untuk memperbarui status pengajuan
// Ini akan diakses sebagai PUT /api/admin/pengajuan/:id/status
router.put('/pengajuan/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status diperlukan.' });
    }

    // Pisahkan ID dan tipe pengajuan (wni/wna)
    const [tipe, actualId] = id.split('-');

    let updatedPengajuan;
    if (tipe === 'wni') {
      [updatedPengajuan] = await PengajuanWNI.update(
        { status: status },
        { where: { id: actualId } }
      );
    } else if (tipe === 'wna') {
      [updatedPengajuan] = await PengajuanWna.update(
        { status: status },
        { where: { id: actualId } }
      );
    } else {
      return res.status(400).json({ message: 'Tipe pengajuan tidak valid.' });
    }

    if (updatedPengajuan === 0) {
      return res.status(404).json({ message: 'Pengajuan tidak ditemukan atau status tidak berubah.' });
    }

    res.json({ message: 'Status pengajuan berhasil diperbarui.' });

  } catch (error) {
    console.error('Error updating pengajuan status:', error);
    res.status(500).json({ message: 'Gagal memperbarui status pengajuan.', error: error.message });
  }
});


// Rute untuk mendapatkan semua riwayat aktivitas (untuk halaman AdminRiwayat.js)
// Ini akan diakses sebagai GET /api/admin/riwayat
router.get('/riwayat', async (req, res) => {
  try {
    const wniRiwayat = await PengajuanWNI.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'nama_ahli_waris',
        'status',
        'created_at',
      ]
    });

    const wnaRiwayat = await PengajuanWna.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'nama_ahli_waris_wna',
        'status',
        'created_at',
      ]
    });

    const combinedRiwayat = [
      ...wniRiwayat.map(item => ({
        id: `wni-${item.id}`,
        nama: item.nama_ahli_waris,
        kegiatan: 'Pengajuan Surat Keterangan Ahli Waris',
        kategori: 'WNI', // <-- PERBAIKI DI SINI: Tetapkan langsung 'WNI'
        tanggal: new Date(item.created_at).toISOString().split('T')[0],
        waktu: new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: item.status,
      })),
      ...wnaRiwayat.map(item => ({
        id: `wna-${item.id}`,
        nama: item.nama_ahli_waris_wna,
        kegiatan: 'Pengajuan Surat Keterangan Ahli Waris',
        kategori: 'WNA', // <-- PERBAIKI DI SINI: Tetapkan langsung 'WNA'
        tanggal: new Date(item.created_at).toISOString().split('T')[0],
        waktu: new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: item.status,
      }))
    ];

    combinedRiwayat.sort((a, b) => {
      // Sorting berdasarkan created_at asli untuk akurasi
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA; // Terbaru di atas
    });

    res.json(combinedRiwayat);
  } catch (error) {
    console.error('Error fetching admin riwayat:', error);
    res.status(500).json({ message: 'Gagal mengambil riwayat aktivitas.', error: error.message });
  }
});

// --- ADMIN PROFILE ROUTES ---
// Route to get admin profile
// This route will be accessed as GET /api/admin/profile
router.get('/profile', authenticateToken, authorizeAdmin, async (req, res) => { // <<< APPLIED MIDDLEWARE
    try {
        // req.user will contain the decoded token payload (e.g., { id: 'user_uuid', role: 'admin' })
        const adminId = req.user.id; // Get ID from the authenticated user
        const admin = await User.findByPk(adminId, { // Use User model
            attributes: { exclude: ['password'] } // Exclude password from the result
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        // Return the user object, potentially renamed as 'admin' for frontend consistency
        res.status(200).json({ admin: admin });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ message: 'Server error when fetching admin profile.' });
    }
});

// Route to update admin profile
// This route will be accessed as PUT /api/admin/profile
router.put('/profile', authenticateToken, authorizeAdmin, async (req, res) => { // <<< APPLIED MIDDLEWARE
    try {
        const adminId = req.user.id; // Get ID from the authenticated user
        const { fullName, email, whatsapp, alamat, ttl, jenisKelamin } = req.body;

        const admin = await User.findByPk(adminId); // Use User model
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        // Handle file upload if a new photo is provided
        let fotoPath = admin.foto; // Keep existing photo path by default

        if (req.files && req.files.foto) {
            const fotoFile = req.files.foto;
            const uploadDir = path.join(__dirname, '../uploads/admin_photos');

            // Create directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Generate a unique filename to prevent conflicts
            const fileName = `${Date.now()}_${fotoFile.name}`;
            const filePath = path.join(uploadDir, fileName);

            await fotoFile.mv(filePath); // Move the uploaded file to the server

            // If there was an old photo, delete it to save space
            if (admin.foto && admin.foto !== '') {
                const oldFotoPath = path.join(__dirname, '..', admin.foto);
                if (fs.existsSync(oldFotoPath)) {
                    fs.unlinkSync(oldFotoPath);
                }
            }

            fotoPath = `/uploads/admin_photos/${fileName}`; // Store the relative path
        }

        // Update admin data using the User model fields
        admin.fullName = fullName || admin.fullName;
        admin.email = email || admin.email;
        admin.whatsapp = whatsapp || admin.whatsapp;
        admin.alamat = alamat || admin.alamat;
        admin.ttl = ttl || admin.ttl;
        admin.jenisKelamin = jenisKelamin || admin.jenisKelamin;
        admin.foto = fotoPath; // Update photo path

        await admin.save();

        res.status(200).json({ message: 'Profil admin berhasil disimpan!', admin: admin });
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ message: 'Gagal menyimpan profil admin.', error: error.message });
    }
});


module.exports = router; // This line is essential