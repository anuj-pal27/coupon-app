require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const FRONTEND_URL = `${process.env.FRONTEND_URL}`
// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const couponRoutes = require('./routes/couponRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin:FRONTEND_URL,
  credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Default Route
app.get('/', (req, res) => res.send('Coupon Distribution System API is running'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));