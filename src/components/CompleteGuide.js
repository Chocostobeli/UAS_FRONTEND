import React from 'react';
import '../styles/CompleteGuide.css';
import { useNavigate } from 'react-router-dom';

const CompleteGuide = ({ isLoggedIn, onKirimClick, onKirimWnaClick }) => {
  const navigate = useNavigate();

  const handleClick = (callback) => {
    if (!isLoggedIn) {
      alert("Silakan login atau registrasi terlebih dahulu.");
      navigate('/login'); // arahkan ke halaman login
      return;
    }
    callback(); // jalankan fungsi pengajuan
  };
  
  return (
    <section id="pengajuan" className="guide-container">
      <h2 className="guide-title">
        Panduan Lengkap untuk <br /> Membuat Surat <span>WARISTA</span>
      </h2>
      <div className="guide-cards">
        <div className="guide-card">
          <h3>Surat Pernyataan Ahli Waris untuk WNI Bukan Keturunan Asing</h3>
          <p>
            Langkah pertama, siapkan dokumen pendukung sebagai berikut:
            <br />1. surat keterangan dari desa atau lurah setempat;
            <br />2. surat keterangan kematian atau akta kematian;
            <br />3. surat pernyataan ahli waris bermeterai;
            <br />4. fotokopi kartu keluarga (KK);
            <br />5. fotokopi KTP;
            <br />6. fotokopi kepemilikan dasar kepemilikan tanah (jika mengurus penyerahan harta warisan).
          </p>
          <p>
            Kedua, datanglah ke kantor kelurahan terdekat dan bawa dokumen tersebut. Petugas akan melakukan verifikasi dan memberikan nomor registrasi. Setelah itu, ajukan ke camat untuk ditandatangani.
          </p>
          <button className="submit-button" onClick={onKirimClick}>
            Kirim Pengajuan (WNI)
          </button>
        </div>

        <div className="guide-card">
          <h3>Cara Mengurus Surat Keterangan Ahli Waris untuk WNI Tionghoa dan Timur Asing</h3>
          <p>
            Berikut dokumen yang perlu disiapkan:
            <br />1. surat permohonan;
            <br />2. surat kuasa dari ahli waris yang didelegasikan;
            <br />3. akta kelahiran ahli waris;
            <br />4. akta kematian yang dilegalisir;
            <br />5. surat waris notaris dari Kemenkumham (Ditjen AHU);
            <br />6. fotokopi KTP dan KK pewaris serta ahli waris.
          </p>
          <p>
            Dokumen dibawa ke kantor kelurahan, diverifikasi lalu camat akan menandatangani dan menerbitkan pengesahan.
          </p>
          <button className="submit-button" onClick={onKirimWnaClick}> {/* Tombol baru */}
            Kirim Pengajuan (WNI Tionghoa & Asing)
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompleteGuide;