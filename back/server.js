const express = require('express');
const app = express();


const connectCloudinary = require('./config/cloudinary');
const mongoDb = require('./config/mongoDb');
require('dotenv').config({ path: './config/config.env' });

const addBlogRoute = require('./routes/addBlogRoute');
const getBlogRoute = require('./routes/getBlogRoute');
connectCloudinary();
mongoDb();      

app.use(express.json());

app.use('/api/v1',addBlogRoute);
app.use('/api/v1',getBlogRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is running in the port ${process.env.PORT}`);
    
})