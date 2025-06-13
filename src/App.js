import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GuideSection from './components/GuideSection';
import CompleteGuide from './components/CompleteGuide';
import PengajuanForm from './components/PengajuanForm';
import PengajuanFormStep2 from './components/PengajuanFormStep2';
import PengajuanFormStep3 from './components/PengajuanFormStep3';
import PengajuanFormStep4 from './components/PengajuanFormStep4';

function App() {
  // Step 0: Home page
  // Step 1: Form Step 1
  // Step 2: Form Step 2
  // Step 3: Form Step 3
  // Step 4: Form Step 4 (last)
  const [step, setStep] = useState(0);

  const handleShowForm = () => setStep(1);
  const handleBackToHome = () => setStep(0);

  return (
    <div>
      <Navbar />

      {step === 0 && (
        <>
          <HeroSection />
          <GuideSection onKirimClick={handleShowForm} />
          <CompleteGuide onKirimClick={handleShowForm} />
        </>
      )}

      {step === 1 && (
        <PengajuanForm
          onBack={handleBackToHome}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <PengajuanFormStep2
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <PengajuanFormStep3
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <PengajuanFormStep4
          onBack={() => setStep(3)}
          onSubmit={() => {
            alert('Pengajuan berhasil diajukan!');
            setStep(0); // kembali ke home
          }}
        />
      )}
    </div>
  );
}

export default App;
