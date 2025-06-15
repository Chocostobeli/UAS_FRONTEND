import React, { useState } from 'react';

import '../styles/Form.css';

const PengajuanFormStep2 = ({ onBack, onNext }) => {
  // State untuk menyimpan data pewaris
  const [formData, setFormData] = useState({
    namaPewaris: '',
    ktpPewaris: '', // Opsional, jika masih ada
    tanggalWafat: '',
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
    // Log data pewaris yang disubmit (bisa diganti dengan pengiriman data ke backend)
    console.log('Data Pewaris submitted:', formData);
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
        <h2 className="form-title">Pengisian Formulir Pengajuan untuk WNI</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Data Pewaris</h3>
          <form onSubmit={handleSubmit}>
            {/* Input Nama Lengkap Pewaris */}
            <div className="form-field">
              <label htmlFor="namaPewaris">Nama Lengkap Pewaris</label>
              <input
                type="text"
                id="namaPewaris"
                name="namaPewaris"
                value={formData.namaPewaris}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Nomor KTP Pewaris (Opsional) */}
            <div className="form-field">
              <label htmlFor="ktpPewaris">Nomor KTP Pewaris (opsional jika tidak ada)</label>
              <input
                type="text"
                id="ktpPewaris"
                name="ktpPewaris"
                value={formData.ktpPewaris}
                onChange={handleChange}
              />
            </div>

            {/* Input Tanggal Wafat Pewaris */}
            <div className="form-field">
              <label htmlFor="tanggalWafat">Tanggal Wafat Pewaris</label>
              <input
                type="date"
                id="tanggalWafat"
                name="tanggalWafat"
                value={formData.tanggalWafat}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Alamat Terakhir Pewaris */}
            <div className="form-field">
              <label htmlFor="alamatTerakhirPewaris">Alamat Terakhir Pewaris</label>
              <textarea
                id="alamatTerakhirPewaris"
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

export default PengajuanFormStep2;