import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PengajuanFormWNA from '../components/PengajuanFormWNA';
import PengajuanFormWNA2 from '../components/PengajuanFormWNA2';
import PengajuanFormWNA3 from '../components/PengajuanFormWNA3';
import PengajuanFormWNA4 from '../components/PengajuanFormWNA4';
import PengajuanFormWNA5 from '../components/PengajuanFormWNA5';
import '../styles/Form.css'; // Pastikan CSS ini ada

const API_BASE_URL = 'http://localhost:5000/api/pengajuan-wna'; // Sesuaikan jika API Anda di port lain

const PengajuanWNAPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    nama_ahli_waris_wna: '',
    nik_ahli_waris_wna: '',
    ttl_ahli_waris_wna: '',
    alamat_ahli_waris_wna: '',
    telepon_ahli_waris_wna: '',
    email_ahli_waris_wna: '',

    // Step 2
    nama_pewaris_wna: '',
    ktp_pewaris_wna: '', // Ini string jika dari input teks, atau File jika perlu diupload (sesuaikan)
    tanggal_wafat_pewaris_wna: '',
    alamat_terakhir_pewaris_wna: '',

    // Step 3
    jumlah_ahli_waris_wna: '',
    nama_ahli_waris_lainnya_wna: '',
    nama_saksi1_wna: '',
    nik_saksi1_wna: '',
    foto_ktp_saksi1_wna: null, // File object
    nama_saksi2_wna: '',
    nik_saksi2_wna: '',
    foto_ktp_saksi2_wna: null, // File object

    // Step 4
    surat_kematian_wna: null, // File object
    ktp_ahli_waris_file_wna: null, // File object (changed from ktpAhliWaris to match backend model)
    kartu_keluarga_wna: null, // File object
    surat_nikah_wna: null, // File object
    akta_kelahiran_wna: null, // File object
    surat_kuasa_wna: null, // File object
    sertifikat_tanah_wna: null, // File object
    buku_tabungan_wna: null, // File object
    cek_wasiat_ahu: null,
    sppt_pbb: null,
    pernyataan_benar_wna: false,

    // Step 5
    opsi_pengiriman_wna: '',
    nama_penerima_wna: '', // Nama di step 5 menjadi nama_penerima
    nomor_telepon_penerima_wna: '', // Nomor Telepon di step 5 menjadi nomor_telepon_penerima
    alamat_pengiriman_wna: '', // Alamat di step 5 menjadi alamat_pengiriman
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
      'foto_ktp_saksi1_wna', 'foto_ktp_saksi2_wna', 'surat_kematian_wna',
      'ktp_ahli_waris_file_wna', 'kartu_keluarga_wna', 'surat_nikah_wna',
      'akta_kelahiran_wna', 'surat_kuasa_wna', 'sertifikat_tanah_wna', 'buku_tabungan_wna', 'cek_wasiat_ahu', 'sppt_pbb',
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
        return <PengajuanFormWNA onNext={handleNext} initialData={formData} />;
      case 2:
        return <PengajuanFormWNA2 onBack={handleBack} onNext={handleNext} initialData={formData} />;
      case 3:
        return <PengajuanFormWNA3 onBack={handleBack} onNext={handleNext} initialData={formData} />;
      case 4:
        return <PengajuanFormWNA4 onBack={handleBack} onNext={handleNext} initialData={formData} />;
      case 5:
        return <PengajuanFormWNA5 onBack={handleBack} onSubmit={handleSubmit} initialData={formData} />;
      default:
        return <div>Langkah tidak dikenali</div>;
    }
  };

  return (
    <div className="pengajuan-page-container">
      {renderStep()}
    </div>
  );
};

export default PengajuanWNAPage;