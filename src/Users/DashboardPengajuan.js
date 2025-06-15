import React from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPengajuan = () => {
  const navigate = useNavigate();

  const dataPengajuan = [
    {
      nama: 'Putri Aulia',
      kategori: 'Pengajuan surat WNI Tionghoa & Negara Asing',
      tanggal: '2025-06-15',
      status: 'Pending',
    },
    {
      nama: 'Rafi Ahmad',
      kategori: 'Pengajuan surat WNI',
      tanggal: '2025-06-14',
      status: 'Disetujui',
    },
    {
      nama: 'Dinda Maya',
      kategori: 'Pengajuan surat WNI',
      tanggal: '2025-06-13',
      status: 'Ditolak',
    },
  ];

  const getStatusClass = (status) => {
    if (status === 'Pending') return 'status pending';
    if (status === 'Disetujui') return 'status approved';
    if (status === 'Ditolak') return 'status rejected';
    return '';
  };

  const handleLogout = () => {
    // Tambahkan logika logout kalau ada (hapus token, dll)
    navigate('/');
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
            <span>Selamat Datang, nama</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="user-card">
          <h3>Daftar Pengajuan</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dataPengajuan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nama}</td>
                    <td>{item.kategori}</td>
                    <td>{item.tanggal}</td>
                    <td><span className={getStatusClass(item.status)}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPengajuan;
