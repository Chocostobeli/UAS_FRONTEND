import React, { useState, useEffect } from 'react';
import './Profile.css'; // Pastikan CSS ini ada
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Sesuaikan dengan base URL API Anda

const DashboardPengajuan = () => {
  const navigate = useNavigate();
  const [dataPengajuan, setDataPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState(''); // State untuk nama pengguna

  useEffect(() => {
    const fetchUserDataAndSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ambil data user dari localStorage
        const userString = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userString || !token) {
          setError('Anda harus login untuk melihat pengajuan.');
          setLoading(false);
          // Redirect ke halaman login jika tidak ada token atau user
          navigate('/login');
          return;
        }

        const user = JSON.parse(userString);
        setUserEmail(user.email);
        setUserName(user.fullName); // Set nama pengguna

        // Fetch data pengajuan
        const response = await axios.get(`${API_BASE_URL}/dashboard/submissions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataPengajuan(response.data);
      } catch (err) {
        console.error('Error fetching pengajuan:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('Sesi Anda telah berakhir atau token tidak valid. Silakan login kembali.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userEmail');
          navigate('/login');
        } else {
          setError('Gagal memuat data pengajuan. Silakan coba lagi nanti.');
        }
        setDataPengajuan([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndSubmissions();
  }, [navigate]); // Tambahkan navigate sebagai dependency

  const getStatusClass = (status) => {
    if (status === 'pending') return 'status pending';
    if (status === 'approved') return 'status approved';
    if (status === 'rejected') return 'status rejected';
    return '';
  };

  const backbutton = () => {
    navigate('/'); // Redirect ke halaman login
  };

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Warista</h2>
        <Link to="/dashboard/profile"><button className="sidebar-btn">Data Diri</button></Link>
        <Link to="/dashboard/pengajuan"><button className="sidebar-btn active">Pengajuan</button></Link>
      </aside>

      <main className="user-main">
        <div className="navbar-card">
          <div className="user-navbar">
            <span>Selamat Datang, {userName || 'Pengguna'}</span> {/* Tampilkan nama pengguna */}
            <button className="logout-btn" onClick={backbutton}>Kembali</button>
          </div>
        </div>

        <div className="user-card">
          <h3>Daftar Pengajuan Anda ({userEmail})</h3>
          {loading && <p>Memuat data pengajuan...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && dataPengajuan.length === 0 && (
            <p>Anda belum memiliki pengajuan yang diajukan.</p>
          )}
          {!loading && !error && dataPengajuan.length > 0 && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nama Ahli Waris</th>
                    <th>Kategori</th>
                    <th>Tanggal Pengajuan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPengajuan.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>{item.kategori}</td>
                      <td>{new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      <td><span className={getStatusClass(item.status)}>{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPengajuan;