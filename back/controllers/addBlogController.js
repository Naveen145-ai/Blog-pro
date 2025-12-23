const Blog = require('../models/addBlogModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const addBlog = async(req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = '';

        // Handle file upload to Cloudinary if file exists
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'blogs',
                    resource_type: 'auto'
                });
                imageUrl = result.secure_url;

                // Clean up temporary file
                fs.unlinkSync(req.file.path);
            } catch (uploadErr) {
                // Clean up temporary file on error
                if (req.file && fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ "Error": "Image upload failed: " + uploadErr.message });
            }
        } else {
            return res.status(400).json({ "Error": "No image file provided" });
        }

        if (!title || !imageUrl || !content) {
            return res.status(400).json({ "Error": "Title, image, and content are required" });
        }

        const newBlog = new Blog({
            title,
            image: imageUrl,
            content
        });

        await newBlog.save();

        res.status(200).json({ "Blog Added Successfully": newBlog });

    } catch(err) {
        // Clean up temporary file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ "Error": err.message });
    }
}

module.exports = addBlog;