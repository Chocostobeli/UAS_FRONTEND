import React, { useState } from 'react';
import '../styles/Form.css';

const PengajuanForm = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    ttl: '',
    alamat: '',
    telepon: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (onNext) onNext();
  };

  return (
    <div>
      {/* Tombol Kembali di luar card */}
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Form Pengajuan untuk WNI</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Nama Lengkap Ahli Waris</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>NIK</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Tempat & Tanggal Lahir</label>
              <input
                type="text"
                name="ttl"
                value={formData.ttl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Alamat Lengkap Domisili</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Nomor Telepon</label>
              <input
                type="text"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button className="form-button" type="submit">Selanjutnya</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PengajuanForm;