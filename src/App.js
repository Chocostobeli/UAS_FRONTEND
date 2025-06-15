import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './autentikasi/Login';
import Register from './autentikasi/Register';
import DashboardProfile from './Users/DashboardProfile';
import DashboardPengajuan from './Users/DashboardPengajuan';
import Home from './pages/Home';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>

        {/* Halaman Login dan Register tanpa Navbar */}
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

        {/* Home pakai Navbar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Dashboard TIDAK pakai Navbar */}
        <Route path="/dashboard/profile" element={<DashboardProfile />} />
        <Route path="/dashboard/pengajuan" element={<DashboardPengajuan />} />

      </Routes>
    </Router>
  );
}

export default App;
