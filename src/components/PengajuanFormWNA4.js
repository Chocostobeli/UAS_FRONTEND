import React, { useState } from 'react';

import '../styles/Form.css';

const PengajuanFormWNA4 = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    aktaKematianPewaris: null,
    ktpAhliWaris: null,
    kartuKeluarga: null,
    aktaLahirAnakAhliWaris: null,
    suratNikahPewaris: null,
    suratKuasaAhliWaris: null,
    hasilPengecekanWasiatAHU: null,
    sertifikatHakMilik: null,
    spptPBBTerakhir: null,
    bukuTabungan: null,
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
      aktaKematianPewaris: null,
      ktpAhliWaris: null,
      kartuKeluarga: null,
      aktaLahirAnakAhliWaris: null,
      suratNikahPewaris: null,
      suratKuasaAhliWaris: null,
      hasilPengecekanWasiatAHU: null,
      sertifikatHakMilik: null,
      spptPBBTerakhir: null,
      bukuTabungan: null,
      pernyataanBenar: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 4 WNI Tionghoa & Asing submitted:', formData);
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
          <h3 className="form-subtitle">Dokumen yang Diperlukan</h3>
          <form onSubmit={handleSubmit}>

            {/* Dokumen Wajib */}
            <div className="form-field">
              <label htmlFor="aktaKematianPewaris">Upload Akta Kematian Pewaris (wajib)</label>
              <input
                type="file"
                id="aktaKematianPewaris"
                name="aktaKematianPewaris"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="ktpAhliWaris">Upload KTP (Ahli Waris)</label>
              <input
                type="file"
                id="ktpAhliWaris"
                name="ktpAhliWaris"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="kartuKeluarga">Upload Kartu Keluarga yang mencantumkan pewaris dan ahli waris</label>
              <input
                type="file"
                id="kartuKeluarga"
                name="kartuKeluarga"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Dokumen Opsional */}
            <div className="form-field">
              <label htmlFor="aktaLahirAnakAhliWaris">Upload Akta Lahir anak-anak ahli waris (jika tersedia)</label>
              <input
                type="file"
                id="aktaLahirAnakAhliWaris"
                name="aktaLahirAnakAhliWaris"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="suratNikahPewaris">Upload Surat Nikah pewaris (jika ada)</label>
              <input
                type="file"
                id="suratNikahPewaris"
                name="suratNikahPewaris"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="suratKuasaAhliWaris">Upload surat kuasa dari semua ahli waris lain (jika pemohon mewakili)</label>
              <input
                type="file"
                id="suratKuasaAhliWaris"
                name="suratKuasaAhliWaris"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="hasilPengecekanWasiatAHU">Upload hasil pengecekan wasiat dari AHU (jika diperlukan oleh notaris)</label>
              <input
                type="file"
                id="hasilPengecekanWasiatAHU"
                name="hasilPengecekanWasiatAHU"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <h4 style={{ marginTop: '30px' }}>Data Tambahan (Opsional tapi Disarankan) :</h4>

            <div className="form-field">
              <label htmlFor="sertifikatHakMilik">Upload Sertifikat Hak Milik (jika ada harta warisan berupa properti)</label>
              <input
                type="file"
                id="sertifikatHakMilik"
                name="sertifikatHakMilik"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="spptPBBTerakhir">Upload SPPT PBB terakhir</label>
              <input
                type="file"
                id="spptPBBTerakhir"
                name="spptPBBTerakhir"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="bukuTabungan">Upload Buku Tabungan atau rekening atas nama pewaris</label>
              <input
                type="file"
                id="bukuTabungan"
                name="bukuTabungan"
                accept="application/pdf,image/*"
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
              <button type="button" className="back-button reset" onClick={handleReset}>Reset</button>
              <button type="submit" className="form-button">Selanjutnya</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PengajuanFormWNA4;