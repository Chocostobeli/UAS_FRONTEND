// src/Admin/AdminProfile.js (pastikan ini kodenya)
import React, { useState, useEffect } from 'react';
import '../Users/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultProfile from '../assets/profile.png';

const AdminProfile = () => {
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('admintoken');
                if (!token) {
                    navigate('/admin/login');
                    return;
                }
                // --- PASTIKAN URL INI: /api/users/profile ---
                const res = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data.user;
                setUser(data);
                setFormData(prevFormData => ({
                    ...prevFormData, // Penting: Pertahankan nilai foto yang sudah ada di state
                    namaLengkap: data.fullName || '',
                    email: data.email || '',
                    whatsapp: data.whatsapp || '',
                    alamat: data.alamat || '',
                    ttl: data.ttl || '',
                    jenisKelamin: data.jenisKelamin || '',
                    // foto: null, // Jangan set foto: null di sini, biarkan state foto diatur hanya oleh handleFileChange
                }));
            } catch (err) {
                console.error('Gagal ambil data profil', err);
                setError('Gagal memuat data profil.');
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('admintoken');
                    navigate('/admin/login');
                    alert('Sesi Anda telah berakhir. Mohon login kembali.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

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

        if (!konfirmasi) return;

        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('admintoken');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            const data = new FormData();

            data.append('namaLengkap', formData.namaLengkap);
            data.append('email', formData.email);
            data.append('whatsapp', formData.whatsapp);
            data.append('alamat', formData.alamat);
            data.append('ttl', formData.ttl);
            data.append('jenisKelamin', formData.jenisKelamin);

            if (formData.foto) {
                data.append('foto', formData.foto);
            }

            console.log('--- Isi FormData yang akan dikirim: ---');
            for (let pair of data.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
            }
            console.log('------------------------------------');


            // --- PASTIKAN URL INI: /api/users/profile ---
            await axios.put('http://localhost:5000/api/users/profile', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Profil berhasil disimpan!');
            // Setelah berhasil update, refresh data yang ditampilkan
            const res = await axios.get('http://localhost:5000/api/users/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.user);
            setFormData(prev => ({
                ...prev,
                namaLengkap: res.data.user.fullName || '',
                email: res.data.user.email || '',
                whatsapp: res.data.user.whatsapp || '',
                alamat: res.data.user.alamat || '',
                ttl: res.data.user.ttl || '',
                jenisKelamin: res.data.user.jenisKelamin || '',
            }));

        } catch (err) {
            console.error('Error saat menyimpan profil:', err.response ? err.response.data : err.message);
            setError('Gagal menyimpan profil.');
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('admintoken');
                navigate('/admin/login');
                alert('Sesi Anda telah berakhir. Mohon login kembali.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin'); // Logout admin
        localStorage.removeItem('admintoken'); // Hapus juga token
        navigate('/admin/login');
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
                <Link to="/admin/riwayat">
                    <button className="sidebar-btn">Riwayat Aktivitas</button>
                </Link>
            </aside>

            <main className="user-main">
                <div className="navbar-card">
                    <div className="user-navbar">
                        <span>Selamat Datang, {formData.namaLengkap || 'nama'}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="user-card">
                    <h3>Detail Profile</h3>
                    {loading ? (
                        <p>Memuat data profil...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <div className="profile-content">
                            <div className="profile-photo">
                                <img
                                    src={
                                        formData.foto
                                            ? URL.createObjectURL(formData.foto)
                                            : user?.foto
                                                ? `http://localhost:5000${user.foto}`
                                                : defaultProfile
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
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminProfile;