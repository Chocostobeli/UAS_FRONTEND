import React, { useState, useEffect } from 'react';
import '../Users/Profile.css'; // Adjust path if necessary
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultProfile from '../assets/profile.png'; // Make sure this path is correct

const AdminProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    whatsapp: '',
    alamat: '',
    ttl: '',
    jenisKelamin: '',
    foto: null, // This will hold the File object for upload
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        // *** IMPORTANT CHANGE 1: Use the correct admin token key ***
        const adminToken = localStorage.getItem('adminToken'); // Ensure this matches your admin login token storage

        if (!adminToken) {
          console.warn('No admin token found, redirecting to admin login.');
          navigate('/admin/login');
          return;
        }

        // *** IMPORTANT CHANGE 2: Use the new admin-specific GET endpoint ***
        const res = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });

        // *** IMPORTANT CHANGE 3: Expect data under 'admin' key from the backend ***
        const data = res.data.admin;
        setUser(data);
        setFormData({
          namaLengkap: data.fullName || '',
          email: data.email || '',
          whatsapp: data.whatsapp || '',
          alamat: data.alamat || '',
          ttl: data.ttl || '',
          jenisKelamin: data.jenisKelamin || '',
          foto: null, // Reset foto to null for display, as the actual file is not kept in state
        });
        setLoading(false);
      } catch (err) {
        console.error('Gagal mengambil data profil admin:', err);
        setError('Gagal memuat profil admin. Silakan coba lagi.');
        setLoading(false);
        // Redirect to login if unauthorized or forbidden
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.error('Authentication error, clearing admin token.');
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    };

    fetchAdminProfile();
  }, [navigate]); // Add navigate to dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const konfirmasi = window.confirm('Apakah Anda yakin ingin menyimpan perubahan profil?');

    if (!konfirmasi) {
      console.log('Perubahan profil dibatalkan.');
      return;
    }

    // *** IMPORTANT CHANGE 4: Use the correct admin token key for updates ***
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      alert('Anda tidak terautentikasi sebagai admin. Silakan login kembali.');
      navigate('/admin/login');
      return;
    }

    const data = new FormData();
    // Append all text fields from formData
    Object.entries(formData).forEach(([key, val]) => {
      // Only append if the value is not null, otherwise FormData might send "null" string
      if (val !== null && key !== 'foto') { // Exclude 'foto' if it's null (no new file selected)
        data.append(key, val);
      }
    });

    // Append the file if it exists
    if (formData.foto) {
      data.append('foto', formData.foto);
    } else {
        // If foto is null, explicitly send a signal to backend if needed to clear photo
        // Or backend can just ignore missing foto
        // Example: data.append('foto', 'null');
    }

    try {
      // *** IMPORTANT CHANGE 5: Call the new admin-specific PUT endpoint ***
      await axios.put('http://localhost:5000/api/admin/profile', data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          // Axios automatically sets Content-Type to 'multipart/form-data' for FormData objects
        },
      });

      alert('Profil admin berhasil disimpan!');
      window.location.reload(); // Reload the page to show updated data and clear file input
    } catch (err) {
      console.error('Gagal menyimpan profil admin:', err.response ? err.response.data : err.message);
      alert('Gagal menyimpan profil admin. Silakan coba lagi.');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    // *** IMPORTANT CHANGE 6: Remove the admin-specific token on logout ***
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Display loading and error messages
  if (loading) {
    return <div className="user-container">Memuat profil admin...</div>;
  }

  if (error) {
    return <div className="user-container" style={{ color: 'red', padding: '20px', textAlign: 'center' }}>{error}</div>;
  }

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
        <Link to="/admin/riwayat">
          <button className="sidebar-btn">Riwayat Aktivitas</button>
        </Link>
      </aside>

      <main className="user-main">
        <div className="navbar-card">
          <div className="user-navbar">
            <span>Selamat Datang, {formData.namaLengkap || 'Admin'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="user-card">
          <h3>Detail Profile Admin</h3>

          <div className="profile-content">
            <div className="profile-photo">
              <img
                src={
                  formData.foto
                    ? URL.createObjectURL(formData.foto) // Preview selected new image
                    : user?.foto
                      ? `http://localhost:5000${user.foto}` // Display existing image from backend
                      : defaultProfile // Fallback to local default image
                }
                alt="Profile Admin"
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

export default AdminProfile;
