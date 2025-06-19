// src/Admin/AdminRiwayat.js
import React, { useState, useEffect, useCallback } from 'react'; // Tambahkan useCallback
import { Link, useNavigate } from 'react-router-dom';
import '../Users/Profile.css';
import axios from 'axios'; // Import axios

const AdminRiwayat = () => {
  const navigate = useNavigate();

  // Ubah ini menjadi state kosong yang akan diisi dari API
  const [allPengajuan, setAllPengajuan] = useState([]);
  const [filteredPengajuan, setFilteredPengajuan] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk error

  // Fungsi untuk mengambil data dari backend
  const fetchRiwayatData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token'); // Asumsi token disimpan di localStorage
      if (!token) {
        // Jika tidak ada token, mungkin redirect ke halaman login admin
        navigate('/admin/login');
        return;
      }

      // Endpoint yang sesuai dengan yang Anda definisikan di routes/adminRoutes.js
      const res = await axios.get('http://localhost:5000/api/admin/riwayat', {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token untuk otentikasi
        },
      });
      console.log("Data riwayat dari API:", res.data); // Untuk debugging

      setAllPengajuan(res.data); // Simpan data mentah dari API
      setFilteredPengajuan(res.data); // Awalnya, tampilkan semua data

    } catch (err) {
      console.error('Gagal mengambil data riwayat:', err);
      setError('Gagal mengambil data riwayat. Silakan coba lagi.');
      // Handle error, misalnya token kadaluarsa
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
        alert('Sesi Anda telah berakhir. Mohon login kembali.');
      } else {
        alert('Terjadi kesalahan saat mengambil riwayat aktivitas.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]); // navigate ditambahkan ke dependency array

  // Efek untuk memanggil API saat komponen pertama kali dimuat
  useEffect(() => {
    fetchRiwayatData();
  }, [fetchRiwayatData]); // Panggil fetchRiwayatData saat komponen dimuat

  // Efek untuk memfilter data setiap kali tanggal atau kategori berubah
  // Dan sekarang juga bergantung pada allPengajuan yang diambil dari API
  useEffect(() => {
    let tempPengajuan = allPengajuan; // Gunakan data dari state, bukan const hardcoded

    // Filter berdasarkan tanggal
    if (selectedDate) {
      tempPengajuan = tempPengajuan.filter(item => item.tanggal === selectedDate);
    }

    // Filter berdasarkan kategori
    if (selectedCategory) {
      if (selectedCategory === 'WNI') {
        tempPengajuan = tempPengajuan.filter(item => item.kategori === 'WNI');
      } else if (selectedCategory === 'WNI Tionghoa & Asing') {
        tempPengajuan = tempPengajuan.filter(item => item.kategori === 'WNA'); // Perhatikan di backend Anda kategorinya 'WNA'
      }
    }

    setFilteredPengajuan(tempPengajuan);
  }, [selectedDate, selectedCategory, allPengajuan]); // allPengajuan ditambahkan ke dependency array

  const getStatusClass = (status) => {
    if (status === 'Pending') return 'status pending';
    if (status === 'Disetujui') return 'status approved';
    if (status === 'Ditolak') return 'status rejected';
    if (status === 'Proses') return 'status process';
    return '';
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Pastikan menghapus 'token' yang benar
    navigate('/admin/login'); // Arahkan ke halaman login admin
  };

  // Hapus baris ini karena todayFormatted tidak digunakan
  // const today = new Date();
  // const yyyy = today.getFullYear();
  // const mm = String(today.getMonth() + 1).padStart(2, '0');
  // const dd = String(today.getDate()).padStart(2, '0');
  // const todayFormatted = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin/profile">
          <button className="sidebar-btn">Data Diri</button>
        </Link>
        <Link to="/admin/pengajuan">
          <button className="sidebar-btn">Pengajuan</button>
        </Link>
        <Link to="/admin/riwayat">
          <button className="sidebar-btn active">Riwayat Aktivitas</button>
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
          <h3>Riwayat Aktivitas</h3>

          <div className="filter-controls" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            {/* Dropdown Filter Tanggal */}
            <div className="form-field" style={{ flex: 1, minWidth: '150px' }}>
              <label htmlFor="filterDate" style={{ marginBottom: '5px', display: 'block' }}>Filter Tanggal:</label>
              <input
                type="date"
                id="filterDate"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>

            {/* Dropdown Filter Kategori */}
            <div className="form-field" style={{ flex: 1, minWidth: '150px' }}>
              <label htmlFor="filterCategory" style={{ marginBottom: '5px', display: 'block' }}>Filter Kategori:</label>
              <select
                id="filterCategory"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              >
                <option value="">Semua Kategori</option>
                <option value="WNI">WNI</option>
                <option value="WNI Tionghoa & Asing">WNI Tionghoa & Asing</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            {loading ? (
              <p style={{ textAlign: 'center' }}>Memuat data riwayat...</p>
            ) : error ? (
              <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nama User</th>
                    <th>Kegiatan</th>
                    <th>Kategori</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPengajuan.length > 0 ? (
                    filteredPengajuan.map((item) => (
                      <tr key={item.id}> {/* Pastikan item.id itu unik */}
                        <td>{item.nama}</td>
                        <td>{item.kegiatan}</td>
                        <td>{item.kategori}</td>
                        <td>{`${item.tanggal} | ${item.waktu}`}</td>
                        <td>
                          <span className={getStatusClass(item.status)}>{item.status}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center' }}>Tidak ada riwayat untuk filter ini.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRiwayat;