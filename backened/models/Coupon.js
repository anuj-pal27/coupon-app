const mongoose  = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {type:String,
        required:true,
        unique:true
    },
    status:{
        type: String,
        enum:['available','claimed','disabled'],
        default:'available'
    },
    claimedBy: {
        type:String,
    },
    claimedAt:{
        type:Date,
    } 
})

const Coupon = mongoose.model('Coupon',couponSchema);

module.exports = Coupon