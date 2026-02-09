const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connect successfully ${process.env.MONGO_URL}`)
    } catch (error) {
        console.error(error)
    }
    
}

module.exports = connectDB;