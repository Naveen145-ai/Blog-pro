const mongoose = require('mongoose');

const mongoDb = async () => {
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((err)=>{
        console.log("MongoDB connection failed", err);
    });
}

module.exports = mongoDb;
