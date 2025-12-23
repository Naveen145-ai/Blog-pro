const Blog = require('../models/addBlogModel');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

const addBlog = async(req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = '';

        // Handle file upload to Cloudinary if file exists (multer memoryStorage)
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ "Error": "No image file provided" });
        }

        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'blogs', resource_type: 'auto' },
                    (err, uploaded) => {
                        if (err) return reject(err);
                        return resolve(uploaded);
                    }
                );

                Readable.from(req.file.buffer).pipe(uploadStream);
            });

            imageUrl = result.secure_url;
        } catch (uploadErr) {
            return res.status(400).json({ "Error": "Image upload failed: " + uploadErr.message });
        }

        if (!title || !imageUrl || !content) {
            return res.status(400).json({ "Error": "Title, image, and content are required" });
        }

        const newBlog = new Blog({
            title,
            image: imageUrl,
            content,
            author: req.userId
        });

        await newBlog.save();

        res.status(200).json({ "Blog Added Successfully": newBlog });

    } catch(err) {
        res.status(500).json({ "Error": err.message });
    }
}

module.exports = addBlog;