import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Warista</h2>
        <Link to="/profile"><button className="sidebar-btn active">Data Diri</button></Link>
        <Link to="/pengajuan"><button className="sidebar-btn">Pengajuan</button></Link>
      </aside>
      <main className="user-main">
        <div className="user-navbar">
          <span>Selamat Datang, nama</span>
          <button className="logout-btn">Logout</button>
        </div>
        <div className="user-card">
          <h3>Detail Profile</h3>
          <div className="profile-photo">
            <img src="https://via.placeholder.com/100" alt="Profile" />
            <button className="upload-btn">Unggah foto</button>
          </div>
          <form className="profile-form">
            <label>Nama Lengkap *</label>
            <input type="text" />

            <label>Email *</label>
            <input type="email" />
            <p className="verified">✅ Email Terverifikasi</p>

            <label>Nomor WhatsApp *</label>
            <input type="text" />

            <label>Alamat *</label>
            <input type="text" />

            <label>Tempat, Tanggal Lahir *</label>
            <input type="text" />

            <label>Jenis Kelamin *</label>
            <div className="radio-group">
              <label><input type="radio" name="gender" /> Perempuan</label>
              <label><input type="radio" name="gender" /> Laki-laki</label>
            </div>

            <button type="submit" className="save-btn">Simpan</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DashboardProfile;
