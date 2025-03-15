import React, { useState } from 'react';
import axios from 'axios';

const GuestCouponClaim = () => {
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState(null);

  const handleClaim = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/coupons/claim',{},{
        withCredentials:true, //Ensure cookies are sent with requests
      });
      setCoupon(response.data.coupon);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'You already claimed coupon');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Claim Your Coupon</h1>
      <button
        onClick={handleClaim}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Claim Coupon
      </button>
      {message && (
        <div className="mt-4 p-2 bg-white border rounded shadow-md text-center">
          <p>{message}</p>
          {coupon && (
            <p className="font-mono mt-2">Coupon Code: {coupon.code}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GuestCouponClaim;
