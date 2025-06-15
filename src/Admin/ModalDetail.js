// src/Admin/ModalDetail.js
import React from 'react';
import '../styles/Form.css'; // Menggunakan CSS yang sudah ada untuk layout form
import './Modal.css';       // CSS khusus untuk modal

const ModalDetail = ({ isOpen, onClose, detailPengajuan }) => {
  if (!isOpen) return null;

  // Data dummy yang lebih lengkap (sesuai struktur form)
  const dummyDetail = {
    id: 'DUMMY001',
    tipePengajuan: 'WNI', // Default untuk dummy
    // Data Pemohon (Ahli Waris)
    namaLengkapAhliWaris: 'Muhammad Saleh',
    nomorKTP: '2310501100',
    tempatTanggalLahir: 'Jakarta, 1 Juli 2001',
    alamatLengkap: 'Pondok Cabe Jauhan Dikit No. 2, Tangerang Selatan',
    nomorHP: '08282828212',
    email: 'salehnyaa@gmail.com',

    // Data Pewaris
    namaLengkapPewaris: 'Alm. Muhammad Solimih',
    tanggalWafatPewaris: '2024-06-01',
    alamatTerakhirPewaris: 'Pondok Cina Deketan Cabe No. 5, Depok',

    // Data Keluarga & Saksi
    jumlahAhliWarisLainnya: '2',
    namaAhliWarisLainnya: '1. Sakinah Mawadah\n2. Popo Shiroyou',
    namaSaksi1: 'Sakinah Mawadah',
    nikSaksi1: '292398498',
    fotoKtpSaksi1: 'dummy_ktp_saksi1.pdf', // Nama file dummy

    namaSaksi2: 'Popo Shiroyou',
    nikSaksi2: '2237812736028730',
    fotoKtpSaksi2: 'dummy_ktp_saksi2.pdf', // Nama file dummy

    // Dokumen WNI
    dokumenWNI_SuratKematian: 'dummy_surat_kematian.pdf',
    dokumenWNI_KtpAhliWaris: 'dummy_ktp_ahli_waris.pdf',
    dokumenWNI_KartuKeluarga: 'dummy_kartu_keluarga.pdf',
    dokumenWNI_SuratNikah: 'dummy_surat_nikah.pdf', // opsional
    dokumenWNI_AktaLahir: 'dummy_akta_kelahiran.pdf', // opsional
    dokumenWNI_SuratKuasaAhliWaris: 'dummy_surat_kuasa.pdf', // opsional
    dokumenWNI_SertifikatTanahRumah: 'dummy_sertifikat_tanah.pdf', // opsional
    dokumenWNI_BukuTabungan: 'dummy_buku_tabungan.pdf', // opsional

    // Dokumen WNI Tionghoa dan Asing
    dokumenWNA_AktaKematianPewaris: 'dummy_akta_kematian_wna.pdf', // Wajib
    dokumenWNA_KtpPemohon: 'dummy_ktp_pemohon_wna.pdf',
    dokumenWNA_KartuKeluarga: 'dummy_kk_wna.pdf',
    dokumenWNA_AktaLahirAnak: 'dummy_akta_lahir_anak_wna.pdf', // jika tersedia
    dokumenWNA_SuratNikahPewaris: 'dummy_surat_nikah_pewaris_wna.pdf', // jika ada
    dokumenWNA_SuratKuasaAhliWarisLain: 'dummy_surat_kuasa_ahli_waris_lain_wna.pdf', // jika pemohon mewakili
    dokumenWNA_HasilPengecekanWasiatAHU: 'dummy_hasil_ahu.pdf', // jika diperlukan
    dokumenWNA_SertifikatHakMilik: 'dummy_sertifikat_hak_milik_wna.pdf', // jika ada
    dokumenWNA_SPPT_PBBTerakhir: 'dummy_sppt_pbb_wna.pdf',
    dokumenWNA_BukuTabunganPewaris: 'dummy_buku_tabungan_pewaris_wna.pdf',
  };

  const detail = detailPengajuan || dummyDetail;

  // Fungsi helper untuk menampilkan bagian dokumen
  const renderDocumentLink = (label, fileName) => {
    if (!fileName) return null; // Tidak menampilkan jika file tidak ada atau nama file kosong
    const dummyFilePath = `/documents/${fileName}`; // Asumsi folder 'documents' di public

    return (
      <div className="form-field">
        <label>{label}:</label>
        {/* Menggunakan target="_blank" untuk membuka di tab baru */}
        <a href={dummyFilePath} target="_blank" rel="noopener noreferrer" className="pdf-button">
            <span className="pdf-icon">📄</span> PDF
        </a>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Detail Pengajuan - {detail.tipePengajuan}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <h4>Data Pemohon (Ahli Waris yang Mengajukan)</h4>
            <div className="form-field"><label>Nama Lengkap:</label><p>{detail.namaLengkapAhliWaris}</p></div>
            <div className="form-field"><label>Nomor KTP:</label><p>{detail.nomorKTP}</p></div>
            <div className="form-field"><label>Tempat & Tanggal Lahir:</label><p>{detail.tempatTanggalLahir}</p></div>
            <div className="form-field"><label>Alamat Lengkap Domisili:</label><p>{detail.alamatLengkap}</p></div>
            <div className="form-field"><label>Nomor Telepon:</label><p>{detail.nomorHP}</p></div>
            <div className="form-field"><label>Email:</label><p>{detail.email}</p></div>
          </div>

          <div className="detail-section">
            <h4>Data Pewaris</h4>
            <div className="form-field"><label>Nama Lengkap Pewaris:</label><p>{detail.namaLengkapPewaris}</p></div>
            <div className="form-field"><label>Tanggal Wafat Pewaris:</label><p>{detail.tanggalWafatPewaris}</p></div>
            <div className="form-field"><label>Alamat Terakhir Pewaris:</label><p>{detail.alamatTerakhirPewaris}</p></div>
          </div>

          <div className="detail-section">
            <h4>Data Keluarga & Saksi</h4>
            <div className="form-field"><label>Jumlah Ahli Waris Lainnya:</label><p>{detail.jumlahAhliWarisLainnya}</p></div>
            <div className="form-field"><label>Nama Ahli Waris Lainnya:</label><p style={{whiteSpace: 'pre-wrap'}}>{detail.namaAhliWarisLainnya}</p></div>
            <div className="form-grid">
              <div className="form-field"><label>Nama Saksi 1:</label><p>{detail.namaSaksi1}</p></div>
              <div className="form-field"><label>Nama Saksi 2:</label><p>{detail.namaSaksi2 || '-'}</p></div>
            </div>
            <div className="form-grid">
              <div className="form-field"><label>NIK Saksi 1:</label><p>{detail.nikSaksi1}</p></div>
              <div className="form-field"><label>NIK Saksi 2:</label><p>{detail.nikSaksi2 || '-'}</p></div>
            </div>
            <div className="form-grid">
              {renderDocumentLink('Upload KTP Saksi 1', detail.fotoKtpSaksi1)}
              {renderDocumentLink('Upload KTP Saksi 2', detail.fotoKtpSaksi2)}
            </div>
          </div>

          <div className="detail-section">
            <h4>Dokumen yang Diperlukan</h4>
            {detail.tipePengajuan === 'WNI' && (
              <>
                {renderDocumentLink('Dokumen Surat Kematian', detail.dokumenWNI_SuratKematian)}
                {renderDocumentLink('KTP Pemohon (Ahli Waris)', detail.dokumenWNI_KtpAhliWaris)}
                {renderDocumentLink('Kartu Keluarga (KK)', detail.dokumenWNI_KartuKeluarga)}
                {renderDocumentLink('Surat Nikah (Jika diperlukan)', detail.dokumenWNI_SuratNikah)}
                {renderDocumentLink('Akta Lahir (Jika diperlukan)', detail.dokumenWNI_AktaLahir)}
                {renderDocumentLink('Surat Kuasa Ahli Waris (Opsional)', detail.dokumenWNI_SuratKuasaAhliWaris)}
                {renderDocumentLink('Sertifikat Tanah / Rumah (Opsional)', detail.dokumenWNI_SertifikatTanahRumah)}
                {renderDocumentLink('Buku Tabungan / Rekening Bank Pewaris (Opsional)', detail.dokumenWNI_BukuTabungan)}
              </>
            )}

            {detail.tipePengajuan === 'WNI Tionghoa & Asing' && (
              <>
                {renderDocumentLink('Akta Kematian Pewaris', detail.dokumenWNA_AktaKematianPewaris)}
                {renderDocumentLink('KTP Pemohon', detail.dokumenWNA_KtpPemohon)}
                {renderDocumentLink('Kartu Keluarga yang mencantumkan pewaris dan ahli waris', detail.dokumenWNA_KartuKeluarga)}
                {renderDocumentLink('Akta Lahir anak-anak ahli waris (jika tersedia)', detail.dokumenWNA_AktaLahirAnak)}
                {renderDocumentLink('Surat Nikah pewaris (jika ada)', detail.dokumenWNA_SuratNikahPewaris)}
                {renderDocumentLink('Surat Kuasa dari semua ahli waris lain (jika pemohon mewakili)', detail.dokumenWNA_SuratKuasaAhliWarisLain)}
                {renderDocumentLink('Hasil Pengecekan Wasiat dari AHU (jika diperlukan oleh notaris)', detail.dokumenWNA_HasilPengecekanWasiatAHU)}
                {renderDocumentLink('Sertifikat Hak Milik (jika ada harta warisan berupa properti)', detail.dokumenWNA_SertifikatHakMilik)}
                {renderDocumentLink('SPPT PBB terakhir', detail.dokumenWNA_SPPT_PBBTerakhir)}
                {renderDocumentLink('Buku Tabungan atau rekening atas nama pewaris', detail.dokumenWNA_BukuTabunganPewaris)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;