const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activityLog: [
      {
        action: String,
        target: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });

//Pre-save hook to hash password
adminSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  // Method to log admin activities
  adminSchema.methods.logActivity = async function (action, target) {
    this.activityLog.push({ action, target });
    await this.save();
  };
  
  const Admin = mongoose.model('Admin', adminSchema);
  module.exports = Admin;