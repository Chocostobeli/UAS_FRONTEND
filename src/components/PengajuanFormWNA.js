import React, { useState } from 'react';
// Memperbaiki path import CSS agar sesuai dengan konfigurasi resolusi modul
import '../styles/Form.css';

const PengajuanFormWNA = ({ onBack, onNext }) => {
  // State untuk menyimpan data pemohon WNI Tionghoa & Asing
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nomorKTP: '',
    tempatTanggalLahir: '',
    alamatLengkap: '',
    nomorHP: '',
    email: '',
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
    console.log('Data Pemohon WNI Tionghoa & Asing submitted:', formData);
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
          <h3 className="form-subtitle">Data Pemohon (Ahli Waris yang Mengajukan)</h3>
          <form onSubmit={handleSubmit}>
            {/* Input Nama Lengkap */}
            <div className="form-field">
              <label htmlFor="namaLengkapWNA">Nama Lengkap</label>
              <input
                type="text"
                id="namaLengkapWNA"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Nomor KTP */}
            <div className="form-field">
              <label htmlFor="nomorKTPWNA">Nomor KTP</label>
              <input
                type="text" // Menggunakan text karena input nomor bisa mengandung format lain
                id="nomorKTPWNA"
                name="nomorKTP"
                value={formData.nomorKTP}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Tempat dan Tanggal Lahir */}
            <div className="form-field">
              <label htmlFor="tempatTanggalLahirWNA">Tempat dan Tanggal Lahir</label>
              <input
                type="text"
                id="tempatTanggalLahirWNA"
                name="tempatTanggalLahir"
                value={formData.tempatTanggalLahir}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Alamat Lengkap */}
            <div className="form-field">
              <label htmlFor="alamatLengkapWNA">Alamat Lengkap</label>
              <textarea
                id="alamatLengkapWNA"
                name="alamatLengkap"
                value={formData.alamatLengkap}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Nomor HP */}
            <div className="form-field">
              <label htmlFor="nomorHPWNA">Nomor HP</label>
              <input
                type="text" // Menggunakan text karena input nomor bisa mengandung format lain
                id="nomorHPWNA"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Alamat Email */}
            <div className="form-field">
              <label htmlFor="emailWNA">Alamat Email</label>
              <input
                type="email"
                id="emailWNA"
                name="email"
                value={formData.email}
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

export default PengajuanFormWNA;