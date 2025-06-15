import React from 'react';

const data = [
  {
    title: 'Syarat Mengurus Surat Keterangan Ahli Waris',
    desc: 'Untuk dapat mengurus surat keterangan ahli waris, dibutuhkan beberapa persyaratan guna melengkapi semua dokumen yang dibutuhkan dalam proses pembuatannya. Perlu diperhatikan, syarat mengurus surat keterangan ahli waris dibedakan bagi warga negara Indonesia (WNI) non-Tionghoa dan non-Timur Asing dan WNI keturunan Tionghoa dan Timur Asing. Penjelasan lengkap tentang syarat mengurus surat keterangan ahli waris akan kami jelaskan di bagian akhir artikel ini.'
  },
  {
    title: 'Prosedur Mengurus Surat Keterangan Ahli Waris Secara Umum',
    desc: 'Dalam mengurus surat keterangan ahli waris, secara umum prosedur yang ditempuh adalah dengan mengumpulkan persyaratan-persyaratan yang dibutuhkan, lalu menghadap ke instansi/petugas terkait, yang aturannya juga dibedakan antara WNI non-Tionghoa dan non-Timur Asing dan WNI keturunan Tionghoa dan Timur Asing.'
  },
  {
    title: 'Manfaat Surat Keterangan Ahli Waris',
    desc: 'Pada dasarnya manfaat serta fungsi dibuatnya surat keterangan ahli waris ini adalah guna menunjukan ahli waris secara sah. Dengan tidak adanya surat keterangan ahli waris tersebut, seseorang yang dinilai memiliki hak atas warisan dapat terhalang dalam mendapatkan harta warisan yang menjadi bagiannya. Dengan pembuktian status sebagai anak pasangan maupun orang tua pun masih belum cukup guna membuatnya memiliki hak sepenuhnya atas harta warisan tersebut. Untuk itu, surat keterangan ahli waris sendiri sangat bermanfaat guna menghindari terjadinya tindakan penyalahgunaan wewenang demi mendapatkan harta waris yang dimiliki oleh pewaris.'
  },
  {
    title: 'Aturan Seputar Surat Keterangan Ahli Waris',
    customContent: (
      <>
        <p>
          Pasal 111 ayat (1) huruf c <strong>Permen ATR/Kepala BPN 16/2021</strong> menerangkan bahwa tanda bukti sebagai ahli waris dapat berupa enam hal, yakni:
        </p>
        <ol>
          <li>wasiat dari pewaris;</li>
          <li>putusan pengadilan;</li>
          <li>penetapan hakim/ketua pengadilan;</li>
          <li>
            surat pernyataan ahli waris yang oleh para ahli waris dengan disaksikan oleh dua orang saksi dan diketahui oleh kepala desa/lurah dan camat tempat tinggal pewaris pada waktu meninggal dunia;
          </li>
          <li>
            akta keterangan hak mewaris dari notaris yang berkedudukan di tempat tinggal pewaris pada waktu meninggal dunia; atau
          </li>
          <li>
            surat keterangan waris dari Balai Harta Peninggalan (BHP).
          </li>
        </ol>
        <p>
          Tanda bukti nomor 4 merupakan surat keterangan yang dapat dibuat oleh warga negara Indonesia (WNI) bukan keturunan asing. Untuk warga negara keturunan dengan pewaris berasal dari golongan Eropa atau Tionghoa perlu mendapatkan tanda bukti nomor 5 (akta dari notaris). Kemudian, golongan timur lainnya (Arab, India, dsb.) perlu mendapat tanda bukti nomor 6 (surat keterangan waris dari BHP). Hal tersebut sesuai dengan ketentuan dalam <strong>Lampiran SEMA 171/1991</strong>.
        </p>
      </>
    )
  }
];

const GuideSection = () => {
  return (
    <section id="blog" style={{ backgroundColor: 'white', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#2F4FFD',
              color: 'white',
              borderRadius: '1rem',
              marginBottom: '2rem',
              padding: '2rem'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              {idx + 1}. {item.title}
            </h2>
            {item.customContent ? (
              <div style={{ lineHeight: '1.6' }}>{item.customContent}</div>
            ) : (
              <p style={{ lineHeight: '1.6' }}>{item.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuideSection;