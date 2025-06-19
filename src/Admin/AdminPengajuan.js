import React, { useState, useEffect } from 'react'; // Import useEffect
import '../Users/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import ModalDetail from './ModalDetail';
import axios from 'axios'; // Import axios

const AdminPengajuan = () => {
  const navigate = useNavigate();

  const [dataPengajuan, setDataPengajuan] = useState([]); // Initialize as empty array
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPengajuanDetail, setSelectedPengajuanDetail] = useState(null);

  // --- New: Fetch data on component mount ---
  useEffect(() => {
    const fetchPengajuanData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you use a token for admin authentication
        if (!token) {
          navigate('/admin/login'); // Redirect to login if no token
          return;
        }

        // Replace with your actual API endpoint for fetching all submissions
        const res = await axios.get('http://localhost:5000/api/admin/pengajuan', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Raw data pengajuan from API:", res.data); // Log to see what you get

        // Assuming res.data is an array of pengajuan objects
        setDataPengajuan(res.data);
      } catch (err) {
        console.error('Gagal mengambil data pengajuan:', err);
        // Handle error, e.g., show an alert or redirect
        if (err.response && err.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            navigate('/admin/login');
            alert('Sesi Anda telah berakhir. Mohon login kembali.');
        } else {
            alert('Gagal mengambil data pengajuan.');
        }
      }
    };

    fetchPengajuanData();
  }, [navigate]); // Add navigate to dependency array

  const getDropdownClass = (status) => {
    if (status === 'Pending') return 'status-dropdown pending';
    if (status === 'Disetujui') return 'status-dropdown approved';
    if (status === 'Ditolak') return 'status-dropdown rejected';
    if (status === 'Proses') return 'status-dropdown process';
    return 'status-dropdown';
  };

  // --- Modified: Send status update to backend ---
  const handleStatusChange = async (id, newStatus) => {
    const konfirmasi = window.confirm(`Anda yakin ingin mengubah status pengajuan ${id} menjadi ${newStatus}?`);
    if (!konfirmasi) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      // Replace with your actual API endpoint for updating submission status
      // You might need to adjust the URL and data structure based on your backend API
      await axios.put(`http://localhost:5000/api/admin/pengajuan/${id}/status`, 
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Optimistically update the UI if the API call is successful
      setDataPengajuan((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      alert('Status berhasil diperbarui!');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Gagal memperbarui status. Silakan coba lagi.');
      // Handle specific errors like 401 (unauthorized)
      if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/admin/login');
          alert('Sesi Anda telah berakhir. Mohon login kembali.');
      } else if (err.response && err.response.data && err.response.data.message) {
          alert('Gagal memperbarui status: ' + err.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Make sure you remove the correct item, e.g., 'token' or 'admin'
    navigate('/admin/login'); // Navigate to admin login, not root, if this is an admin logout
  };

  const handleLihatDetail = (pengajuan) => {
    setSelectedPengajuanDetail(pengajuan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPengajuanDetail(null);
  };

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin/profile">
          <button className="sidebar-btn">Data Diri</button>
        </Link>
        <Link to="/admin/pengajuan">
          <button className="sidebar-btn active">Pengajuan</button>
        </Link>
        <Link to="/admin/riwayat">
          <button className="sidebar-btn">Riwayat Aktivitas</button>
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
          <h3>Daftar Pengajuan</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama Pemohon</th>
                  <th>Kategori</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dataPengajuan.length > 0 ? ( // Add a check for dataPengajuan length
                  dataPengajuan.map((item) => (
                    <tr key={item.id}>
                      <td>{item.namaPemohon}</td>
                      <td>{item.tipePengajuan}</td>
                      <td>{item.tanggal}</td>
                      <td>
                        <button className="detail-button" onClick={() => handleLihatDetail(item)}>
                          Lihat Detail
                        </button>
                      </td>
                      <td>
                        <select
                          value={item.status}
                          className={getDropdownClass(item.status)}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)} // Pass item.id
                        >
                          <option value="Pending">Pending</option>
                          <option value="Proses">Proses</option>
                          <option value="Disetujui">Disetujui</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Tidak ada data pengajuan yang tersedia.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ModalDetail
        isOpen={modalOpen}
        onClose={handleCloseModal}
        detailPengajuan={selectedPengajuanDetail}
      />
    </div>
  );
};

export default AdminPengajuan;