import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AddUpdateCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('available');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Get the token

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/coupons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          navigate('/login');  // Redirect if unauthorized
        } else {
          const data = await response.json();
          setCoupons(data);
        }
      } catch (err) {
        console.error('Error fetching coupons:', err);
      }
    };

    fetchCoupons();
  }, [navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = selectedCoupon ? `/${selectedCoupon._id}` : '';
    const method = selectedCoupon ? 'PUT' : 'POST';

    try {
      const response = await fetch(`http://localhost:8080/api/coupons${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, status }),
      });

      if (response.status === 401) {
        navigate('/login');  // Redirect if unauthorized
        return;
      }

      if (response.ok) {
        const newCoupon = await response.json();
        console.log(newCoupon);

        if (!selectedCoupon) {
          setCoupons((prev) => [...prev, newCoupon]); // Add to the list without reload
        } else {
          setCoupons((prev) =>
            prev.map((c) => (c._id === newCoupon._id ? newCoupon : c))
          );
        }
      }

      // Reset form
      setCode('');
      setStatus('available');
      setSelectedCoupon(null);
    } catch (err) {
      console.error('Error submitting coupon:', err);
    }
  };

  const handleEdit = (coupon) => {
    setCode(coupon.code);
    setStatus(coupon.status);
    setSelectedCoupon(coupon);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {selectedCoupon ? 'Update Coupon' : 'Add Coupon'}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="available">Available</option>
          <option value="claimed">Claimed</option>
          <option value="disabled">Disabled</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {selectedCoupon ? 'Update Coupon' : 'Add Coupon'}
        </button>
      </form>
      <h2 className="text-xl font-bold mb-2">Existing Coupons</h2>
      <ul className="space-y-2">
        {coupons.map((coupon) => (
          <li key={coupon._id} className="border p-2 flex justify-between items-center">
            <span>
              {coupon.code} -{' '}
              <span
                className={`font-semibold ${
                  coupon.status === 'claimed'
                    ? 'text-red-500'
                    : coupon.status === 'disabled'
                    ? 'text-gray-500'
                    : 'text-green-500'
                }`}
              >
                {coupon.status}
              </span>
            </span>
            <button
              onClick={() => handleEdit(coupon)}
              className="bg-yellow-500 text-white p-1 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddUpdateCoupon;
