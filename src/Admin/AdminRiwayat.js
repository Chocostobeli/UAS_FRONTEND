// src/Admin/AdminRiwayat.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Users/Profile.css'; 

const AdminRiwayat = () => {
  const navigate = useNavigate();

  // Data dummy pengajuan
  const allPengajuan = [
    {
      id: 1,
      nama: 'Muhammad Saleh',
      kegiatan: 'Mengajukan wm Muhhamad Salah',
      kategori: 'WNI',
      tanggal: '2025-06-15',
      waktu: '10:00',
      status: 'Proses',
    },
    {
      id: 2,
      nama: 'Putri Aulia',
      kegiatan: 'Pengajuan surat',
      kategori: 'WNI Tionghoa & Asing',
      tanggal: '2025-06-15',
      waktu: '11:30',
      status: 'Pending',
    },
    {
      id: 3,
      nama: 'Rafi Ahmad',
      kegiatan: 'Pengajuan surat',
      kategori: 'WNI',
      tanggal: '2025-06-14',
      waktu: '09:00',
      status: 'Disetujui',
    },
    {
      id: 4,
      nama: 'Dinda Maya',
      kegiatan: 'Pengajuan surat',
      kategori: 'WNI Tionghoa & Asing',
      tanggal: '2025-06-13',
      waktu: '14:00',
      status: 'Ditolak',
    },
    {
      id: 5,
      nama: 'Budi Santoso',
      kegiatan: 'Pengajuan surat',
      kategori: 'WNI',
      tanggal: '2025-06-15',
      waktu: '16:00',
      status: 'Proses',
    },
  ];

  const [filteredPengajuan, setFilteredPengajuan] = useState(allPengajuan);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Efek untuk memfilter data setiap kali tanggal atau kategori berubah
  useEffect(() => {
    let tempPengajuan = allPengajuan;

    // Filter berdasarkan tanggal
    if (selectedDate) {
      tempPengajuan = tempPengajuan.filter(item => item.tanggal === selectedDate);
    }

    // Filter berdasarkan kategori
    if (selectedCategory) {
      if (selectedCategory === 'WNI') {
        tempPengajuan = tempPengajuan.filter(item => item.kategori === 'WNI');
      } else if (selectedCategory === 'WNI Tionghoa & Asing') {
        tempPengajuan = tempPengajuan.filter(item => item.kategori === 'WNI Tionghoa & Asing');
      }
    }

    setFilteredPengajuan(tempPengajuan);
  }, [selectedDate, selectedCategory]);

  const getStatusClass = (status) => {
    if (status === 'Pending') return 'status pending';
    if (status === 'Disetujui') return 'status approved';
    if (status === 'Ditolak') return 'status rejected';
    if (status === 'Proses') return 'status process';
    return '';
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
  const dd = String(today.getDate()).padStart(2, '0');
  const todayFormatted = `${yyyy}-${mm}-${dd}`;

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
                    <tr key={item.id}>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRiwayat;