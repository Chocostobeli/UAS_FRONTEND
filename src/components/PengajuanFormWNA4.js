import React, { useState, useEffect } from 'react';
import '../styles/Form.css';

const PengajuanFormStep4 = ({ onBack, onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Simpan objek File
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      pernyataan_benar_wna: e.target.checked, // Sesuaikan nama dengan field di backend
    });
  };

  const handleReset = () => {
    setFormData({
      ...formData, // Pertahankan data dari step sebelumnya
      surat_kematian: null,
      ktp_ahli_waris_file: null,
      kartu_keluarga: null,
      surat_nikah: null,
      akta_kelahiran: null,
      surat_kuasa: null,
      sertifikat_tanah: null,
      buku_tabungan: null,
      cek_wasiat_ahu: null,
      sppt_pbb: null,
      pernyataan_benar: false,
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pernyataan_benar) {
      alert("Anda harus menyetujui pernyataan kebenaran data."); // Menggunakan alert sementara
      return;
    }
    onNext(formData);
  };

  return (
    <div>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>← Kembali</button>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">Pengisian Forum Pengajuan untuk WNI Tionghoa & Asing</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Dokumen yang Diperlukan</h3>
          <form onSubmit={handleSubmit}>

            {/* Dokumen Wajib */}
            <div className="form-field">
              <label>Upload Dokumen Surat Kematian</label>
              <input
                type="file"
                name="surat_kematian_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.surat_kematian_wna && <p>File terpilih: {formData.surat_kematian_wna.name}</p>}
            </div>

            <div className="form-field">
              <label>Upload KTP (Ahli Waris)</label>
              <input
                type="file"
                name="ktp_ahli_waris_file_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.ktp_ahli_waris_file_wna && <p>File terpilih: {formData.ktp_ahli_waris_file_wna.name}</p>}
            </div>

            <div className="form-field">
              <label>Upload Kartu Keluarga</label>
              <input
                type="file"
                name="kartu_keluarga_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.kartu_keluarga_wna && <p>File terpilih: {formData.kartu_keluarga_wna.name}</p>}
            </div>

            {/* Dokumen Opsional */}
            <div className="form-field">
              <label>Upload Surat Nikah (Opsional)</label>
              <input
                type="file"
                name="surat_nikah_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.surat_nikah_wna && <p>File terpilih: {formData.surat_nikah_wna.name}</p>}
            </div>

            <div className="form-field">
              <label>Upload Akta Kelahiran (Opsional)</label>
              <input
                type="file"
                name="akta_kelahiran_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.akta_kelahiran_wna && <p>File terpilih: {formData.akta_kelahiran_wna.name}</p>}
            </div>

            <div className="form-field">
              <label>Upload Surat Kuasa Ahli Waris (Opsional)</label>
              <input
                type="file"
                name="surat_kuasa_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.surat_kuasa_wna && <p>File terpilih: {formData.surat_kuasa_wna.name}</p>}
            </div>

              <div className="form-field">
              <label>Upload hasil pengecekan wasiat dari AHU (jika diperlukan oleh notaris)</label>
              <input
                type="file"
                name="cek_wasiat_ahu" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.cek_wasiat_ahu && <p>File terpilih: {formData.cek_wasiat_ahu.name}</p>}
            </div>

            <div className="form-field">
              <label>Upload Sertifikat Tanah/Rumah (Opsional)</label>
              <input
                type="file"
                name="sertifikat_tanah_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.sertifikat_tanah_wna && <p>File terpilih: {formData.sertifikat_tanah_wna.name}</p>}
            </div>

              <div className="form-field">
              <label>Upload SPPT PBB terakhir</label>
              <input
                type="file"
                name="sppt_pbb" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
                {formData.sppt_pbb && <p>File terpilih: {formData.sppt_pbb.name}</p>}
                </div>
              <div className="form-field">
              <label>Buku Tabungan/Rekening Bank (Pewaris) (Opsional)</label>
              <input
                type="file"
                name="buku_tabungan_wna" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.buku_tabungan_wna && <p>File terpilih: {formData.buku_tabungan_wna.name}</p>}
            </div>

            {/* Pernyataan */}
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="pernyataan_benar_wna" // Sesuaikan nama dengan field di backend
                checked={formData.pernyataan_benar_wna}
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
