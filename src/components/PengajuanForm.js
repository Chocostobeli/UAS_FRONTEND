import React, { useState, useEffect } from 'react';
import '../styles/Form.css';

const PengajuanForm = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Kirim data kembali ke parent
  };

  return (
    <div>
      {/* Tombol Kembali di luar card (tidak muncul di step 1) */}
      {/* <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div> */}

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Form Pengajuan untuk WNI</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Nama Lengkap Ahli Waris</label>
              <input
                type="text"
                name="nama_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.nama_ahli_waris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>NIK</label>
              <input
                type="text"
                name="nik_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.nik_ahli_waris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Tempat & Tanggal Lahir</label>
              <input
                type="text"
                name="ttl_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.ttl_ahli_waris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Alamat Lengkap Domisili</label>
              <input
                type="text"
                name="alamat_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.alamat_ahli_waris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Nomor Telepon</label>
              <input
                type="text"
                name="telepon_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.telepon_ahli_waris}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email_ahli_waris" // Sesuaikan nama dengan field di backend
                value={formData.email_ahli_waris}
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
