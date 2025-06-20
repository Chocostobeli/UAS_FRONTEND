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

  // const handleCheckboxChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     pernyataan_benar: e.target.checked, // Sesuaikan nama dengan field di backend
  //   });
  // };
  const handleCheckboxChange = (e) => {
  const newValue = e.target.checked;
  setFormData({
    ...formData,
    pernyataan_benar: newValue,
  });
  console.log("Checkbox changed. New value of pernyataan_benar:", newValue);
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
      pernyataan_benar: false,
    });
    // Juga reset input file secara visual jika diperlukan (misal: dengan me-reset key input)
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formData.pernyataan_benar) {
  //     alert("Anda harus menyetujui pernyataan kebenaran data."); // Menggunakan alert sementara
  //     return;
  //   }
  //   onNext(formData);
  // };
  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submitting form. Current formData.pernyataan_benar:", formData.pernyataan_benar);
  if (!formData.pernyataan_benar) {
   onNext(formData);
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
        <h2 className="form-title">Pengisian Forum Pengajuan untuk WNI</h2>
        <div className="form-container">
          <h3 className="form-subtitle">Dokumen yang Diperlukan</h3>
          <form onSubmit={handleSubmit}>

            {/* Dokumen Wajib */}
            <div className="form-field">
              <label>Dokumen Surat Kematian</label>
              <input
                type="file"
                name="surat_kematian" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.surat_kematian && <p>File terpilih: {formData.surat_kematian.name}</p>}
            </div>

            <div className="form-field">
              <label>KTP (Ahli Waris)</label>
              <input
                type="file"
                name="ktp_ahli_waris_file" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.ktp_ahli_waris_file && <p>File terpilih: {formData.ktp_ahli_waris_file.name}</p>}
            </div>

            <div className="form-field">
              <label>Kartu Keluarga</label>
              <input
                type="file"
                name="kartu_keluarga" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.kartu_keluarga && <p>File terpilih: {formData.kartu_keluarga.name}</p>}
            </div>

            {/* Dokumen Opsional */}
            <div className="form-field">
              <label>Surat Nikah (Opsional)</label>
              <input
                type="file"
                name="surat_nikah" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.surat_nikah && <p>File terpilih: {formData.surat_nikah.name}</p>}
            </div>

            <div className="form-field">
              <label>Akta Kelahiran (Opsional)</label>
              <input
                type="file"
                name="akta_kelahiran" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.akta_kelahiran && <p>File terpilih: {formData.akta_kelahiran.name}</p>}
            </div>

            <div className="form-field">
              <label>Surat Kuasa Ahli Waris (Opsional)</label>
              <input
                type="file"
                name="surat_kuasa" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.surat_kuasa && <p>File terpilih: {formData.surat_kuasa.name}</p>}
            </div>

            <div className="form-field">
              <label>Sertifikat Tanah/Rumah (Opsional)</label>
              <input
                type="file"
                name="sertifikat_tanah" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.sertifikat_tanah && <p>File terpilih: {formData.sertifikat_tanah.name}</p>}
            </div>

            <div className="form-field">
              <label>Buku Tabungan/Rekening Bank (Pewaris) (Opsional)</label>
              <input
                type="file"
                name="buku_tabungan" // Sesuaikan nama dengan field di backend
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
              {formData.buku_tabungan && <p>File terpilih: {formData.buku_tabungan.name}</p>}
            </div>

            {/* Pernyataan */}
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="pernyataan_benar" // Sesuaikan nama dengan field di backend
                checked={formData.pernyataan_benar}
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