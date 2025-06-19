import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/HeroSection';
import GuideSection from '../components/GuideSection';
import CompleteGuide from '../components/CompleteGuide';
import PengajuanForm from '../components/PengajuanForm'; 
import PengajuanFormStep2 from '../components/PengajuanFormStep2'; 
import PengajuanFormStep3 from '../components/PengajuanFormStep3'; 
import PengajuanFormStep4 from '../components/PengajuanFormStep4'; 
import PengajuanFormStep5 from '../components/PengajuanFormStep5'; 
import PengajuanFormWNA from '../components/PengajuanFormWNA';
import PengajuanFormWNA2 from '../components/PengajuanFormWNA2';
import PengajuanFormWNA3 from '../components/PengajuanFormWNA3';
import PengajuanFormWNA4 from '../components/PengajuanFormWNA4';

const Home = () => {
  const [step, setStep] = useState(0);
  const [originFlow, setOriginFlow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const displayNotification = (message) => {
    alert(message);
  };

  const handleStartWNIForm = () => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk mengisi pengajuan.");
      navigate("/login");
      return;
    }
    setOriginFlow("WNI");
    navigate('/pengajuan');
  };

  const handleStartWNAForm = () => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk mengisi pengajuan.");
      navigate("/login");
      return;
    }
    setOriginFlow("WNA");
    setStep(101);
  };

  const handleBackToHome = () => setStep(0);

  return (
    <>
      {step === 0 && (
        <>
          <HeroSection />
          <GuideSection onKirimClick={handleStartWNIForm} onKirimWnaClick={handleStartWNAForm} />
          <CompleteGuide isLoggedIn={isLoggedIn} onKirimClick={handleStartWNIForm} onKirimWnaClick={handleStartWNAForm} />
        </>
      )}

      {/* WNI */}
      {/* {step === 1 && <PengajuanForm onBack={handleBackToHome} onNext={() => setStep(2)} />}
      {step === 2 && <PengajuanFormStep2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <PengajuanFormStep3 onBack={() => setStep(2)} onNext={() => setStep(4)} />}
      {step === 4 && <PengajuanFormStep4 onBack={() => setStep(3)} onNext={() => setStep(5)} />} */}

      {/* WNA */}
      {step === 101 && <PengajuanFormWNA onBack={handleBackToHome} onNext={() => setStep(102)} />}
      {step === 102 && <PengajuanFormWNA2 onBack={() => setStep(101)} onNext={() => setStep(103)} />}
      {step === 103 && <PengajuanFormWNA3 onBack={() => setStep(102)} onNext={() => setStep(104)} />}
      {step === 104 && <PengajuanFormWNA4 onBack={() => setStep(103)} onNext={() => setStep(5)} />}

      {/* Final Step */}
      {step === 5 && (
        <PengajuanFormStep5
          onBack={() => {
            if (originFlow === 'WNA') {
              setStep(104);
            } else {
              setStep(4);
            }
          }}
          onSubmit={() => {
            displayNotification('Pengajuan berhasil diajukan!');
            setStep(0);
          }}
        />
      )}
    </>
  );
};

export default Home;