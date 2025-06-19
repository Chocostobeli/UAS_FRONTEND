
import React, { useRef } from 'react';
import '../styles/HeroSection.css';
import notarisImage from '../assets/notaris.jpeg';

const HeroSection = () => {
  const guideRef = useRef(null);

  const handleScroll = () => {
    const section = document.getElementById('pengajuan');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-text">
          <p className="tagline">Layanan Ahli Waris Online dengan Standar Notaris</p>
          <h1>Selamat Datang, <span className="highlight">WARISTA</span></h1>
          <p>
            Membuat surat pernyataan ahli waris kini tidak perlu repot atau bingung. Di platform ini, kamu bisa memahami dan mengikuti seluruh tahapan pembuatan surat secara jelas, praktis, dan sesuai hukum yang berlaku. Kami hadir untuk mempermudah proses administrasi warisan agar kamu dan keluarga mendapatkan kepastian secara hukum.
          </p>
          <p>
            Di bawah ini, kamu akan menemukan panduan lengkap mengenai tahapan pembuatan Surat Pernyataan Ahli Waris, mulai dari persiapan dokumen, verifikasi data, hingga penerbitan surat resmi.
          </p>
          <button className="btn" onClick={handleScroll}>
            Panduan Lengkap di Sini →
          </button>
        </div>
        <div className="hero-img">
          <img src={notarisImage} alt="Notary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
