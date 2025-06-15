import React, { useState } from 'react';
import '../styles/Form.css';

const PengajuanFormStep4 = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    suratKematian: '',
    ktpAhliWaris: '',
    kartuKeluarga: '',
    suratNikah: '',
    aktaKelahiran: '',
    suratKuasa: '',
    sertifikatTanah: '',
    bukuTabungan: '',
    pernyataanBenar: false,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      pernyataanBenar: e.target.checked,
    });
  };

  const handleReset = () => {
    setFormData({
      suratKematian: '',
      ktpAhliWaris: '',
      kartuKeluarga: '',
      suratNikah: '',
      aktaKelahiran: '',
      suratKuasa: '',
      sertifikatTanah: '',
      bukuTabungan: '',
      pernyataanBenar: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h3 className="form-subtitle">Dokumen yang Diperlukan</h3>
          <form onSubmit={handleSubmit}>

            {/* Dokumen Wajib */}
            <div className="form-field">
              <label>Dokumen Surat Kematian</label>
              <input
                type="file"
                name="suratKematian"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-field">
              <label>KTP (Ahli Waris)</label>
              <input
                type="file"
                name="ktpAhliWaris"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Kartu Keluarga</label>
              <input
                type="file"
                name="kartuKeluarga"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Dokumen Opsional */}
            <div className="form-field">
              <label>Surat Nikah (Opsional)</label>
              <input
                type="file"
                name="suratNikah"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label>Akta Kelahiran (Opsional)</label>
              <input
                type="file"
                name="aktaKelahiran"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label>Surat Kuasa Ahli Waris (Opsional)</label>
              <input
                type="file"
                name="suratKuasa"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label>Sertifikat Tanah/Rumah (Opsional)</label>
              <input
                type="file"
                name="sertifikatTanah"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label>Buku Tabungan/Rekening Bank (Pewaris) (Opsional)</label>
              <input
                type="file"
                name="bukuTabungan"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            {/* Pernyataan */}
            <label className="checkbox-container">
            <input 
                type="checkbox"
                checked={formData.pernyataanBenar}
                onChange={handleCheckboxChange}
                required 
            />
            Kami menyatakan bahwa data yang diberikan adalah benar dan sah
            </label>

            <div className="form-buttons">
              <button type="button" className="back-button" onClick={onBack}>Kembali</button>
              <button type="button" className="back-button" style={{ backgroundColor: '#ff4d4d', color: '#fff' }} onClick={handleReset}>Reset</button>
              <button type="submit" className="form-button">Selanjutnya</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PengajuanFormStep4;