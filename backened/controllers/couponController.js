const express = require("express");
const Coupon = require("../models/Coupon");

// Middleware to get IP address (supports proxies like NGINX)
const getClientIp = (req) => {
    return (
      req.headers['x-forwarded-for']?.split(',').shift().trim() || req.connection.remoteAddress
    );
  };
  
const getCoupon = async(req,res)=>{
    try{
        const coupon = await Coupon.find();
        res.json(coupon);
    }catch(error){
        res.status(500).json({message:'Failed to fetch coupons',error})
    }
}

const updateCoupon = async(req,res)=>{
    const {id} = req.params;
    const {code,status,claimedBy, claimedAt} = req.body;
    try{
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,{code,status,claimedBy,claimedAt},{new:true}
        );
        if(!updatedCoupon){ return res.status(404).json({message:'Coupon not found'})};
        res.json({message:'Coupon updated successfully',updatedCoupon});
    } catch(error){
        res.status(500).json({message:'Failed to update coupon',error})
    }
}
const claimCoupon = async (req, res) => {
  try {
    // Check if the user already claimed in the last 60 seconds
    if (req.cookies.claimed) {
      return res.status(400).json({ message: 'You already claimed a coupon. Please wait 60 seconds.' });
    }
        // Get the user's IP
        const clientIp = getClientIp(req);

    // Assign the next available coupon in sequence
    const coupon = await Coupon.findOneAndUpdate(
      { status: 'available' },
      { status: 'claimed', claimedBy: clientIp, claimedAt: new Date() },
      { new: true, sort: { _id: 1 } } // Ensures sequential assignment
    );

    if (!coupon) {
      return res.status(404).json({ message: 'No available coupons.' });
    }

    // Set a cookie to prevent another claim for 60 seconds
    res.cookie('claimed', 'true', { httpOnly: true, maxAge: 60 * 1000 });

    res.json({ message: 'Coupon claimed successfully', coupon });

  } catch (error) {
    res.status(500).json({ message: 'Failed to claim coupon', error });
  }
};


const claimHistoryCoupon = async(req,res)=>{
    try {
        const claimedCoupons = await Coupon.find({ status: 'claimed' })
          .select('code claimedBy claimedAt')
          .sort({ claimedAt: -1 });  // Newest first
        res.json(claimedCoupons);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch claimed coupons', error });
      }
}
const newCoupon = async (req, res) => {
    const { code, status } = req.body;
    try {
      console.log('Code:', code);
      console.log('Status:', status);
      
      const newCoupon = new Coupon({ code, status: status || 'available' });  // Include status
      await newCoupon.save();
      
      console.log('New Coupon:', newCoupon);
      res.status(201).json(newCoupon);
    } catch (error) {
      console.error('Error adding coupon:', error);
      res.status(500).json({ message: 'Failed to add coupon', error });
    }
  };
  
const toggleCoupon = async(req,res)=>{
       try{
            const {id} = req.params;
            const coupon = await Coupon.findById(id);
            if(!coupon) return res.status(404).json({message: 'Coupon not found'});
    
            coupon.status = coupon.status === 'available'? 'disabled' : 'available';
            await coupon.save();
            res.json(coupon);
        } catch(error){
            res.status(500).json({message: 'Failed to toggle coupon',error})
        }
}

module.exports = { getCoupon,claimCoupon,newCoupon,toggleCoupon ,updateCoupon, claimHistoryCoupon};