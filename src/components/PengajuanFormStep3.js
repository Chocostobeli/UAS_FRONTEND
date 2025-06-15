import React, { useState } from 'react';
import '../styles/Form.css';

const PengajuanFormStep3 = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    jumlahAhliWaris: '',
    namaAhliWarisLainnya: '',
    namaSaksi1: '',
    nikSaksi1: '',
    fotoKtpSaksi1: '',
    namaSaksi2: '',
    nikSaksi2: '',
    fotoKtpSaksi2: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 3 submitted:', formData);
    if (onNext) onNext();
  };

  return (
    <div>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Forum Pengajuan untuk WNI</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Data Keluarga</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Jumlah Ahli Waris</label>
              <input
                type="number"
                name="jumlahAhliWaris"
                value={formData.jumlahAhliWaris}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Nama Ahli Waris Lainnya</label>
              <input
                type="text"
                name="namaAhliWarisLainnya"
                value={formData.namaAhliWarisLainnya}
                onChange={handleChange}
              />
            </div>

            <h4>Data Saksi</h4>
            <div className="saksi-grid">
            <div>
                <label>Nama Saksi 1</label>
                <input
                type="text"
                name="namaSaksi1"
                value={formData.namaSaksi1}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Nama Saksi 2 (Kalau ada)</label>
                <input
                type="text"
                name="namaSaksi2"
                value={formData.namaSaksi2}
                onChange={handleChange}
                />
            </div>
            </div>

            <div className="saksi-grid">
            <div>
                <label>NIK Saksi 1</label>
                <input
                type="text"
                name="nikSaksi1"
                value={formData.nikSaksi1}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>NIK Saksi 2 (Kalau ada)</label>
                <input
                type="text"
                name="nikSaksi2"
                value={formData.nikSaksi2}
                onChange={handleChange}
                />
            </div>
            </div>

            <div className="saksi-grid">
            <div>
                <label>Foto KTP Saksi 1</label>
                <input
                type="file"
                name="fotoKtpSaksi1"
                accept="application/pdf,image/*"
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Foto KTP Saksi 2</label>
                <input
                type="file"
                name="fotoKtpSaksi2"
                accept="application/pdf,image/*"
                onChange={handleChange}
                />
            </div>
            </div>

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

export default PengajuanFormStep3;