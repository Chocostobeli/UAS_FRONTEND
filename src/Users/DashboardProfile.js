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
    foto: null, // foto akan menyimpan objek File
  });

  const [user, setUser] = useState(null); // State untuk data user dari backend

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.user;
        setUser(data); // Simpan data user asli
        setFormData({
          namaLengkap: data.fullName || '',
          email: data.email || '',
          whatsapp: data.whatsapp || '',
          alamat: data.alamat || '',
          ttl: data.ttl || '',
          jenisKelamin: data.jenisKelamin || '',
          foto: null, // Setel foto ke null agar hanya diisi jika ada file baru yang dipilih
        });
      } catch (err) {
        console.error('Gagal ambil data profil', err);
        // Mungkin arahkan ke login jika token tidak valid
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]); // Tambahkan navigate sebagai dependency jika ESLint menyarankan

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    // Pastikan e.target.files ada dan berisi file
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, foto: null })); // Atur ke null jika tidak ada file yang dipilih
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const konfirmasi = window.confirm('Apakah Anda yakin ingin menyimpan perubahan profil?');
    if (!konfirmasi) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      navigate('/login');
      return;
    }

    const dataToSend = new FormData(); // Gunakan nama variabel yang lebih jelas
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) { // Pastikan properti milik objek itu sendiri
        const value = formData[key];

        if (key === 'foto') {
          // Hanya tambahkan file foto jika itu adalah objek File yang valid
          if (value instanceof File) {
            dataToSend.append('foto', value);
          }
          // Jika value adalah null dan tidak ada foto, jangan append apapun
        } else {
          // Untuk field teks, tambahkan hanya jika nilainya tidak null/undefined dan bukan string kosong
          if (value !== null && value !== undefined && value !== '') {
            dataToSend.append(key, value);
          }
        }
      }
    }

    // DEBUG: Log FormData yang akan dikirim (untuk debugging lebih lanjut)
    console.log('FormData yang akan dikirim:');
    for (let pair of dataToSend.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
    }

    try {
      await axios.put('http://localhost:5000/api/users/profile', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Penting: JANGAN SET Content-Type: 'multipart/form-data' secara manual.
          // Axios akan secara otomatis mengaturnya dengan boundary yang benar.
        },
      });
      alert('Profil berhasil disimpan!');
      window.location.reload(); // Reload halaman untuk melihat perubahan
    } catch (err) {
      console.error('Gagal menyimpan profil:', err);
      // Lebih spesifik dalam pesan error ke pengguna
      if (err.response && err.response.data && err.response.data.message) {
        alert('Gagal menyimpan profil: ' + err.response.data.message);
      } else {
        alert('Gagal menyimpan profil. Silakan coba lagi.');
      }
    }
  };


  const backbutton = () => {
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
            <button className="logout-btn" onClick={backbutton}>Kembali</button>
          </div>
        </div>

        <div className="user-card">
          <h3>Detail Profile</h3>

          <div className="profile-content">
            <div className="profile-photo">
              <img
                src={
                  formData.foto // Jika ada file baru yang dipilih di form
                    ? URL.createObjectURL(formData.foto) // Tampilkan preview file baru
                    : user?.foto // Jika tidak ada file baru, dan ada foto lama dari user
                      ? `http://localhost:5000${user.foto}` // Tampilkan foto lama
                      : defaultProfile // Jika tidak ada keduanya, tampilkan default
                }
                alt="Profile"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name="foto" // <-- PASTIKAN INI ADA!
                id="profileFotoInput" // Tambahkan ID untuk label jika perlu
                style={{ display: 'none' }} // Sembunyikan input asli
              />
              {/* Tambahkan tombol kustom untuk memilih file */}
              <button
                type="button"
                className="choose-photo-btn"
                onClick={() => document.getElementById('profileFotoInput').click()}
              >
                Pilih Foto
              </button>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <label htmlFor="namaLengkap">Nama Lengkap *</label>
              <input id="namaLengkap" name="namaLengkap" type="text" value={formData.namaLengkap} onChange={handleChange} />

              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />

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