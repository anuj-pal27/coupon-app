const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
app.use(cookieParser());

const claimLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute cooldown
    max: 1, // Limit each IP to 1 request per window
    message: 'Too many claims from this IP, please try again later.',
  });
  
  const checkCookie = (req, res, next) => {
    const claimed = req.cookies.claimed;
    if (claimed) {
      return res.status(429).json({ message: 'You have already claimed a coupon in this session.' });
    }
    next();
  };

module.exports = {claimLimiter,checkCookie};