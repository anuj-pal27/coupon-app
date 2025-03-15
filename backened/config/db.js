const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('mongodb connected');
    } catch(err){
        console.log('monogodb connection error:',err);
        process.exit(1);
    }
};
connectDB();

module.exports = mongoose;