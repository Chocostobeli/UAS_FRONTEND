import React, { useState, useEffect } from 'react';
import '../styles/Form.css';

const PengajuanFormStep3 = ({ onBack, onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Simpan objek File
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
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
                name="jumlah_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.jumlah_ahli_waris}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Nama Ahli Waris Lainnya</label>
              <input
                type="text"
                name="nama_ahli_waris_lainnya" // Sesuaikan nama dengan field di backend
                value={formData.nama_ahli_waris_lainnya}
                onChange={handleChange}
              />
            </div>

            <h4>Data Saksi</h4>
            <div className="saksi-grid">
              <div>
                <label>Nama Saksi 1</label>
                <input
                  type="text"
                  name="nama_saksi1" // Sesuaikan nama dengan field di backend
                  value={formData.nama_saksi1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Nama Saksi 2 (Kalau ada)</label>
                <input
                  type="text"
                  name="nama_saksi2" // Sesuaikan nama dengan field di backend
                  value={formData.nama_saksi2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="saksi-grid">
              <div>
                <label>NIK Saksi 1</label>
                <input
                  type="text"
                  name="nik_saksi1" // Sesuaikan nama dengan field di backend
                  value={formData.nik_saksi1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>NIK Saksi 2 (Kalau ada)</label>
                <input
                  type="text"
                  name="nik_saksi2" // Sesuaikan nama dengan field di backend
                  value={formData.nik_saksi2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="saksi-grid">
              <div>
                <label>Foto KTP Saksi 1</label>
                <input
                  type="file"
                  name="foto_ktp_saksi1" // Sesuaikan nama dengan field di backend
                  accept="application/pdf,image/*"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Foto KTP Saksi 2</label>
                <input
                  type="file"
                  name="foto_ktp_saksi2" // Sesuaikan nama dengan field di backend
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
