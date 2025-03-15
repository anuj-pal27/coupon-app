import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import GuestCouponClaim from './pages/GuestCouponClaim';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import CreateAdmin from './components/CreateAdmin';
function App() {

  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/claim' element={<GuestCouponClaim/>} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/panel' element={<AdminDashboard />} />
          <Route path='/create' element={<CreateAdmin/>}/>
        </Routes>
      </div>
      </div>
    </Router>
  ) 
}

export default App
