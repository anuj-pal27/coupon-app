import { useState } from 'react';
import ViewCoupons from '../components/ViewCoupons';
import AddUpdateCoupon from '../components/AddUpdateCoupon';
import UserClaimHistory from '../components/UserClaimHistory';
import ToggleCouponAvailability from '../components/ToggleCouponAvailability';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('view');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        {['view', 'addUpdate', 'history', 'toggle'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {tab === 'view' && 'View Coupons'}
            {tab === 'addUpdate' && 'Add/Update Coupons'}
            {tab === 'history' && 'User Claim History'}
            {tab === 'toggle' && 'Toggle Coupon Availability'}
          </button>
        ))}
      </div>

      {/* Render Active Component */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {activeTab === 'view' && <ViewCoupons />}
        {activeTab === 'addUpdate' && <AddUpdateCoupon />}
        {activeTab === 'history' && <UserClaimHistory />}
        {activeTab === 'toggle' && <ToggleCouponAvailability />}
      </div>
    </div>
  );
};

export default AdminDashboard;