import React from 'react'
import { useNavigate } from 'react-router';

function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to Coupon Distribution</h1>
        <p className='text-lg mb-6 text-gray-700'>Claim Coupons as a guest or manage coupons as an admin.</p>
        <div className='space-x-4'>
            <button onClick={()=>navigate('/claim')} 
              className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700
              transition'>claim Coupon</button>
            <button onClick={()=>navigate('/admin')}
              className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700
              transition'>Admin Login</button>
        </div>
    </div>
  )
}

export default LandingPage;