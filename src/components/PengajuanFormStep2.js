import React, { useState, useEffect } from 'react';
import '../styles/Form.css';

const PengajuanFormStep2 = ({ onBack, onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        <h2 className="form-title">Pengisian Formulir Pengajuan untuk WNI</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Data Pewaris</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="nama_pewaris">Nama Lengkap Pewaris</label>
              <input
                type="text"
                id="nama_pewaris"
                name="nama_pewaris" // Sesuaikan nama dengan field di backend
                value={formData.nama_pewaris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="ktp_pewaris">Nomor KTP Pewaris (opsional jika tidak ada)</label>
              <input
                type="text"
                id="ktp_pewaris"
                name="ktp_pewaris" // Sesuaikan nama dengan field di backend
                value={formData.ktp_pewaris}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="tanggal_wafat_pewaris">Tanggal Wafat Pewaris</label>
              <input
                type="date"
                id="tanggal_wafat_pewaris"
                name="tanggal_wafat_pewaris" // Sesuaikan nama dengan field di backend
                value={formData.tanggal_wafat_pewaris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="alamat_terakhir_pewaris">Alamat Terakhir Pewaris</label>
              <textarea
                id="alamat_terakhir_pewaris"
                name="alamat_terakhir_pewaris" // Sesuaikan nama dengan field di backend
                value={formData.alamat_terakhir_pewaris}
                onChange={handleChange}
                required
              />
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

export default PengajuanFormStep2;
