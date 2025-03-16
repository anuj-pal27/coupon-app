import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserClaimHistory = () => {
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaimedCoupons = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/coupons/claims`);
        setClaimedCoupons(response.data);
      } catch (err) {
        setError('Failed to fetch claimed coupons');
      } finally {
        setLoading(false);
      }
    };
    fetchClaimedCoupons();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Claim History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Coupon Code</th>
              <th className="py-2 px-4 border-b text-left">Claimed By (IP/Session)</th>
              <th className="py-2 px-4 border-b text-left">Claimed At</th>
            </tr>
          </thead>
          <tbody>
            {claimedCoupons.length > 0 ? (
              claimedCoupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{coupon.code}</td>
                  <td className="py-2 px-4 border-b">{coupon.claimedBy || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    {coupon.claimedAt ? new Date(coupon.claimedAt).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No claimed coupons found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserClaimHistory;
