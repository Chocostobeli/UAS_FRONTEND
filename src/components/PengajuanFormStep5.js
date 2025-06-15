import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Tambahkan ini
import '../styles/Form.css';

const PengajuanFormStep5 = ({ onBack, onSubmit }) => {
  const navigate = useNavigate(); // ✅ Inisialisasi navigate

  const [formData, setFormData] = useState({
    opsiPengiriman: '',
    nama: '',
    nomorTelepon: '',
    alamat: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Step 5 submitted:', formData);

    if (onSubmit) {
      onSubmit(formData);
    }

    // ✅ Redirect ke dashboard/profile setelah pengajuan
    navigate('/dashboard/profile');
  };

  return (
    <div>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Forum Pengajuan untuk WNI</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Opsi Pengiriman dan Pengambilan Surat</h3>

          <form onSubmit={handleFormSubmit}>
            <div className="form-field">
              <label>Opsi Pengiriman</label>
              <select
                name="opsiPengiriman"
                value={formData.opsiPengiriman}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Opsi --</option>
                <option value="kurir">Jasa Kurir</option>
                <option value="ambil">Ambil Langsung</option>
              </select>
            </div>

            <p>Silahkan isi alamat pengiriman jika memilih opsi jasa kurir</p>

            <div className="form-field">
              <label>Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Nomor Telepon</label>
              <input
                type="text"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Alamat Pengiriman</label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
              />
            </div>

            <p>Catatan: Biaya pengiriman di tanggung oleh pemohon</p>

            <div className="form-buttons">
              <button type="button" className="back-button" onClick={onBack}>Kembali</button>
              <button type="submit" className="form-button">Ajukan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PengajuanFormStep5;
