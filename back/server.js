const express = require('express');
const app = express();
const cors = require('cors');

const connectCloudinary = require('./config/cloudinary');
const mongoDb = require('./config/mongoDb');
require('dotenv').config({ path: './config/config.env' });
const cookieParser = require('cookie-parser');

const addBlogRoute = require('./routes/addBlogRoute');
const getBlogRoute = require('./routes/getBlogRoute');
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute'); 
const authRoute = require('./routes/authRoute');
const myBlogsRoute = require('./routes/myBlogsRoute');
const wishlistRoute = require('./routes/wishListRoute');
const blogRoute = require('./routes/blogRoute');
connectCloudinary();
mongoDb();      

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/v1',addBlogRoute);
app.use('/api/v1',getBlogRoute);
app.use('/api/v1',signUpRoute);
app.use('/api/v1',loginRoute);
app.use('/api/v1', authRoute);
app.use('/api/v1', myBlogsRoute);
app.use('/api/v1', wishlistRoute); 
app.use('/api/v1', blogRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is running in the port ${process.env.PORT}`);
    
})