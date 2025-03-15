import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ToggleCouponAvailability() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  };

  const toggleAvailability = async (id) => {
    const token = localStorage.getItem('token');
    if(!token){ 
      console.error('No token found,redirecting to login');
      navigate('/login'); // Redirecting to login if no token
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/coupons/${id}/toggle`,
        {},
        {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      fetchCoupons();
    } catch (error) {
      console.error('Failed to toggle coupon availability:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Toggle Coupon Availability</h2>
      <ul className="space-y-4">
        {coupons.map((coupon) => (
          <li key={coupon._id} className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="text-lg font-semibold">Code: {coupon.code}</p>
              <p className="text-sm">Status: {coupon.status}</p>
            </div>
            <button
              onClick={() => toggleAvailability(coupon._id)}
              className="px-4 py-2 text-white rounded-lg"
              style={{ backgroundColor: coupon.status === 'available' ? 'red' : 'green' }}
            >
              {coupon.status === 'available' ? 'Disable' : 'Enable'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
