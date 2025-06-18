import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultProfile from '../assets/profile.png'; // ✅ Import gambar lokal

const DashboardProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    whatsapp: '',
    alamat: '',
    ttl: '',
    jenisKelamin: '',
    foto: null,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.user;
        setUser(data);
        setFormData({
          namaLengkap: data.fullName || '',
          email: data.email || '',
          whatsapp: data.whatsapp || '',
          alamat: data.alamat || '',
          ttl: data.ttl || '',
          jenisKelamin: data.jenisKelamin || '',
          foto: null,
        });
      } catch (err) {
        console.error('Gagal ambil data profil', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) {
        data.append(key, val);
      }
    });

    try {
      await axios.put('http://localhost:5000/api/users/profile', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Profil berhasil disimpan!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan profil.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Warista</h2>
        <Link to="/dashboard/profile">
          <button className="sidebar-btn active">Data Diri</button>
        </Link>
        <Link to="/dashboard/pengajuan">
          <button className="sidebar-btn">Pengajuan</button>
        </Link>
      </aside>

      <main className="user-main">
        <div className="navbar-card">
          <div className="user-navbar">
            <span>Selamat Datang, {formData.namaLengkap || 'nama'}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="user-card">
          <h3>Detail Profile</h3>

          <div className="profile-content">
            <div className="profile-photo">
              <img
                src={
                  formData.foto
                    ? URL.createObjectURL(formData.foto)
                    : user?.foto
                      ? `http://localhost:5000${user.foto}`
                      : defaultProfile // ✅ Gambar lokal fallback
                }
                alt="Profile"
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <label htmlFor="namaLengkap">Nama Lengkap *</label>
              <input id="namaLengkap" name="namaLengkap" type="text" value={formData.namaLengkap} onChange={handleChange} />

              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <p className="verified">Email Terverifikasi</p>

              <label htmlFor="whatsapp">Nomor WhatsApp *</label>
              <input id="whatsapp" name="whatsapp" type="text" value={formData.whatsapp} onChange={handleChange} />

              <label htmlFor="alamat">Alamat *</label>
              <input id="alamat" name="alamat" type="text" value={formData.alamat} onChange={handleChange} />

              <label htmlFor="ttl">Tempat, Tanggal Lahir *</label>
              <input id="ttl" name="ttl" type="text" value={formData.ttl} onChange={handleChange} />

              <label>Jenis Kelamin *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    id="perempuan"
                    value="Perempuan"
                    checked={formData.jenisKelamin === 'Perempuan'}
                    onChange={handleChange}
                  />
                  <label htmlFor="perempuan">Perempuan</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    id="pria"
                    value="Pria"
                    checked={formData.jenisKelamin === 'Pria'}
                    onChange={handleChange}
                  />
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

export default DashboardProfile;
