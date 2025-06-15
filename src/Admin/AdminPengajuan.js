
import React, { useState } from 'react';
import '../Users/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import ModalDetail from './ModalDetail';

const AdminPengajuan = () => {
  const navigate = useNavigate();

  const [dataPengajuan, setDataPengajuan] = useState([
    {
      id: 'AJU-WNI-001',
      tipePengajuan: 'WNI',
      namaPemohon: 'Muhammad Saleh',
      status: 'Proses',
      tanggal: '2025-06-15',
      // Data lengkap dummy untuk modal
      namaLengkapAhliWaris: 'Muhammad Saleh',
      nomorKTP: '2310501100',
      tempatTanggalLahir: 'Jakarta, 1 Juli 2001',
      alamatLengkap: 'Pondok Cabe Jauhan Dikit No. 2, Tangerang Selatan',
      nomorHP: '08282828212',
      email: 'salehnyaa@gmail.com',
      namaLengkapPewaris: 'Alm. Muhammad Solimih',
      tanggalWafatPewaris: '2024-06-01',
      alamatTerakhirPewaris: 'Pondok Cina Deketan Cabe No. 5, Depok',
      jumlahAhliWarisLainnya: '2',
      namaAhliWarisLainnya: '1. Sakinah Mawadah\n2. Popo Shiroyou',
      namaSaksi1: 'Sakinah Mawadah',
      nikSaksi1: '292398498',
      fotoKtpSaksi1: 'dummy_ktp_saksi1.pdf',
      namaSaksi2: 'Popo Shiroyou',
      nikSaksi2: '2237812736028730',
      fotoKtpSaksi2: 'dummy_ktp_saksi2.pdf',

      // Dokumen WNI
      dokumenWNI_SuratKematian: 'dummy_surat_kematian_saleh.pdf',
      dokumenWNI_KtpAhliWaris: 'dummy_ktp_ahli_waris_saleh.pdf',
      dokumenWNI_KartuKeluarga: 'dummy_kartu_keluarga_saleh.pdf',
      dokumenWNI_SuratNikah: '', // Opsional, kosong
      dokumenWNI_AktaLahir: 'dummy_akta_kelahiran_saleh.pdf',
      dokumenWNI_SuratKuasaAhliWaris: '', // Opsional, kosong
      dokumenWNI_SertifikatTanahRumah: 'dummy_sertifikat_tanah_saleh.pdf',
      dokumenWNI_BukuTabungan: 'dummy_buku_tabungan_saleh.pdf',

      // Dokumen WNI Tionghoa dan Asing (dikosongkan untuk WNI)
      dokumenWNA_AktaKematianPewaris: '',
      dokumenWNA_KtpPemohon: '',
      dokumenWNA_KartuKeluarga: '',
      dokumenWNA_AktaLahirAnak: '',
      dokumenWNA_SuratNikahPewaris: '',
      dokumenWNA_SuratKuasaAhliWarisLain: '',
      dokumenWNA_HasilPengecekanWasiatAHU: '',
      dokumenWNA_SertifikatHakMilik: '',
      dokumenWNA_SPPT_PBBTerakhir: '',
      dokumenWNA_BukuTabunganPewaris: '',
    },
    {
      id: 'AJU-WNA-002',
      tipePengajuan: 'WNI Tionghoa & Asing',
      namaPemohon: 'Putri Aulia',
      status: 'Pending',
      tanggal: '2025-06-14',
      // Data lengkap dummy untuk modal
      namaLengkapAhliWaris: 'Putri Aulia',
      nomorKTP: '9876543210',
      tempatTanggalLahir: 'Bandung, 10 Maret 1995',
      alamatLengkap: 'Jl. Melati No. 10, Bandung',
      nomorHP: '08123456789',
      email: 'putri.aulia@example.com',
      namaLengkapPewaris: 'Alm. John Chen',
      tanggalWafatPewaris: '2023-11-20',
      alamatTerakhirPewaris: 'Jl. Anggrek No. 5, Jakarta',
      jumlahAhliWarisLainnya: '1',
      namaAhliWarisLainnya: 'Herman Chen',
      namaSaksi1: 'Lim Chandra',
      nikSaksi1: '1122334455',
      fotoKtpSaksi1: 'dummy_ktp_saksi_lim.pdf',
      namaSaksi2: '',
      nikSaksi2: '',
      fotoKtpSaksi2: '',

      // Dokumen WNI (dikosongkan untuk WNA)
      dokumenWNI_SuratKematian: '',
      dokumenWNI_KtpAhliWaris: '',
      dokumenWNI_KartuKeluarga: '',
      dokumenWNI_SuratNikah: '',
      dokumenWNI_AktaLahir: '',
      dokumenWNI_SuratKuasaAhliWaris: '',
      dokumenWNI_SertifikatTanahRumah: '',
      dokumenWNI_BukuTabungan: '',

      // Dokumen WNI Tionghoa dan Asing
      dokumenWNA_AktaKematianPewaris: 'dummy_akta_kematian_pewaris_putri.pdf',
      dokumenWNA_KtpPemohon: 'dummy_ktp_pemohon_putri_wna.pdf',
      dokumenWNA_KartuKeluarga: 'dummy_kk_putri_wna.pdf',
      dokumenWNA_AktaLahirAnak: '', // Jika tersedia
      dokumenWNA_SuratNikahPewaris: 'dummy_surat_nikah_pewaris_putri_wna.pdf',
      dokumenWNA_SuratKuasaAhliWarisLain: 'dummy_surat_kuasa_ahli_waris_lain_putri_wna.pdf',
      dokumenWNA_HasilPengecekanWasiatAHU: 'dummy_hasil_ahu_putri.pdf',
      dokumenWNA_SertifikatHakMilik: 'dummy_sertifikat_hak_milik_putri_wna.pdf',
      dokumenWNA_SPPT_PBBTerakhir: 'dummy_sppt_pbb_putri.pdf',
      dokumenWNA_BukuTabunganPewaris: 'dummy_buku_tabungan_pewaris_putri_wna.pdf',
    },
    {
      id: 'AJU-WNI-003',
      tipePengajuan: 'WNI',
      namaPemohon: 'Rafi Ahmad',
      status: 'Disetujui',
      tanggal: '2025-06-13',
      // Data lengkap dummy untuk modal
      namaLengkapAhliWaris: 'Rafi Ahmad',
      nomorKTP: '1122334455',
      tempatTanggalLahir: 'Surabaya, 5 Mei 1980',
      alamatLengkap: 'Jl. Raya No. 10, Surabaya',
      nomorHP: '08567890123',
      email: 'rafi.ahmad@example.com',
      namaLengkapPewaris: 'Alm. Siti Aminah',
      tanggalWafatPewaris: '2022-01-10',
      alamatTerakhirPewaris: 'Jl. Kebon Jeruk No. 30, Surabaya',
      jumlahAhliWarisLainnya: '0',
      namaAhliWarisLainnya: '-',
      namaSaksi1: 'Budi Hartono',
      nikSaksi1: '9988776655',
      fotoKtpSaksi1: 'dummy_ktp_saksi_budi.pdf',
      namaSaksi2: 'Citra Dewi',
      nikSaksi2: '4433221100',
      fotoKtpSaksi2: 'dummy_ktp_saksi_citra.pdf',

      // Dokumen WNI
      dokumenWNI_SuratKematian: 'dummy_surat_kematian_rafi.pdf',
      dokumenWNI_KtpAhliWaris: 'dummy_ktp_ahli_waris_rafi.pdf',
      dokumenWNI_KartuKeluarga: 'dummy_kartu_keluarga_rafi.pdf',
      dokumenWNI_SuratNikah: 'dummy_surat_nikah_rafi.pdf',
      dokumenWNI_AktaLahir: '',
      dokumenWNI_SuratKuasaAhliWaris: '',
      dokumenWNI_SertifikatTanahRumah: '',
      dokumenWNI_BukuTabungan: 'dummy_buku_tabungan_rafi.pdf',

      // Dokumen WNI Tionghoa dan Asing (dikosongkan untuk WNI)
      dokumenWNA_AktaKematianPewaris: '',
      dokumenWNA_KtpPemohon: '',
      dokumenWNA_KartuKeluarga: '',
      dokumenWNA_AktaLahirAnak: '',
      dokumenWNA_SuratNikahPewaris: '',
      dokumenWNA_SuratKuasaAhliWarisLain: '',
      dokumenWNA_HasilPengecekanWasiatAHU: '',
      dokumenWNA_SertifikatHakMilik: '',
      dokumenWNA_SPPT_PBBTerakhir: '',
      dokumenWNA_BukuTabunganPewaris: '',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPengajuanDetail, setSelectedPengajuanDetail] = useState(null);

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
    localStorage.removeItem('admin');
    navigate('/');
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
                {dataPengajuan.map((item, index) => (
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

      <ModalDetail
        isOpen={modalOpen}
        onClose={handleCloseModal}
        detailPengajuan={selectedPengajuanDetail}
      />
    </div>
  );
};

export default AdminPengajuan;
