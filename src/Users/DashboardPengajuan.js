import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const Pengajuan = () => {
  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Warista</h2>
        <Link to="/profile"><button className="sidebar-btn">Data Diri</button></Link>
        <Link to="/pengajuan"><button className="sidebar-btn active">Pengajuan</button></Link>
      </aside>
      <main className="user-main">
        <div className="user-navbar">
          <span>Selamat Datang, nama</span>
          <button className="logout-btn">Logout</button>
        </div>
        <div className="user-card">
          <h3>Pengajuan</h3>
          <table className="pengajuan-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Muhammad Saleh</td>
                <td>Pengajuan WNI</td>
                <td>14 Juni, 2025 | 16:00</td>
                <td><span className="status-progress">Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DashboardPengajuan;
