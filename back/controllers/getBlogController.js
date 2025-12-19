const Blog = require('../models/addBlogModel');

const getBlog = (req,res) => {

    try{
        const blogs = Blog.find().sort({createdAt: -1});

        res.status(200).json(blogs);
    }
    catch(err){
        res.status(500).json({"Error":err.message});

    }
}

module.exports = getBlog;