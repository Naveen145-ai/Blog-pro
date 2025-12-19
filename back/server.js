const express = require('express');
const app = express();


const connectCloudinary = require('./config/cloudinary');
const mongoDb = require('./config/mongoDb');
require('dotenv').config({ path: './config/config.env' });
const cookieParser = require('cookie-parser');

const addBlogRoute = require('./routes/addBlogRoute');
const getBlogRoute = require('./routes/getBlogRoute');
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');  
connectCloudinary();
mongoDb();      

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',addBlogRoute);
app.use('/api/v1',getBlogRoute);
app.use('/api/v1',signUpRoute);
app.use('/api/v1',loginRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is running in the port ${process.env.PORT}`);
    
})