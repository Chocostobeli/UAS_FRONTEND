import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const PengajuanFormStep5 = ({ onBack, onSubmit, initialData }) => {
  const navigate = useNavigate();
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Kirim data ke fungsi submit di parent
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
                name="opsi_pengiriman" // Sesuaikan nama dengan field di backend
                value={formData.opsi_pengiriman}
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
              <label>Nama Penerima</label>
              <input
                type="text"
                name="nama_penerima" // Sesuaikan nama dengan field di backend
                value={formData.nama_penerima}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Nomor Telepon Penerima</label>
              <input
                type="text"
                name="nomor_telepon_penerima" // Sesuaikan nama dengan field di backend
                value={formData.nomor_telepon_penerima}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Alamat Pengiriman</label>
              <textarea
                name="alamat_pengiriman" // Sesuaikan nama dengan field di backend
                value={formData.alamat_pengiriman}
                onChange={handleChange}
                required={formData.opsi_pengiriman === 'kurir'} // Wajib jika opsi kurir
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
