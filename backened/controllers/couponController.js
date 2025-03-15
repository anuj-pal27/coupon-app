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

const claimCoupon = async(req,res)=>{
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ message: 'Coupon code is required' });
    
        const coupon = await Coupon.findOne({ code });
        if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
        if (coupon.status === 'claimed') return res.status(400).json({ message: 'Coupon already claimed' });
    
        // Track IP or session ID
        const clientIp = getClientIp(req);
    
        // Claim the coupon
        coupon.status = 'claimed';
        coupon.claimedBy = clientIp; // Or use req.session.id for session tracking
        coupon.claimedAt = new Date();
        await coupon.save();
    
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