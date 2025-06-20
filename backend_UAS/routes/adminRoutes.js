const express = require('express');
const router = express.Router();
const PengajuanWNI = require('../models/Pengajuan'); // Ini adalah model untuk pengajuan WNI
const PengajuanWna = require('../models/PengajuanWna'); // Ini adalah model untuk pengajuan WNA
const upload = require('../middleware/upload'); // Untuk upload file profil admin
const adminProfileController = require('../controllers/profileController'); // Untuk profil admin
const pengajuanController = require('../controllers/pengajuanController');

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


module.exports = router;