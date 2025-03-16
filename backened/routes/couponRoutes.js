const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {getCoupon,claimCoupon,newCoupon,toggleCoupon,updateCoupon,claimHistoryCoupon} = require("../controllers/couponController");
const {claimLimiter,checkCookie} = require('../middlewares/rateLimiter')
// Get all coupons
router.get('/',getCoupon);

// Claim a coupon (Guest Access)
router.get('/claims',claimHistoryCoupon);

router.post('/claims',claimLimiter,claimCoupon);

// Add new coupon (Admin access)
router.post('/',authMiddleware,newCoupon);

//Update Coupon(Admin Access)
router.put('/:id',authMiddleware,updateCoupon);

// Toggle coupon availability (Admin Access)
router.put('/:id/toggle',authMiddleware,toggleCoupon);

module.exports = router;