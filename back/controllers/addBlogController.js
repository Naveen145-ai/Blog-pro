const Blog = require('../models/addBlogModel');

const addBlog = async(req, res) => {

    try{
    const {title,image,content} = req.body;

    const newBlog = new Blog({title,image,content});

    await newBlog.save();

    res.status(200).json({"Blog Added Successfully": newBlog});

    }catch(err){
        res.status(500).json({"Error":err.message});
    }

}

module.exports = addBlog;