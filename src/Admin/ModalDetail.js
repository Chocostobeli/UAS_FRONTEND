// src/Admin/ModalDetail.js
import React from 'react';
import '../styles/Form.css'; // Menggunakan CSS yang sudah ada untuk layout form
import './Modal.css';       // CSS khusus untuk modal

const ModalDetail = ({ isOpen, onClose, detailPengajuan }) => {
  if (!isOpen || !detailPengajuan) return null; // Pastikan detailPengajuan ada

  // Helper function untuk merender field. Jika data tidak ada, tampilkan '-'
  const renderField = (label, value) => (
    <div className="form-field">
      <label>{label}:</label>
      <p>{value || '-'}</p> {/* Tampilkan '-' jika nilai kosong/null */}
    </div>
  );

  // Helper function untuk merender link dokumen
  const renderDocumentLink = (label, fileName) => {
    if (!fileName) return renderField(label, 'Tidak ada file');
    const fileUrl = `http://localhost:5000/uploads/final/${fileName}`; // Sesuaikan dengan folder 'final'
    return (
      <div className="form-field">
        <label>{label}:</label>
        <p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="pdf-button">
            {/* Anda bisa menambahkan icon PDF di sini jika punya */}
            Lihat File
          </a>
        </p>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Detail Pengajuan - ID: {detailPengajuan.id}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {/* Data Pemohon (Ahli Waris) */}
          <h3>Data Pemohon (Ahli Waris)</h3>
          {renderField('Nama Lengkap Ahli Waris', detailPengajuan.nama_ahli_waris)}
          {renderField('NIK Ahli Waris', detailPengajuan.nik_ahli_waris)}
          {renderField('Tempat, Tanggal Lahir', detailPengajuan.ttl_ahli_waris)}
          {renderField('Alamat Lengkap Domisili', detailPengajuan.alamat_ahli_waris)}
          {renderField('Nomor Telepon', detailPengajuan.telepon_ahli_waris)}
          {renderField('Email', detailPengajuan.email_ahli_waris)}

          {/* Data Pewaris */}
          <h3>Data Pewaris</h3>
          {renderField('Nama Lengkap Pewaris', detailPengajuan.nama_pewaris)}
          {renderField('KTP Pewaris', detailPengajuan.ktp_pewaris)} {/* Ini jika KTP pewaris diisi teks */}
          {renderField('Tanggal Wafat Pewaris', detailPengajuan.tanggal_wafat_pewaris)}
          {renderField('Alamat Terakhir Pewaris', detailPengajuan.alamat_terakhir_pewaris)}

          {/* Data Keluarga & Saksi */}
          <h3>Data Ahli Waris Lainnya & Saksi</h3>
          {renderField('Jumlah Ahli Waris Lainnya', detailPengajuan.jumlah_ahli_waris)}
          {renderField('Nama Ahli Waris Lainnya', detailPengajuan.nama_ahli_waris_lainnya)}
          {renderField('Nama Saksi 1', detailPengajuan.nama_saksi1)}
          {renderField('NIK Saksi 1', detailPengajuan.nik_saksi1)}
          {renderField('Nama Saksi 2', detailPengajuan.nama_saksi2)}
          {renderField('NIK Saksi 2', detailPengajuan.nik_saksi2)}

          {/* Opsi Pengiriman */}
          <h3>Opsi Pengiriman dan Pengambilan Surat</h3>
          {renderField('Opsi Pengiriman', detailPengajuan.opsi_pengiriman)}
          {renderField('Nama Penerima', detailPengajuan.nama_penerima)}
          {renderField('Nomor Telepon Penerima', detailPengajuan.nomor_telepon_penerima)}
          {renderField('Alamat Pengiriman', detailPengajuan.alamat_pengiriman)}
          {renderField('Pernyataan Benar', detailPengajuan.pernyataan_benar ? 'Ya' : 'Tidak')}


          {/* Dokumen-dokumen */}
          <h3>Dokumen Pendukung</h3>
          {renderDocumentLink('Foto KTP Saksi 1', detailPengajuan.foto_ktp_saksi1)}
          {renderDocumentLink('Foto KTP Saksi 2', detailPengajuan.foto_ktp_saksi2)}
          {renderDocumentLink('Surat Kematian', detailPengajuan.surat_kematian)}
          {renderDocumentLink('KTP Ahli Waris', detailPengajuan.ktp_ahli_waris_file)}
          {renderDocumentLink('Kartu Keluarga', detailPengajuan.kartu_keluarga)}
          {renderDocumentLink('Surat Nikah', detailPengajuan.surat_nikah)}
          {renderDocumentLink('Akta Kelahiran', detailPengajuan.akta_kelahiran)}
          {renderDocumentLink('Surat Kuasa', detailPengajuan.surat_kuasa)}
          {renderDocumentLink('Sertifikat Tanah', detailPengajuan.sertifikat_tanah)}
          {renderDocumentLink('Buku Tabungan', detailPengajuan.buku_tabungan)}

          {/* Tambahkan bagian untuk WNA jika ada */}
          {/* Contoh:
          {detailPengajuan.tipePengajuan === 'WNA' && (
            <>
              <h3>Dokumen WNA</h3>
              {renderDocumentLink('Akta Kematian Pewaris (WNA)', detailPengajuan.dokumenWNA_AktaKematianPewaris)}
              // ... dokumen WNA lainnya
            </>
          )}
          */}
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;