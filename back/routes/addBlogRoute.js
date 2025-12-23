const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const auth = require('../middlewares/auth');

const addBlog = require('../controllers/addBlogController');

// Configure multer for file uploads (in-memory to avoid filesystem issues)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        // Only accept image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

router.post('/add-blog', auth, upload.single('image'), addBlog);

module.exports = router;