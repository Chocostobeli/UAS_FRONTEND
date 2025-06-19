import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './autentikasi/Login';
import Register from './autentikasi/Register';
import DashboardProfile from './Users/DashboardProfile';
import DashboardPengajuan from './Users/DashboardPengajuan';
import Home from './pages/Home';
import LoginAdmin from './Admin/LoginAdmin';
import RegisterAdmin from './Admin/RegisterAdmin';
import AdminProfile from './Admin/AdminProfile';
import AdminPengajuan from './Admin/AdminPengajuan';
import AdminRiwayat from './Admin/AdminRiwayat';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import PengajuanPage from './pages/PengajuanPage';


function App() {
  return (
    <Router>
      <Routes>

        {/* Login & Register User */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Login & Register Admin */}
        <Route
          path="/admin/login"
          element={
            <AuthLayout>
              <LoginAdmin />
            </AuthLayout>
          }
        />
        <Route
          path="/admin/register"
          element={
            <AuthLayout>
              <RegisterAdmin />
            </AuthLayout>
          }
        />

        {/* Home with Navbar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Dashboard User */}
        <Route path="/dashboard/profile" element={<DashboardProfile />} />
        <Route path="/dashboard/pengajuan" element={<DashboardPengajuan />} />

        {/* Dashboard Admin */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/pengajuan" element={<AdminPengajuan />} />
        <Route path="/admin/riwayat" element={<AdminRiwayat />} />
        <Route path="/pengajuan" element={<PengajuanPage />} />

      </Routes>
    </Router>
  );
}

export default App;
