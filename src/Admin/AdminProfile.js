import React from 'react';
import '../Users/Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin'); // Logout
    navigate('/');
  };

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Warista</h2>
        <Link to="/admin/profile">
          <button className="sidebar-btn active">Data Diri</button>
        </Link>
        <Link to="/admin/pengajuan">
          <button className="sidebar-btn">Pengajuan</button>
        </Link>
      </aside>

      <main className="user-main">
        <div className="navbar-card">
          <div className="user-navbar">
            <span>Selamat Datang, Admin</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="user-card">
          <h3>Detail Profile</h3>

          <div className="profile-content">
            <div className="profile-photo">
              <img src="https://via.placeholder.com/100" alt="Profile" />
              <button className="upload-btn">Unggah foto</button>
            </div>

            <form className="profile-form">
              <label htmlFor="nama">Nama Lengkap *</label>
              <input id="nama" type="text" />

              <label htmlFor="email">Email *</label>
              <input id="email" type="email" />
              <p className="verified">✅ Email Terverifikasi</p>

              <label htmlFor="wa">Nomor WhatsApp *</label>
              <input id="wa" type="text" />

              <label htmlFor="alamat">Alamat *</label>
              <input id="alamat" type="text" />

              <label htmlFor="ttl">Tempat, Tanggal Lahir *</label>
              <input id="ttl" type="text" />

              <label>Jenis Kelamin *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input type="radio" name="gender" id="perempuan" />
                  <label htmlFor="perempuan">Perempuan</label>
                </div>
                <div className="radio-option">
                  <input type="radio" name="gender" id="pria" />
                  <label htmlFor="pria">Pria</label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
