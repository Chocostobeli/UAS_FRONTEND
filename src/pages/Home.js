import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/HeroSection';
import GuideSection from '../components/GuideSection';
import CompleteGuide from '../components/CompleteGuide';

const Home = () => {
  const [step, setStep] = useState(0);
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
    navigate('/pengajuan');
  };

  // Pastikan bagian ini BUKAN DIKOMEN dan ada baris navigate-nya
  const handleStartWNAForm = () => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk mengisi pengajuan.");
      navigate("/login");
      return;
    }
    // Baris ini yang penting:
    navigate('/pengajuan-wna'); 
  };

  return (
    <>
      {step === 0 && (
        <>
          <HeroSection />
          <GuideSection onKirimClick={handleStartWNIForm} onKirimWnaClick={handleStartWNAForm} />
          <CompleteGuide isLoggedIn={isLoggedIn} onKirimClick={handleStartWNIForm} onKirimWnaClick={handleStartWNAForm} />
        </>
      )}
    </>
  );
};

export default Home;