import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import GuideSection from './components/GuideSection';
import Navbar from './components/Navbar';
import CompleteGuide from './components/CompleteGuide';
import PengajuanForm from './components/PengajuanForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(true);
  const handleBack = () => setShowForm(false);

  return (
    <div>
      <Navbar />
      {!showForm ? (
        <>
          <HeroSection />
          <GuideSection onKirimClick={handleShowForm} />
          <CompleteGuide onKirimClick={handleShowForm} />
        </>
      ) : (
        <PengajuanForm onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
