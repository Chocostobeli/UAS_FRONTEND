import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PengajuanForm from '../components/PengajuanForm';
import PengajuanFormStep2 from '../components/PengajuanFormStep2';
import PengajuanFormStep3 from '../components/PengajuanFormStep3';
import PengajuanFormStep4 from '../components/PengajuanFormStep4';
import PengajuanFormStep5 from '../components/PengajuanFormStep5';
import '../styles/Form.css'; // Pastikan CSS ini ada

const API_BASE_URL = 'http://localhost:5000/api/pengajuan'; // Sesuaikan jika API Anda di port lain

const PengajuanPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    nama_ahli_waris: '',
    nik_ahli_waris: '',
    ttl_ahli_waris: '',
    alamat_ahli_waris: '',
    telepon_ahli_waris: '',
    email_ahli_waris: '',

    // Step 2
    nama_pewaris: '',
    ktp_pewaris: '', // Ini string jika dari input teks, atau File jika perlu diupload (sesuaikan)
    tanggal_wafat_pewaris: '',
    alamat_terakhir_pewaris: '',

    // Step 3
    jumlah_ahli_waris: '',
    nama_ahli_waris_lainnya: '',
    nama_saksi1: '',
    nik_saksi1: '',
    foto_ktp_saksi1: null, // File object
    nama_saksi2: '',
    nik_saksi2: '',
    foto_ktp_saksi2: null, // File object

    // Step 4
    surat_kematian: null, // File object
    ktp_ahli_waris_file: null, // File object (changed from ktpAhliWaris to match backend model)
    kartu_keluarga: null, // File object
    surat_nikah: null, // File object
    akta_kelahiran: null, // File object
    surat_kuasa: null, // File object
    sertifikat_tanah: null, // File object
    buku_tabungan: null, // File object
    pernyataan_benar: false,

    // Step 5
    opsi_pengiriman: '',
    nama_penerima: '', // Nama di step 5 menjadi nama_penerima
    nomor_telepon_penerima: '', // Nomor Telepon di step 5 menjadi nomor_telepon_penerima
    alamat_pengiriman: '', // Alamat di step 5 menjadi alamat_pengiriman
  });

  const handleNext = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (finalData) => {
    const allData = { ...formData, ...finalData };
    console.log('Final Data to Submit:', allData);

    const dataToSend = new FormData();

    // Append all text/non-file fields
    for (const key in allData) {
      if (allData[key] instanceof File) {
        // Skip files for now, append them separately
        continue;
      }
      dataToSend.append(key, allData[key]);
    }

    // Append file fields
    const fileFields = [
      'foto_ktp_saksi1', 'foto_ktp_saksi2', 'surat_kematian',
      'ktp_ahli_waris_file', 'kartu_keluarga', 'surat_nikah',
      'akta_kelahiran', 'surat_kuasa', 'sertifikat_tanah', 'buku_tabungan'
    ];

    fileFields.forEach(field => {
      if (allData[field]) {
        dataToSend.append(field, allData[field], allData[field].name);
      }
    });

    try {
      const response = await axios.post(API_BASE_URL, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Pengajuan berhasil:', response.data);
      alert('Pengajuan Anda berhasil disimpan!'); // Menggunakan alert sementara, bisa diganti dengan modal custom
      navigate('/dashboard/pengajuan'); // Redirect ke dashboard setelah sukses
    } catch (error) {
      console.error('Gagal mengirim pengajuan:', error.response ? error.response.data : error.message);
      alert(`Gagal menyimpan pengajuan: ${error.response ? (error.response.data.error || 'Terjadi kesalahan') : error.message}`); // Menggunakan alert sementara
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PengajuanForm onNext={handleNext} initialData={formData} />;
      case 2:
        return <PengajuanFormStep2 onBack={handleBack} onNext={handleNext} initialData={formData} />;
      case 3:
        return <PengajuanFormStep3 onBack={handleBack} onNext={handleNext} initialData={formData} />;
      case 4:
        return <PengajuanFormStep4 onBack={handleBack} onNext={handleNext} initialData={formData} />;
      case 5:
        return <PengajuanFormStep5 onBack={handleBack} onSubmit={handleSubmit} initialData={formData} />;
      default:
        return <PengajuanForm onNext={handleNext} initialData={formData} />;
    }
  };

  return (
    <div className="pengajuan-page-container">
      {renderStep()}
    </div>
  );
};

export default PengajuanPage;