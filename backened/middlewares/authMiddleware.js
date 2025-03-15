const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authMiddleware = async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]; //Expect "Bearer <token>"
        if(!token){
            return res.status(401).json({message: 'Access denied, No token provided.'});
            
        }
        // Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if(!admin){
            return res.status(401).json({message:'Admin not found.'})
        }

        // Attach admin to the request object
        req.admin = admin;
        next();
    } catch(error){
        res.status(401).json({message: 'Invalid token'});
        console.log(error);
    }
}

module.exports = authMiddleware;