import React, { useState } from 'react';
// Memperbaiki path import CSS agar sesuai dengan konfigurasi resolusi modul
import '../styles/Form.css';

const PengajuanFormWNA3 = ({ onBack, onNext }) => {
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
    console.log('Step 3 WNI Tionghoa & Asing submitted:', formData);
    if (onNext) onNext();
  };

  return (
    <div>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Formulir Pengajuan untuk WNI Tionghoa & Asing</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Data Keluarga</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="jumlahAhliWarisWNA3">Jumlah Ahli Waris</label>
              <input
                type="number"
                id="jumlahAhliWarisWNA3"
                name="jumlahAhliWaris"
                value={formData.jumlahAhliWaris}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="namaAhliWarisLainnyaWNA3">Nama Ahli Waris Lainnya</label>
              <input
                type="text"
                id="namaAhliWarisLainnyaWNA3"
                name="namaAhliWarisLainnya"
                value={formData.namaAhliWarisLainnya}
                onChange={handleChange}
              />
            </div>

            <h4>Data Saksi</h4>
            <div className="saksi-grid">
              <div>
                <label htmlFor="namaSaksi1WNA3">Nama Saksi 1</label>
                <input
                  type="text"
                  id="namaSaksi1WNA3"
                  name="namaSaksi1"
                  value={formData.namaSaksi1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="namaSaksi2WNA3">Nama Saksi 2 (Kalau ada)</label>
                <input
                  type="text"
                  id="namaSaksi2WNA3"
                  name="namaSaksi2"
                  value={formData.namaSaksi2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="saksi-grid">
              <div>
                <label htmlFor="nikSaksi1WNA3">NIK Saksi 1</label>
                <input
                  type="text"
                  id="nikSaksi1WNA3"
                  name="nikSaksi1"
                  value={formData.nikSaksi1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="nikSaksi2WNA3">NIK Saksi 2 (Kalau ada)</label>
                <input
                  type="text"
                  id="nikSaksi2WNA3"
                  name="nikSaksi2"
                  value={formData.nikSaksi2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="saksi-grid">
              <div>
                <label htmlFor="fotoKtpSaksi1WNA3">Foto KTP Saksi 1</label>
                <input
                  type="file"
                  id="fotoKtpSaksi1WNA3"
                  name="fotoKtpSaksi1"
                  accept="application/pdf,image/*"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="fotoKtpSaksi2WNA3">Foto KTP Saksi 2</label>
                <input
                  type="file"
                  id="fotoKtpSaksi2WNA3"
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

export default PengajuanFormWNA3;