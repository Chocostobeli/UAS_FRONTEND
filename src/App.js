import React, { useState } from 'react';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GuideSection from './components/GuideSection';
import CompleteGuide from './components/CompleteGuide';
import PengajuanForm from './components/PengajuanForm'; 
import PengajuanFormPewaris from './components/PengajuanFormPewaris'; 
import PengajuanFormStep2 from './components/PengajuanFormStep2'; 
import PengajuanFormStep3 from './components/PengajuanFormStep3'; 
import PengajuanFormStep4 from './components/PengajuanFormStep4'; 
import PengajuanFormWNA from './components/PengajuanFormWNA';
import PengajuanFormWNA2 from './components/PengajuanFormWNA2';
import PengajuanFormWNA3 from './components/PengajuanFormWNA3';
import PengajuanFormWNA4 from './components/PengajuanFormWNA4';

function App() {
  // Mengelola langkah-langkah formulir
  // Step 0: Halaman utama
  // Step 1: Formulir Data Ahli Waris (WNI)
  // Step 2: Formulir Data Pewaris (WNI - baru)
  // Step 3: Formulir Data Keluarga (WNI)
  // Step 4: Formulir Dokumen yang Diperlukan (WNI)
  // Step 5: Formulir Opsi Pengiriman (final step untuk WNI & WNA)

  // Step 101: Formulir Data Pemohon (WNA)
  // Step 102: Formulir Data Pewaris (WNA)
  // Step 103: Formulir Data Keluarga (WNA)
  // Step 104: Formulir Dokumen yang Diperlukan (WNA)

  const [step, setStep] = useState(0);

  // Fungsi untuk menyimpan asal alur (WNI atau WNA) sebelum masuk ke langkah akhir bersama
  const [originFlow, setOriginFlow] = useState(null); // 'WNI' atau 'WNA'

  // Fungsi untuk menampilkan notifikasi standar
  const displayNotification = (message) => {
    alert(message);
  };

  // Fungsi untuk memulai alur formulir WNI
  const handleStartWNIForm = () => {
    setOriginFlow('WNI');
    setStep(1);
  };

  // Fungsi untuk memulai alur formulir WNA Tionghoa & Asing
  const handleStartWNAForm = () => {
    setOriginFlow('WNA');
    setStep(101); // Menggunakan step yang berbeda untuk alur WNA
  };

  // Fungsi untuk kembali ke halaman utama
  const handleBackToHome = () => setStep(0);

  return (
    <div>
      <Navbar />

      {/* Tampilan halaman utama saat step 0 */}
      {step === 0 && (
        <>
          <HeroSection />
          {/* Meneruskan fungsi untuk memulai alur WNI dan WNA */}
          <GuideSection onKirimClick={handleStartWNIForm} onKirimWnaClick={handleStartWNAForm} />
          <CompleteGuide onKirimClick={handleStartWNIForm} onKirimWnaClick={handleStartWNAForm} />
        </>
      )}

      {/* Alur Formulir WNI (ID: 1-4, lalu ke 5) */}
      {step === 1 && (
        <PengajuanForm
          onBack={handleBackToHome}
          onNext={() => setStep(2)} // Lanjut ke Data Pewaris WNI
        />
      )}

      {step === 2 && (
        <PengajuanFormPewaris
          onBack={() => setStep(1)} // Kembali ke Data Ahli Waris WNI
          onNext={() => setStep(3)} // Lanjut ke Data Keluarga WNI
        />
      )}

      {step === 3 && (
        <PengajuanFormStep2 // Data Keluarga WNI
          onBack={() => setStep(2)} // Kembali ke Data Pewaris WNI
          onNext={() => setStep(4)} // Lanjut ke Dokumen WNI
        />
      )}

      {step === 4 && (
        <PengajuanFormStep3 // Dokumen WNI
          onBack={() => setStep(3)} // Kembali ke Data Keluarga WNI
          onNext={() => setStep(5)} // Lanjut ke Opsi Pengiriman (final step)
        />
      )}

      {/* Alur Formulir WNI Tionghoa & Asing (ID: 101-104, lalu ke 5) */}
      {step === 101 && (
        <PengajuanFormWNA
          onBack={handleBackToHome}
          onNext={() => setStep(102)} // Lanjut ke Data Pewaris WNA
        />
      )}

      {step === 102 && (
        <PengajuanFormWNA2
          onBack={() => setStep(101)} // Kembali ke Data Pemohon WNA
          onNext={() => setStep(103)} // Lanjut ke Data Keluarga WNA
        />
      )}

      {step === 103 && (
        <PengajuanFormWNA3
          onBack={() => setStep(102)} // Kembali ke Data Pewaris WNA
          onNext={() => setStep(104)} // Lanjut ke Dokumen WNA
        />
      )}

      {step === 104 && (
        <PengajuanFormWNA4
          onBack={() => setStep(103)} // Kembali ke Data Keluarga WNA
          onNext={() => setStep(5)} // Lanjut ke Opsi Pengiriman (final step)
        />
      )}

      {/* Langkah Terakhir: Opsi Pengiriman (digunakan oleh kedua alur: WNI & WNA) */}
      {/* Ini adalah komponen PengajuanFormStep4 yang sebelumnya sudah ada, namun kini menjadi final step */}
      {step === 5 && (
        <PengajuanFormStep4
          onBack={() => {
            // Logika untuk menentukan harus kembali ke alur WNI atau WNA
            if (originFlow === 'WNA') {
                 setStep(104); // Kembali ke langkah terakhir alur WNA
            } else {
                 setStep(4); // Kembali ke langkah terakhir alur WNI
            }
          }}
          onSubmit={() => {
            displayNotification('Pengajuan berhasil diajukan!'); // Menggunakan notifikasi standar
            setStep(0); // Kembali ke halaman utama setelah submit
          }}
        />
      )}
    </div>
  );
}

export default App;
