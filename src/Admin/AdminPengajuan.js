import React, { useState } from 'react';
import '../Users/Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminPengajuan = () => {
  const navigate = useNavigate();

  const [dataPengajuan, setDataPengajuan] = useState([
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
  ]);

  const getDropdownClass = (status) => {
    if (status === 'Pending') return 'status-dropdown pending';
    if (status === 'Disetujui') return 'status-dropdown approved';
    if (status === 'Ditolak') return 'status-dropdown rejected';
    if (status === 'Proses') return 'status-dropdown process';
    return 'status-dropdown';
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...dataPengajuan];
    updatedData[index].status = newStatus;
    setDataPengajuan(updatedData);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin/dashboard/profile"><button className="sidebar-btn">Data Diri</button></Link>
        <Link to="/admin/dashboard/pengajuan"><button className="sidebar-btn active">Pengajuan</button></Link>
      </aside>

      <main className="user-main">
        <div className="navbar-card">
          <div className="user-navbar">
            <span>Selamat Datang, Admin</span>
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
                  <th>Aksi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dataPengajuan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nama}</td>
                    <td>{item.kategori}</td>
                    <td>{item.tanggal}</td>
                    <td>
                      <Link to={`/admin/detail/${index}`} className="detail-link">Lihat Detail</Link>
                    </td>
                    <td>
                      <select
                        value={item.status}
                        className={getDropdownClass(item.status)}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Proses">Proses</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </td>
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

export default AdminPengajuan;
