import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './autentikasi/Login';
import Register from './autentikasi/Register';
import DashboardProfile from './Users/DashboardProfile';
import DashboardPengajuan from './Users/DashboardPengajuan';
import Home from './pages/Home'; // <- logika form disini okee

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/profile" element={<DashboardProfile />} />
        <Route path="/dashboard/pengajuan" element={<DashboardPengajuan />} />
      </Routes>
    </Router>
  );
}

export default App;
