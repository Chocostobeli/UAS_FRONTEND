import React, { useState } from 'react';
// Memperbaiki path import CSS agar sesuai dengan konfigurasi resolusi modul
import '../styles/Form.css';

const PengajuanFormWNA2 = ({ onBack, onNext }) => {
  // State untuk menyimpan data pewaris WNI Tionghoa & Asing
  const [formData, setFormData] = useState({
    namaPewaris: '',
    nomorKTPPewaris: '', // Opsional, jika masih ada
    tanggalWafatPewaris: '',
    alamatTerakhirPewaris: '',
  });

  // Handler untuk memperbarui state saat input berubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log data yang disubmit (bisa diganti dengan pengiriman data ke backend)
    console.log('Data Pewaris WNI Tionghoa & Asing submitted:', formData);
    // Lanjut ke langkah berikutnya
    if (onNext) onNext(formData);
  };

  return (
    <div>
      {/* Tombol Kembali di luar card */}
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Formulir Pengajuan untuk WNI Tionghoa & Asing</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Data Pewaris</h3>
          <form onSubmit={handleSubmit}>
            {/* Input Nama Lengkap Pewaris */}
            <div className="form-field">
              <label htmlFor="namaPewarisWNA2">Nama Lengkap Pewaris</label>
              <input
                type="text"
                id="namaPewarisWNA2"
                name="namaPewaris"
                value={formData.namaPewaris}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Nomor KTP Pewaris (Opsional) */}
            <div className="form-field">
              <label htmlFor="nomorKTPPewarisWNA2">Nomor KTP Pewaris (opsional jika masih ada)</label>
              <input
                type="text" // Menggunakan text karena input nomor bisa mengandung format lain
                id="nomorKTPPewarisWNA2"
                name="nomorKTPPewaris"
                value={formData.nomorKTPPewaris}
                onChange={handleChange}
              />
            </div>

            {/* Input Tanggal Wafat Pewaris */}
            <div className="form-field">
              <label htmlFor="tanggalWafatPewarisWNA2">Tanggal Wafat Pewaris</label>
              <input
                type="date"
                id="tanggalWafatPewarisWNA2"
                name="tanggalWafatPewaris"
                value={formData.tanggalWafatPewaris}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Alamat Terakhir Pewaris */}
            <div className="form-field">
              <label htmlFor="alamatTerakhirPewarisWNA2">Alamat Terakhir Pewaris</label>
              <textarea
                id="alamatTerakhirPewarisWNA2"
                name="alamatTerakhirPewaris"
                value={formData.alamatTerakhirPewaris}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tombol navigasi */}
            <div className="form-buttons">
              <button type="button" className="back-button" onClick={onBack}>Kembali</button>
              <button type="submit" className="form-button">Selanjutnya</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PengajuanFormWNA2;