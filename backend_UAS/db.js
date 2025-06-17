const mysql = require('mysql2');
require('dotenv').config();

const connectionuasapp = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB1_NAME,
});

const connectionpengajuan = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB2_NAME,
});


connectionuasapp.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL uas_app:', err);
    return;
  }
  console.log('✅ Connected to MySQL uas_app');
});

connectionpengajuan.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL pengajuan:', err);
    return;
  }
  console.log('✅ Connected to MySQL pengajuan');
});


module.exports = connectionuasapp;
module.exports = connectionpengajuan;
