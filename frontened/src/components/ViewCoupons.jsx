
import React, { useEffect, useState } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/coupons`);
        if (!response.ok) throw new Error('Failed to fetch coupons');
        const data = await response.json();
        setCoupons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Coupons</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Coupon Code</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Claimed By</th>
              <th className="px-4 py-2">Claimed At</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="border-t">
                <td className="px-4 py-2 text-center">{coupon.code}</td>
                <td className={`px-4 py-2 text-center ${coupon.status === 'claimed' ? 'text-red-500' : 'text-green-500'}`}>{coupon.status}</td>
                <td className="px-4 py-2 text-center">{coupon.claimedBy || 'N/A'}</td>
                <td className="px-4 py-2 text-center">{coupon.claimedAt ? new Date(coupon.claimedAt).toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCoupons;
