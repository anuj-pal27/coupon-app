const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin login
const loginAdmin = async (req,res) =>{
    const {username , password} = req.body;
    try{
        const admin = await Admin.findOne({username});
        if(!admin) return res.status(401).json({message:'Invalid credentials'});

        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch) return res.status(401).json({message:'Invalid credentials'});

        const token = jwt.sign({id: admin._id},process.env.JWT_SECRET,{expiresIn: '1h'});
        await admin.logActivity('Logged in',username);
        res.json({token});
    } catch(error){
        res.status(500).json({message:'Login failed',error});
    }
};

// Admin logout
const logoutAdmin = async(req,res) =>{
    try{
        await req.admin.logActivity('Logged out',req.admin.username);
        res.json({message: 'Logged out successfully'});
    } catch(error){
        res.status(500).json({message:'Logout failed',error});
    }
};

// Create new admin (protected route)
const createAdmin = async(req,res)=>{
    const {username,password} = req.body;
    try{
        const existingAdmin = await Admin.findOne({username});
        console.log(existingAdmin);
        if(existingAdmin){ return res.status(400).json({message:'Admin already exists'});}
        
        const newAdmin = new Admin({username,password});
        console.log(newAdmin);
        await newAdmin.save();
        if (req.admin) {
          await req.admin.logActivity('Created Admin', username);
        }
        res.status(201).json(newAdmin);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create admin', error });
      }
    }

    // Get all admins
const getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find().select('-password');
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch admins', error });
    }
  };
  
  // Get admin activity log
const getAdminActivityLog = async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin._id).select('activityLog');
      res.json(admin.activityLog);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch activity log', error });
    }
  };
  
  module.exports = { loginAdmin, logoutAdmin, createAdmin, getAllAdmins, getAdminActivityLog };